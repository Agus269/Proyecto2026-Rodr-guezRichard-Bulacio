import { useEffect, useState } from 'react'

import { obtenerProductos } from '@/api/productos'
import ProductCard from '@/components/ProductCard'

const Menu = () => {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos()
        setProductos(datos)
      } catch (error) {
        setError(error.message)
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])

  if (cargando) {
    return <p>Cargando menú...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  return (
    <section>
      <h1>Menú</h1>

      <div>
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </section>
  )
}

export default Menu