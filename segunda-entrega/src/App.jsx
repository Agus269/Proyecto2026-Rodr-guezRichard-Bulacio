import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import Menu from '@/pages/Menu'

const InicioPendiente = () => <h1>Inicio</h1>

const NosotrosPendiente = () => <h1>Nosotros</h1>

const UbicacionPendiente = () => <h1>Ubicación</h1>

const PedidoPendiente = () => <h1>Pedido</h1>

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<InicioPendiente />} />
        <Route path="menu" element={<Menu />} />
        <Route path="nosotros" element={<NosotrosPendiente />} />
        <Route path="ubicacion" element={<UbicacionPendiente />} />
        <Route path="pedido" element={<PedidoPendiente />} />
      </Route>
    </Routes>
  )
}

export default App