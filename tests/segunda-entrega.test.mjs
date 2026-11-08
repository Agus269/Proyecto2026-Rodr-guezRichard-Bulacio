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
  mostrarPrecio, calcularTotal, agregarAlPedido, normalizarProducto,
} from '../segunda-entrega/src/utils/pedido.js'

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

test('Menú acumula sin duplicar, rechaza decimales y no supera 99', () => {
  const producto = {id:1,nombre:'Hamburguesa',precio:12000}
  const pedido = [{...producto,cantidad:98}]
  assert.equal(agregarAlPedido(pedido,producto,1)[0].cantidad, 99)
  assert.equal(pedido[0].cantidad, 98)
  for (const cantidad of [0, 1.5, 2, NaN]) assert.throws(() => agregarAlPedido(pedido,producto,cantidad))
  assert.equal(agregarAlPedido([],producto,2)[0].cantidad, 2)
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

    await Promise.all([api.agregarProducto(productos[0], 1), api.agregarProducto(productos[0], 2)])
    let pedido = await api.obtenerPedido()
    assert.equal(pedido.length, 1)
    assert.equal(pedido[0].cantidad, 5)
    assert.equal(pedido[0].pedidoId, registro.id)
    await assert.rejects(api.agregarProducto(productos[0], 99))
    await assert.rejects(api.actualizarCantidad(productos[0].id, 0))
    assert.equal((await api.obtenerPedido())[0].cantidad, 5)

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
