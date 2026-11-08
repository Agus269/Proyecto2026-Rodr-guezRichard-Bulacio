import { Route, Routes } from 'react-router-dom'

import Layout from '@/layout/Layout'
import Menu from '@/pages/Menu'
import Inicio from '@/pages/Inicio'
import Nosotros from '@/pages/Nosotros'
import Ubicacion from '@/pages/Ubicacion'
import Pedido from '@/pages/Pedido'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="menu" element={<Menu />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="ubicacion" element={<Ubicacion />} />
        <Route path="pedido" element={<Pedido />} />
        <Route path="*" element={<section><h2>Página no encontrada</h2><Link to="/">Volver a Inicio</Link></section>} />
      </Route>
    </Routes>
  )
}

export default App
