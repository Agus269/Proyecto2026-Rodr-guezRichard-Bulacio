import { Link } from 'react-router-dom'

const Nosotros = () => (
  <>
    <section>
      <h2>Nuestra historia</h2>
      <p>El restaurante nació como un lugar de encuentro para familias y amigos.
        Desde el comienzo buscamos ofrecer platos abundantes, sabores familiares y una atención cálida.</p>
      <p>Con el tiempo ampliamos nuestra carta, pero mantuvimos la misma idea:
        cocinar al momento y hacer que cada persona se sienta bienvenida.</p>
    </section>
    <section>
      <h2>Nuestros valores</h2>
      <ul>
        <li>Calidad y cuidado en la preparación de cada plato.</li>
        <li>Atención respetuosa y cercana.</li>
        <li>Un ambiente cómodo para compartir.</li>
        <li>Mejora continua a partir de la opinión de nuestros clientes.</li>
      </ul>
    </section>
    <section>
      <h2>Nuestro equipo</h2>
      <p>Cocineros, personal de salón y responsables de atención trabajan de manera coordinada
        para que los pedidos lleguen correctamente a cada mesa.</p>
      <Link to="/ubicacion">Conocé dónde encontrarnos</Link>
    </section>
  </>
)

export default Nosotros
