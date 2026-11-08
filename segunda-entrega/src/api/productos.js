import { normalizarProducto } from '@/utils/pedido'
const API_URL = new URL('productos', import.meta.env.VITE_BASE_URL).href

const obtenerProductos = async () => {
  let respuesta
  try {
    respuesta = await fetch(API_URL)
  } catch {
    throw new Error('No se pudo cargar el menú. Verificá que el servicio mock esté activo y recargá la página.')
  }

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los productos')
  }

  const productos = await respuesta.json()

  if (!Array.isArray(productos)) throw new Error('El catálogo recibido no es válido.')
  return productos.map(normalizarProducto)
}

export { obtenerProductos }
