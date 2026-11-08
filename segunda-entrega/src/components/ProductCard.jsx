import { useState } from 'react'

import Button from '@/components/Button'
import { cantidadValida, mostrarPrecio } from '@/utils/pedido'
import { agregarProducto } from '@/api/pedido'

const ProductCard = ({ producto, cantidadInicial = 0 }) => {
  const [cantidad, setCantidad] = useState(String(cantidadInicial || 1))
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [cantidadGuardada, setCantidadGuardada] = useState(cantidadInicial)

  const agregarAlPedido = async () => {
    if (guardando) return
    setGuardando(true)
    setMensaje('')
    try {
      const item = await agregarProducto(producto, Number(cantidad))
      setCantidad(String(item.cantidad))
      setCantidadGuardada(item.cantidad)
      setError('')
      setMensaje(`${producto.nombre}: cantidad guardada en el pedido: ${item.cantidad}.`)
    } catch (error) {
      setError(error.message)
    } finally {
      setGuardando(false)
    }
  }

  const cambiarCantidad = (event) => {
    setCantidad(event.target.value)
    setMensaje('')
    setError(cantidadValida(Number(event.target.value)) ? '' : 'Ingresá una cantidad entera entre 1 y 99.')
  }

  return (
    <article className="producto">
      <img
        src={producto.imagen}
        alt={`Imagen orientativa de ${producto.nombre}`}
        width="480"
        height="320"
        loading="lazy"
      />

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <p>
        {mostrarPrecio(producto.precio)}
      </p>

      <label htmlFor={`cantidad-${producto.id}`}>
        Cantidad total de {producto.nombre} en el pedido:
      </label>

      <input
        id={`cantidad-${producto.id}`}
        type="number"
        min="1"
        max="99"
        step="1"
        value={cantidad}
        disabled={guardando}
        onChange={cambiarCantidad}
        aria-invalid={Boolean(error)}
        aria-describedby={`error-producto-${producto.id}`}
      />
      <p id={`error-producto-${producto.id}`} className="error-campo" aria-live="polite">{error}</p>
      <p>Actualmente en tu pedido: {cantidadGuardada}.</p>

      <Button onClick={agregarAlPedido} disabled={guardando}>
        {cantidadGuardada > 0 ? 'Guardar cantidad' : 'Agregar al pedido'}
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
