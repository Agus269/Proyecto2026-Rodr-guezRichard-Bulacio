/** Comprueba las unidades antes de guardarlas o confirmar. */
export const normalizarProducto = (producto) => {
  const id = Number(producto?.id)
  if (!Number.isInteger(id) || id < 1 || typeof producto?.nombre !== 'string' || !producto.nombre.trim() ||
    typeof producto.precio !== 'number' || !Number.isFinite(producto.precio) || producto.precio < 0) {
    throw new Error('El catálogo contiene un producto inválido.')
  }
  return {...producto,id}
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

export const leerDatosPedido = () => {
  try {
    const datos = JSON.parse(localStorage.getItem('datosPedido'))
    return {
      apellido: '',
      mesa: typeof datos?.mesa === 'string' && !validarMesa(datos.mesa) && String(Number(datos.mesa)) === datos.mesa ? datos.mesa : '',
      metodoPago: validarPago(datos?.metodoPago) ? '' : datos.metodoPago,
    }
  } catch {
    return {apellido:'',mesa:'',metodoPago:''}
  }
}

export const guardarDatosPedido = ({mesa, metodoPago}) => {
  try {
    localStorage.setItem('datosPedido', JSON.stringify({mesa, metodoPago}))
  } catch {
    // El formulario sigue disponible si el navegador bloquea el almacenamiento.
  }
}
