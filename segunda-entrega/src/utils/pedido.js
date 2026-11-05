/** Comprueba las unidades antes de guardarlas o confirmar. */
export const normalizarProducto = (producto) => {
  const id = Number(producto?.id)
  if (!Number.isInteger(id) || id < 1 || typeof producto?.nombre !== 'string' || !producto.nombre.trim() ||
    typeof producto.precio !== 'number' || !Number.isFinite(producto.precio) || producto.precio < 0) {
    throw new Error('El catálogo contiene un producto inválido.')
  }
  return {...producto,id}
}

export const agregarAlPedido = (pedido, producto, cantidad) => {
  const existente = pedido.find((item) => item.id === producto.id)
  const acumulada = cantidad + (existente?.cantidad ?? 0)
  if (!cantidadValida(cantidad) || !cantidadValida(acumulada)) {
    throw new Error('Ingresá una cantidad entera entre 1 y 99. Cada producto admite hasta 99 unidades en el pedido.')
  }
  if (existente) return pedido.map((item) => item.id === producto.id ? {...item,cantidad:acumulada} : item)
  return [...pedido,{id:producto.id,nombre:producto.nombre,precio:producto.precio,cantidad}]
}

export const cantidadValida = (cantidad) => {
  return typeof cantidad === 'number' && Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= 99
}

export const mostrarPrecio = (precio) => {
  return '$' + new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precio)
}

export const calcularTotal = (pedido) => {
  return pedido.reduce((total, item) => total + item.precio * item.cantidad, 0)
}

/** Devuelve un mensaje de error o una cadena vacía cuando el dato es válido. */
export const validarApellido = (apellido) => {
  const letras = 'abcdefghijklmnopqrstuvwxyzáéíóúüñàèìòùâêîôûç'
  const texto = apellido.trim().toLowerCase()
  const mensaje = 'Ingresá un apellido de 2 a 50 caracteres, con letras y sin números.'
  let cantidadLetras = 0
  if (texto.length < 2 || texto.length > 50) return mensaje
  for (const caracter of texto) {
    if (letras.includes(caracter)) cantidadLetras++
    else if (![' ', '-', "'", '’'].includes(caracter)) return mensaje
  }
  if (cantidadLetras < 2 || !letras.includes(texto[0]) || !letras.includes(texto[texto.length - 1])) return mensaje
  return ''
}

export const validarMesa = (mesa) => {
  const numero = Number(mesa)
  return Number.isInteger(numero) && numero >= 1 && numero <= 10 ? '' : 'Seleccioná una mesa del 1 al 10.'
}

export const validarPago = (pago) => {
  return ['efectivo', 'transferencia', 'tarjeta'].includes(pago) ? '' : 'Seleccioná un método de pago.'
}

/** Conserva el contrato de Menú: id, nombre, precio y cantidad en la clave pedido. */
export const leerPedido = (storage) => {
  try {
    const almacenamiento = storage ?? localStorage
    const guardados = JSON.parse(almacenamiento.getItem('pedido')) || []
    if (!Array.isArray(guardados)) return []
    const pedido = []
    guardados.forEach((item) => {
      if (!item || !Number.isInteger(item.id) || item.id < 1 ||
        typeof item.nombre !== 'string' || !item.nombre.trim() ||
        typeof item.precio !== 'number' || !Number.isFinite(item.precio) || item.precio < 0 ||
        !cantidadValida(item.cantidad) || pedido.some((existente) => existente.id === item.id)) return
      pedido.push({id:item.id,nombre:item.nombre,precio:item.precio,cantidad:item.cantidad})
    })
    return pedido
  } catch {
    return []
  }
}

/** Informa el resultado para no anunciar una confirmación que no se pudo guardar. */
export const guardarPedido = (pedido, storage) => {
  try {
    const almacenamiento = storage ?? localStorage
    almacenamiento.setItem('pedido', JSON.stringify(pedido))
    return true
  } catch {
    return false
  }
}
