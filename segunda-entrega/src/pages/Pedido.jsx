import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import {
  leerPedido, guardarPedido, calcularTotal, mostrarPrecio, cantidadValida,
  validarApellido, validarMesa, validarPago,
} from '@/utils/pedido'

const Pedido = () => {
  const [pedido, setPedido] = useState(() => leerPedido())
  const [cantidades, setCantidades] = useState({})
  const [datos, setDatos] = useState({apellido:'',mesa:'',metodoPago:''})
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const mensajeRef = useRef(null)
  const navigate = useNavigate()
  const validadores = {apellido:validarApellido,mesa:validarMesa,metodoPago:validarPago}

  const guardarCambios = (nuevoPedido) => {
    if (!guardarPedido(nuevoPedido)) {
      setMensaje('El navegador no permite guardar el pedido. Habilitá el almacenamiento del sitio y volvé a intentar.')
      return false
    }
    setPedido(nuevoPedido)
    setMensaje('')
    return true
  }

  const cambiarCantidad = (item, valor) => {
    setCantidades({...cantidades,[item.id]:valor})
    setMensaje('')
    const cantidad = Number(valor)
    if (!cantidadValida(cantidad)) return
    const nuevoPedido = pedido.map((producto) => producto.id === item.id ? {...producto,cantidad} : producto)
    if (!guardarCambios(nuevoPedido)) {
      setCantidades({...cantidades,[item.id]:String(item.cantidad)})
    }
  }

  const quitarProducto = (id) => {
    if (guardarCambios(pedido.filter((item) => item.id !== id))) {
      setMensaje('Producto eliminado del pedido.')
      mensajeRef.current?.focus()
    }
  }

  const vaciar = () => {
    if (guardarCambios([])) {
      setCantidades({})
      setMensaje('Pedido vacío. Podés elegir nuevamente desde Menú.')
      mensajeRef.current?.focus()
    }
  }

  const cambiarDato = (event) => {
    const {name,value} = event.target
    setDatos({...datos,[name]:value})
    setErrores({...errores,[name]:validadores[name](value)})
    setMensaje('')
  }

  const confirmar = (event) => {
    event.preventDefault()
    if (pedido.length === 0) return
    const nuevosErrores = {
      apellido:validarApellido(datos.apellido),
      mesa:validarMesa(datos.mesa),
      metodoPago:validarPago(datos.metodoPago),
    }
    setErrores(nuevosErrores)
    const cantidadIncorrecta = pedido.some((item) => !cantidadValida(Number(cantidades[item.id] ?? item.cantidad)))
    if (cantidadIncorrecta || Object.values(nuevosErrores).some(Boolean)) {
      setMensaje('Revisá los campos indicados antes de confirmar. Tus productos siguen en el pedido.')
      mensajeRef.current?.focus()
      return
    }
    const confirmacion = `Pedido de demostración confirmado para ${datos.apellido.trim()}, mesa ${datos.mesa}. Total: ${mostrarPrecio(calcularTotal(pedido))}. Método de pago: ${datos.metodoPago}. No se realizó ningún cobro.`
    if (guardarCambios([])) {
      setCantidades({})
      setDatos({apellido:'',mesa:'',metodoPago:''})
      setErrores({})
      setMensaje(confirmacion)
      mensajeRef.current?.focus()
    }
  }

  return (
    <>
      <h2>Pedido</h2>
      <p>Demostración académica: no se envían pedidos ni se realizan cobros.</p>
      <section aria-labelledby="tituloResumen">
        <h3 id="tituloResumen">Resumen del pedido</h3>
        <p>En pantallas pequeñas, deslizá la tabla hacia los costados para ver todas las columnas.</p>
        <div id="resumenPedido" tabIndex="0" role="region" aria-label="Tabla del pedido con desplazamiento horizontal">
          <table>
            <caption>Productos seleccionados e importes en pesos argentinos</caption>
            <thead><tr><th scope="col">Producto</th><th scope="col">Cantidad</th><th scope="col">Precio unitario</th><th scope="col">Subtotal</th><th scope="col">Acción</th></tr></thead>
            <tbody>
              {pedido.map((item) => {
                const valor = cantidades[item.id] ?? String(item.cantidad)
                const cantidadIncorrecta = !cantidadValida(Number(valor))
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.nombre}</th>
                    <td>
                      <label htmlFor={`unidades-${item.id}`}>Unidades de {item.nombre}</label>
                      <input id={`unidades-${item.id}`} type="number" min="1" max="99" step="1"
                        value={valor} onChange={(event) => cambiarCantidad(item,event.target.value)}
                        aria-invalid={cantidadIncorrecta} aria-describedby={cantidadIncorrecta ? `error-unidades-${item.id}` : undefined} />
                      {cantidadIncorrecta && <p id={`error-unidades-${item.id}`} className="error-campo" role="alert">Ingresá una cantidad entera entre 1 y 99. El total conserva la última cantidad válida.</p>}
                    </td>
                    <td>{mostrarPrecio(item.precio)}</td>
                    <td>{mostrarPrecio(item.precio * item.cantidad)}</td>
                    <td><Button onClick={() => quitarProducto(item.id)}>Quitar {item.nombre}</Button></td>
                  </tr>
                )
              })}
              {pedido.length === 0 && <tr><td colSpan="5">No hay productos seleccionados. Elegí un plato en Menú.</td></tr>}
            </tbody>
          </table>
        </div>
        <p><strong>Total: </strong><span id="totalPedido">{mostrarPrecio(calcularTotal(pedido))}</span></p>
        <Button onClick={() => navigate('/menu')}>Seguir eligiendo productos</Button>
        <Button onClick={vaciar} disabled={pedido.length === 0}>Vaciar pedido</Button>
      </section>
      <section aria-labelledby="tituloDatos">
        <h3 id="tituloDatos">Datos del pedido</h3>
        <form onSubmit={confirmar} noValidate>
          <p>Todos los campos son obligatorios.</p>
          <p>
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" placeholder="Ingrese su apellido" size="30" maxLength="50"
              autoComplete="family-name" required value={datos.apellido} onChange={cambiarDato}
              aria-invalid={Boolean(errores.apellido)} aria-describedby="error-apellido" />
          </p>
          <p id="error-apellido" className="error-campo" aria-live="polite">{errores.apellido}</p>
          <p>
            <label htmlFor="mesa">Número de mesa:</label>
            <select id="mesa" name="mesa" required value={datos.mesa} onChange={cambiarDato}
              aria-invalid={Boolean(errores.mesa)} aria-describedby="error-mesa">
              <option value="">Seleccione una mesa</option>
              {[1,2,3,4,5,6,7,8,9,10].map((mesa) => <option key={mesa} value={mesa}>Mesa {mesa}</option>)}
            </select>
          </p>
          <p id="error-mesa" className="error-campo" aria-live="polite">{errores.mesa}</p>
          <p>
            <label htmlFor="metodoPago">Método de pago:</label>
            <select id="metodoPago" name="metodoPago" required value={datos.metodoPago} onChange={cambiarDato}
              aria-invalid={Boolean(errores.metodoPago)} aria-describedby="error-metodoPago">
              <option value="">Seleccione un método de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </p>
          <p id="error-metodoPago" className="error-campo" aria-live="polite">{errores.metodoPago}</p>
          <Button type="submit" disabled={pedido.length === 0}>Confirmar Pedido</Button>
        </form>
        <p id="mensajePedido" ref={mensajeRef} role="status" aria-live="polite" tabIndex="-1">{mensaje}</p>
      </section>
    </>
  )
}

export default Pedido
