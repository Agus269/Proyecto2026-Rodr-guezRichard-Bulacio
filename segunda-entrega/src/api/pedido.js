import { cantidadValida, normalizarProducto } from '@/utils/pedido'

const API_URL = new URL('pedido', import.meta.env.VITE_BASE_URL).href

const solicitar = async (ruta = '', opciones = {}) => {
  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, opciones)
  } catch {
    throw new Error('No se pudo conectar con el pedido. Verificá que el servicio mock esté activo y volvé a intentar.')
  }
  if (!respuesta.ok) throw new Error('No se pudo guardar o consultar el pedido. Volvé a intentar.')
  if (opciones.method === 'DELETE') return
  return respuesta.json()
}

const consultarPedido = async () => {
  const pedido = await solicitar()
  if (!Array.isArray(pedido)) throw new Error('El pedido recibido no es válido.')
  return pedido.map((item) => {
    const producto = normalizarProducto({ ...item, id: item.productoId })
    if (!cantidadValida(producto.cantidad)) throw new Error('El pedido contiene una cantidad inválida.')
    return { ...producto, pedidoId: item.id }
  })
}

// Evita que dos altas simultáneas de esta aplicación creen el mismo producto.
let pendiente = Promise.resolve()
export const obtenerPedido = async () => {
  // Al cambiar de página, espera las escrituras iniciadas en esta aplicación.
  await pendiente
  return consultarPedido()
}

const modificarPedido = async (operacion) => {
  const anterior = pendiente
  let liberar
  pendiente = new Promise((resolve) => { liberar = resolve })
  await anterior
  try {
    return await operacion()
  } finally {
    liberar()
  }
}

const enviar = (ruta, method, datos) => solicitar(ruta, {
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(datos),
})

export const agregarProducto = (producto, cantidad) => modificarPedido(async () => {
  if (!cantidadValida(cantidad)) throw new Error('Ingresá una cantidad entera entre 1 y 99.')
  const item = normalizarProducto({ ...producto, cantidad })
  const pedido = await consultarPedido()
  const existente = pedido.find((registro) => registro.id === item.id)
  if (existente) {
    await enviar(`/${encodeURIComponent(existente.pedidoId)}`, 'PATCH', { cantidad: item.cantidad })
  } else {
    await enviar('', 'POST', { productoId: item.id, nombre: item.nombre, precio: item.precio, cantidad: item.cantidad })
  }
  return item
})

export const actualizarCantidad = (id, cantidad) => modificarPedido(async () => {
  if (!cantidadValida(cantidad)) throw new Error('Ingresá una cantidad entera entre 1 y 99.')
  const item = await buscarProducto(id)
  await enviar(`/${encodeURIComponent(item.pedidoId)}`, 'PATCH', { cantidad })
})

const buscarProducto = async (id) => {
  const item = (await consultarPedido()).find((item) => item.id === id)
  if (!item) throw new Error('El producto ya no está en el pedido. Recargá la página.')
  return item
}

export const quitarProducto = (id) => modificarPedido(async () => {
  const item = await buscarProducto(id)
  await solicitar(`/${encodeURIComponent(item.pedidoId)}`, { method: 'DELETE' })
})

export const vaciarPedido = () => modificarPedido(async () => {
  const pedido = await consultarPedido()
  for (const item of pedido) await solicitar(`/${encodeURIComponent(item.pedidoId)}`, { method: 'DELETE' })
})
