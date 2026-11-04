import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/menu">Menú</NavLink>
      <NavLink to="/nosotros">Nosotros</NavLink>
      <NavLink to="/ubicacion">Ubicación</NavLink>
      <NavLink to="/pedido">Pedido</NavLink>
    </nav>
  )
}

export default Nav