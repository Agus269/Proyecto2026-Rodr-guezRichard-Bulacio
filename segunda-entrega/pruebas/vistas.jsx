import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Inicio from '@/pages/Inicio'
import Nosotros from '@/pages/Nosotros'
import Ubicacion from '@/pages/Ubicacion'
import Pedido from '@/pages/Pedido'
import { guardarPedido } from '@/utils/pedido'
import '@/styles/estilos.scss'

// Esta entrada es de prueba: no reemplaza App ni implementa el Menú/API de Agus.
const cargarEjemplo = () => {
  const guardado = guardarPedido([
    {id:1,nombre:'Hamburguesa Completa',precio:12000,cantidad:2},
    {id:2,nombre:'Pizza Muzzarella',precio:11000,cantidad:1},
  ])
  if (guardado) {
    window.location.hash = '/pedido'
    window.location.reload()
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <aside aria-label="Herramientas de prueba">
      <p>Vista aislada de Nico. La integración con Menú/API y Router se revisa después del PR #25.</p>
      <button type="button" onClick={cargarEjemplo}>Cargar pedido de prueba</button>
    </aside>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="ubicacion" element={<Ubicacion />} />
        <Route path="pedido" element={<Pedido />} />
        <Route path="menu" element={<section><h2>Menú pendiente de integración</h2><p>El Menú de Agus ya está en main. Esta vista aislada no lo conecta todavía.</p></section>} />
      </Route>
    </Routes>
  </HashRouter>,
)
