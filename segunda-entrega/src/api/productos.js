const API_URL = 'http://localhost:3000/productos'

const obtenerProductos = async () => {
  const respuesta = await fetch(API_URL)

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los productos')
  }

  const productos = await respuesta.json()

  return productos
}

export { obtenerProductos }