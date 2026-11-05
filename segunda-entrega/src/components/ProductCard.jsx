import { useState } from 'react'

import Button from '@/components/Button'

const ProductCard = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const agregarAlPedido = () => {
    const pedidoGuardado =
      JSON.parse(localStorage.getItem('pedido')) || []

    const productoExistente = pedidoGuardado.find(
      (item) => item.id === producto.id
    )

    if (productoExistente) {
      productoExistente.cantidad += cantidad
    } else {
      pedidoGuardado.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
      })
    }

    localStorage.setItem(
      'pedido',
      JSON.stringify(pedidoGuardado)
    )

    setMensaje(`${producto.nombre} agregado al pedido`)
  }

  const cambiarCantidad = (event) => {
    const nuevaCantidad = Number(event.target.value)

    if (nuevaCantidad >= 1 && nuevaCantidad <= 99) {
      setCantidad(nuevaCantidad)
    }
  }

  return (
    <article>
      <img
        src={producto.imagen}
        alt={`Ilustración de ${producto.nombre}`}
        width="240"
      />

      <h2>{producto.nombre}</h2>

      <p>{producto.descripcion}</p>

      <p>
        Precio: ${producto.precio.toLocaleString('es-AR')}
      </p>

      <label htmlFor={`cantidad-${producto.id}`}>
        Cantidad:
      </label>

      <input
        id={`cantidad-${producto.id}`}
        type="number"
        min="1"
        max="99"
        value={cantidad}
        onChange={cambiarCantidad}
      />

      <Button onClick={agregarAlPedido}>
        Agregar al pedido
      </Button>

      {mensaje && (
        <p role="status">
          {mensaje}
        </p>
      )}
    </article>
  )
}

export default ProductCard