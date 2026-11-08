import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { mkdtemp, readFile, writeFile, unlink, rmdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer as createNetServer } from 'node:net'
import {
  validarApellido, validarMesa, validarPago, cantidadValida,
  mostrarPrecio, calcularTotal, normalizarProducto,
} from '../segunda-entrega/src/utils/pedido.js'
import * as preferencias from '../segunda-entrega/src/utils/pedido.js'

test('apellido admite letras y rechaza vacío, números y longitud incorrecta', () => {
  for (const apellido of ['Bulacio', 'Rodríguez Richard', "O'Connor", 'Pérez-Gómez']) {
    assert.equal(validarApellido(apellido), '')
  }
  for (const apellido of ['', ' ', 'A', '123', 'Nico1', '--', 'a'.repeat(51)]) {
    assert.notEqual(validarApellido(apellido), '')
  }
})

test('normaliza ids string del mock sin cambiar nombres ni precios', () => {
  const producto = {id:'1',nombre:'Hamburguesa',precio:12000,imagen:'/imagenes/hamburguesa.webp'}
  assert.equal(normalizarProducto(producto).id, 1)
  assert.equal(normalizarProducto(producto).precio, 12000)
  for (const id of ['no', '', 0, -1, 1.5]) assert.throws(() => normalizarProducto({...producto,id}))
})

test('conserva mesa y pago entre visitas; descarta JSON dañado y tolera almacenamiento bloqueado', (t) => {
  let contenido = null
  let bloqueado = false
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  Object.defineProperty(globalThis, 'localStorage', {configurable:true,writable:true,value:{
    getItem: () => { if (bloqueado) throw new Error('bloqueado'); return contenido },
    setItem: (_clave, valor) => { if (bloqueado) throw new Error('lleno'); contenido = valor },
  }})
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor)
    else delete globalThis.localStorage
  })
  assert.deepEqual(preferencias.leerDatosPedido(), {apellido:'',mesa:'',metodoPago:''})
  preferencias.guardarDatosPedido({apellido:'Bulacio',mesa:'3',metodoPago:'efectivo'})
  assert.deepEqual(JSON.parse(contenido), {mesa:'3',metodoPago:'efectivo'})
  assert.deepEqual(preferencias.leerDatosPedido(), {apellido:'',mesa:'3',metodoPago:'efectivo'})
  contenido = '{roto'
  assert.deepEqual(preferencias.leerDatosPedido(), {apellido:'',mesa:'',metodoPago:''})
  contenido = '{"mesa":"99","metodoPago":"otro"}'
  assert.deepEqual(preferencias.leerDatosPedido(), {apellido:'',mesa:'',metodoPago:''})
  contenido = '{"mesa":true,"metodoPago":"tarjeta"}'
  assert.deepEqual(preferencias.leerDatosPedido(), {apellido:'',mesa:'',metodoPago:'tarjeta'})
  bloqueado = true
  assert.deepEqual(preferencias.leerDatosPedido(), {apellido:'',mesa:'',metodoPago:''})
  assert.doesNotThrow(() => preferencias.guardarDatosPedido({mesa:'3',metodoPago:'efectivo'}))
})

test('mesa y pago requieren una opción real del formulario', () => {
  for (const mesa of ['1', '3', '10']) assert.equal(validarMesa(mesa), '')
  for (const mesa of ['', '0', '11', '1.5', 'abc']) assert.notEqual(validarMesa(mesa), '')
  for (const pago of ['efectivo', 'transferencia', 'tarjeta']) assert.equal(validarPago(pago), '')
  for (const pago of ['', 'otro']) assert.notEqual(validarPago(pago), '')
})

test('cantidades enteras de 1 a 99, sin convertir vacíos en cero', () => {
  for (const cantidad of [1, 2, 99]) assert.equal(cantidadValida(cantidad), true)
  for (const cantidad of [0, -1, 1.5, 100, NaN, Infinity, '', '2']) {
    assert.equal(cantidadValida(cantidad), false)
  }
})

test('precios y totales conservan el formato argentino corregido por la profesora', () => {
  assert.equal(mostrarPrecio(3123.45), '$3.123,45')
  assert.equal(mostrarPrecio(0), '$0,00')
  assert.equal(calcularTotal([{precio:12000,cantidad:2},{precio:3500,cantidad:1}]), 27500)
  assert.equal(calcularTotal([]), 0)
})

test('API usa VITE_BASE_URL y persiste el pedido en JSON Server', async (t) => {
  const root = fileURLToPath(new URL('../segunda-entrega', import.meta.url))
  const require = createRequire(new URL('../segunda-entrega/package.json', import.meta.url))
  const { createServer } = await import(pathToFileURL(require.resolve('vite')).href)
  const directorio = await mkdtemp(path.join(tmpdir(), 'restaurante-api-'))
  const archivo = path.join(directorio, 'db.json')
  const original = await readFile(path.join(root, 'src/data/db.json'), 'utf8')
  await writeFile(archivo, original)
  const puertoLibre = createNetServer()
  puertoLibre.listen(0, '127.0.0.1')
  await once(puertoLibre, 'listening')
  const puerto = puertoLibre.address().port
  await new Promise((resolve) => puertoLibre.close(resolve))
  const base = `http://127.0.0.1:${puerto}/`
  const mock = spawn(process.execPath, [path.join(root, 'node_modules/json-server/lib/bin.js'), archivo, '--port', String(puerto)], {
    // La base temporal sólo cambia por HTTP; evita recargas del watcher durante las escrituras.
    cwd: root, windowsHide: true, stdio: 'ignore', env: { ...process.env, NODE_ENV: 'production' },
  })
  const salida = once(mock, 'exit')
  let vite
  try {
    let listo = false
    for (let intento = 0; intento < 100; intento++) {
      if (mock.exitCode !== null) throw new Error('JSON Server terminó antes de iniciar')
      try { listo = (await fetch(`${base}pedido`)).ok } catch { /* Espera el inicio del mock. */ }
      if (listo) break
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    assert.ok(listo, 'JSON Server debe iniciar')
    vite = await createServer({ root, server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom',
      define: { 'import.meta.env.VITE_BASE_URL': JSON.stringify(base) },
    })
    const api = await vite.ssrLoadModule('/src/api/pedido.js')
    const catalogo = await vite.ssrLoadModule('/src/api/productos.js')
    const peticiones = []
    const fetchOriginal = globalThis.fetch
    t.mock.method(globalThis, 'fetch', (url, opciones = {}) => {
      peticiones.push({ url: String(url), method: opciones.method ?? 'GET' })
      return fetchOriginal(url, opciones)
    })
    const productos = await catalogo.obtenerProductos()
    assert.equal(productos.length, JSON.parse(original).productos.length)
    assert.equal(peticiones[0].url, `${base}productos`)
    assert.equal(peticiones[0].method, 'GET')
    assert.deepEqual(await api.obtenerPedido(), [])

    await api.agregarProducto(productos[0], 2)
    assert.ok(peticiones.some(({ url, method }) => url === `${base}pedido` && method === 'POST'))
    const [registro] = await (await fetchOriginal(`${base}pedido`)).json()
    assert.equal(registro.productoId, productos[0].id)
    assert.equal(registro.cantidad, 2)

    // El campo de Menú expresa el total deseado, no unidades adicionales.
    await api.agregarProducto(productos[0], 3)
    await api.agregarProducto(productos[0], 3)
    let pedido = await api.obtenerPedido()
    assert.equal(pedido.length, 1)
    assert.equal(pedido[0].cantidad, 3, 'guardar 3 dos veces conserva 3, sin sumar a 6')
    assert.equal(pedido[0].pedidoId, registro.id)
    await Promise.all([api.agregarProducto(productos[0], 4), api.agregarProducto(productos[0], 2)])
    assert.equal((await api.obtenerPedido())[0].cantidad, 2)
    await api.agregarProducto(productos[0], 99)
    assert.equal((await api.obtenerPedido())[0].cantidad, 99)
    for (const cantidad of [0, 1.5, 100, NaN]) await assert.rejects(api.agregarProducto(productos[0], cantidad))
    await assert.rejects(api.actualizarCantidad(productos[0].id, 0))
    assert.equal((await api.obtenerPedido())[0].cantidad, 99)

    const guardadoEnCurso = api.actualizarCantidad(productos[0].id, 6)
    const alVolverAlMenu = await api.obtenerPedido()
    await guardadoEnCurso
    assert.equal(alVolverAlMenu[0].cantidad, 6, 'una lectura espera el guardado iniciado antes de navegar')

    await api.actualizarCantidad(productos[0].id, 7)
    assert.equal((await api.obtenerPedido())[0].cantidad, 7)
    assert.ok(peticiones.some(({ url, method }) => url === `${base}pedido/${registro.id}` && method === 'PATCH'))
    await api.quitarProducto(productos[0].id)
    assert.deepEqual(await api.obtenerPedido(), [])
    assert.ok(peticiones.some(({ url, method }) => url === `${base}pedido/${registro.id}` && method === 'DELETE'))
    await api.agregarProducto(productos[0], 1)
    await api.agregarProducto(productos[1], 2)
    await api.vaciarPedido()
    assert.deepEqual(await api.obtenerPedido(), [])
    pedido = JSON.parse(await readFile(archivo, 'utf8')).pedido
    assert.deepEqual(pedido, [])
    assert.equal(await readFile(path.join(root, 'src/data/db.json'), 'utf8'), original)

    await t.test('informa errores HTTP y de red; permite reintentar', async (t) => {
      t.mock.method(globalThis, 'fetch', async () => new Response('error', { status: 500 }))
      await assert.rejects(api.agregarProducto(productos[0], 1), /No se pudo/)
      await assert.rejects(catalogo.obtenerProductos(), /No se pudieron/)
      globalThis.fetch = async () => { throw new Error('sin conexión') }
      await assert.rejects(api.obtenerPedido(), /servicio mock/)
      await assert.rejects(catalogo.obtenerProductos(), /servicio mock/)
    })
    await t.test('rechaza pedidos con formato o cantidades inválidas', async (t) => {
      let datos = {}
      t.mock.method(globalThis, 'fetch', async () => Response.json(datos))
      await assert.rejects(api.obtenerPedido(), /pedido recibido/)
      datos = [{ id: 'registro', productoId: 1, nombre: 'Hamburguesa', precio: 12000, cantidad: 100 }]
      await assert.rejects(api.obtenerPedido(), /cantidad inválida/)
    })
    await api.agregarProducto(productos[0], 1)
    assert.equal((await api.obtenerPedido())[0].cantidad, 1)
    await api.vaciarPedido()
  } finally {
    t.mock.restoreAll()
    if (vite) await vite.close()
    mock.kill()
    await salida
    await unlink(archivo)
    await rmdir(directorio)
  }
})
