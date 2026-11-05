import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'

const InicioPendiente = () => <h1>Inicio</h1>

const MenuPendiente = () => <h1>Menú</h1>

const NosotrosPendiente = () => <h1>Nosotros</h1>

const UbicacionPendiente = () => <h1>Ubicación</h1>

const PedidoPendiente = () => <h1>Pedido</h1>

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<InicioPendiente />} />
        <Route path="menu" element={<MenuPendiente />} />
        <Route path="nosotros" element={<NosotrosPendiente />} />
        <Route path="ubicacion" element={<UbicacionPendiente />} />
        <Route path="pedido" element={<PedidoPendiente />} />
      </Route>
    </Routes>
  )
}

export default App