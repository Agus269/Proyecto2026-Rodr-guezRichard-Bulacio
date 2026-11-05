import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  validarApellido, validarMesa, validarPago, cantidadValida,
  mostrarPrecio, calcularTotal, leerPedido, guardarPedido, agregarAlPedido, normalizarProducto,
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

test('lee el contrato de la primera entrega y descarta datos corruptos', () => {
  const item = {id:1,nombre:'Hamburguesa Completa',precio:12000,cantidad:2}
  assert.deepEqual(leerPedido({getItem: () => JSON.stringify([item])}), [item])
  for (const raw of ['{', 'null', '{}', '42', '[null,{},false]']) {
    assert.deepEqual(leerPedido({getItem: () => raw}), [])
  }
  assert.deepEqual(leerPedido({getItem: () => { throw Error('bloqueado') }}), [])
})

test('no admite importes inválidos, cantidades fuera de rango ni productos duplicados', () => {
  const item = {id:1,nombre:'Hamburguesa Completa',precio:12000,cantidad:2}
  const guardados = [item, {...item,cantidad:3}, {...item,id:2,precio:-5},
    {...item,id:3,cantidad:100}, {...item,id:4,precio:'12000'}, {...item,id:5,nombre:''}]
  assert.deepEqual(leerPedido({getItem: () => JSON.stringify(guardados)}), [item])
})

test('guarda y vacía solo la clave pedido, sin anunciar éxito si falla', () => {
  const datos = new Map([['otra-clave','conservar']])
  const storage = {setItem: (key,value) => datos.set(key,value)}
  const pedido = [{id:2,nombre:'Pizza Muzzarella',precio:11000,cantidad:1}]
  assert.equal(guardarPedido(pedido, storage), true)
  assert.deepEqual(JSON.parse(datos.get('pedido')), pedido)
  assert.equal(guardarPedido([], storage), true)
  assert.equal(datos.get('pedido'), '[]')
  assert.equal(datos.get('otra-clave'), 'conservar')
  assert.equal(guardarPedido(pedido, {setItem: () => {throw Error('bloqueado')}}), false)
})

test('no rompe la página cuando el navegador bloquea el acceso a localStorage', () => {
  const anterior = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  Object.defineProperty(globalThis, 'localStorage', {configurable:true,get: () => {throw Error('bloqueado')}})
  try {
    assert.deepEqual(leerPedido(), [])
    assert.equal(guardarPedido([]), false)
  } finally {
    if (anterior) Object.defineProperty(globalThis, 'localStorage', anterior)
    else delete globalThis.localStorage
  }
})
