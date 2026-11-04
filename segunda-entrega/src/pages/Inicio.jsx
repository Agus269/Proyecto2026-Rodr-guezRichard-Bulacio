import { Link } from 'react-router-dom'
import hamburguesa from '@/assets/hamburguesa.svg'

const Inicio = () => (
  <>
    <section className="inicio">
      <h2>Bienvenidos</h2>
      <img className="imagen-portada" src={hamburguesa} alt="Ilustración de una hamburguesa completa" width="480" height="320" />
      <p>Somos un espacio para disfrutar buena comida y compartir un momento agradable.
        Consultá nuestro menú y prepará tu pedido directamente desde la mesa.</p>
      <p>
        <Link className="boton" to="/menu">Ver menú</Link>
        <Link className="boton" to="/pedido">Hacer pedido</Link>
      </p>
    </section>
    <section>
      <h2>Una experiencia para compartir</h2>
      <p>Preparamos cada plato al momento y trabajamos con ingredientes seleccionados.
        Nuestra propuesta combina sabores conocidos, porciones abundantes y atención cercana.</p>
    </section>
    <section>
      <h2>Opciones para todos</h2>
      <div className="destacados">
        <article><h3>Platos principales</h3><p>Alternativas clásicas para disfrutar durante el almuerzo o la cena.</p></article>
        <article><h3>Bebidas</h3><p>Opciones frescas para acompañar cada pedido.</p></article>
        <article><h3>Para compartir</h3><p>Una pizza de muzzarella para disfrutar en la mesa.</p></article>
      </div>
    </section>
  </>
)

export default Inicio
