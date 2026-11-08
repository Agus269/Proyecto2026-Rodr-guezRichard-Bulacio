import { useEffect, useState } from 'react'

import { obtenerProductos } from '@/api/productos'
import { obtenerPedido } from '@/api/pedido'
import ProductCard from '@/components/ProductCard'
import { Link } from 'react-router-dom'

const Menu = () => {
  const [productos, setProductos] = useState([])
  const [pedido, setPedido] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos()
        const pedidoActual = await obtenerPedido()
        setProductos(datos)
        setPedido(pedidoActual)
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
      <h2>Menú</h2>
      <p>Elegí tus platos y revisá el pedido antes de confirmar. Precios en pesos argentinos.</p>
      <p>La cantidad indica el total que querés de cada producto. Guardarla reemplaza la anterior; no suma unidades adicionales.</p>
      <p>Imágenes orientativas: las fotografías de platos fueron generadas para esta demostración.</p>
      <p><Link to="/pedido">Revisar mi pedido</Link></p>

      {productos.length === 0 && <p role="status">No hay productos disponibles por el momento.</p>}
      <div className="lista-productos">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            cantidadInicial={pedido.find((item) => item.id === producto.id)?.cantidad ?? 0}
          />
        ))}
      </div>
    </section>
  )
}

export default Menu
