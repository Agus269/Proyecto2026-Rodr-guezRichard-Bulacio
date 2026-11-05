import { Link } from 'react-router-dom'
import hamburguesa from '@/assets/hamburguesa.webp'

const Inicio = () => (
  <>
    <section className="inicio">
      <div className="inicio-texto">
        <h2>Buena comida, directo a tu mesa</h2>
        <p>Platos clásicos, porciones para compartir y un momento para disfrutar.
          Elegí del menú y prepará tu pedido sin levantarte de la mesa.</p>
        <div className="inicio-acciones">
          <Link className="boton" to="/menu">Ver menú</Link>
          <Link className="enlace-pedido" to="/pedido">Revisar mi pedido</Link>
        </div>
      </div>
      <figure className="portada-plato">
        <img className="imagen-portada" src={hamburguesa} alt="Hamburguesa completa emplatada con papas fritas, imagen orientativa" width="1200" height="800" />
        <figcaption>Imagen ilustrativa generada para este proyecto académico.</figcaption>
      </figure>
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
