const Ubicacion = () => (
  <>
    <section>
      <h2>Dónde encontrarnos</h2>
      <p>Restaurante ficticio para un trabajo académico. Dirección, horarios y contactos de ejemplo.</p>
      <address>Avenida Colón 1234<br />Córdoba, Argentina</address>
      <p>
        <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Col%C3%B3n+1234+C%C3%B3rdoba+Argentina"
          target="_blank" rel="noopener noreferrer">Abrir ubicación en Google Maps</a>
      </p>
    </section>
    <section>
      <h2>Horarios</h2>
      <div className="tabla-horarios" role="region" aria-label="Horarios de atención" tabIndex="0">
        <table>
          <caption>Horarios de atención</caption>
          <thead><tr><th scope="col">Días</th><th scope="col">Horario</th></tr></thead>
          <tbody>
            <tr><th scope="row">Martes a jueves</th><td>12:00 a 15:30 y 20:00 a 00:00</td></tr>
            <tr><th scope="row">Viernes y sábado</th><td>12:00 a 16:00 y 20:00 a 01:00</td></tr>
            <tr><th scope="row">Domingo</th><td>12:00 a 16:00</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <section>
      <h2>Contacto</h2>
      <p>Teléfono: <a href="tel:+543511234567">(351) 123-4567</a></p>
      <p>Correo: <a href="mailto:contacto@restaurante.com">contacto@restaurante.com</a></p>
    </section>
  </>
)

export default Ubicacion
