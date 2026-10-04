# Restaurante — Proyecto de Desarrollo Web

Sitio web académico para presentar un restaurante, consultar su menú y realizar pedidos desde una mesa.

## Índice

- [Autores](#autores)
- [Descripción](#descripción)
- [Contenido](#contenido)
- [Tecnologías](#tecnologías)
- [Estructura](#estructura)
- [Ejecución](#ejecución)
- [Publicación](#publicación)
- [Forma de trabajo](#forma-de-trabajo)
- [Pruebas y entrega](#pruebas-y-entrega)

## Autores

| Integrante | GitHub |
| --- | --- |
| **Agustín Rodríguez Richard** | [Agus269](https://github.com/Agus269) |
| **Nicolás Bulacio** | [nicobulacioo](https://github.com/nicobulacioo) |

## Descripción

El proyecto permite conocer el restaurante, consultar los platos disponibles y preparar un pedido para una mesa. El cliente podrá elegir productos del menú, revisar cantidades y total, ingresar su apellido, indicar la mesa y seleccionar el método de pago.

### Objetivo principal

Construir una experiencia clara, accesible y adaptable a computadoras y celulares, aplicando los contenidos vistos en la materia Taller de Desarrollo Web.

## Contenido

- **Inicio:** presentación general y acceso al menú.
- **Menú:** catálogo de platos disponibles.
- **Nosotros:** historia y propuesta del restaurante.
- **Ubicación:** dirección e información para llegar.
- **Pedido:** productos seleccionados, apellido, mesa, pago y confirmación.

## Tecnologías

- HTML5 para la estructura semántica.
- CSS3 para el diseño compartido y responsive.
- JavaScript para el catálogo, las validaciones y el pedido.
- `localStorage` para conservar los productos seleccionados.
- Git y GitHub para control de versiones y revisión mediante pull requests.
- GitHub Pages para la publicación del sitio.

## Estructura

```text
primera-entrega/
├── index.html
├── menu.html
├── nosotros.html
├── ubicacion.html
├── pedido.html
├── css/
│   └── estilos.css
├── js/
├── imagenes/
├── Sketch/
└── Wireframe/
```

La carpeta `segunda-entrega` se reservará para la evolución del proyecto con React y los contenidos correspondientes al segundo parcial.

## Ejecución

El proyecto no requiere instalación de dependencias para la primera entrega.

1. Clonar el repositorio.
2. Servir la carpeta `primera-entrega` con Live Server u otro servidor estático local.
3. Abrir `index.html` desde esa dirección. Usar un servidor permite compartir
   correctamente el almacenamiento entre Menú y Pedido; el comportamiento de
   `localStorage` con archivos abiertos mediante `file://` puede variar.

## Publicación

La dirección prevista para el sitio es [GitHub Pages — Restaurante](https://agus269.github.io/Proyecto2026-Rodr-guezRichard-Bulacio/primera-entrega/). El enlace quedará operativo cuando GitHub Pages sea habilitado desde la rama `main`.

## Forma de trabajo

- Cada integrante desarrolla en su rama personal: `Agus` o `Nico`.
- Los cambios se incorporan a `main` mediante pull requests.
- Los commits siguen la convención [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).
- Antes de integrar un cambio, el otro integrante revisa navegación, accesibilidad y cumplimiento de las consignas.

## Pruebas y entrega

La web representa un restaurante ficticio. Dirección, horarios y contactos son
ejemplos; la confirmación no envía pedidos ni procesa pagos.

El pedido admite de 1 a 99 unidades por producto. Se conserva en el navegador
hasta vaciarlo o confirmar. La confirmación de demostración limpia la selección.

Para ejecutar las pruebas de lógica con Node, sin instalar paquetes:

```sh
node tests/pedido.test.cjs
```

- [Estado y relación con las clases](docs/entrega-primera.md).
- [Wireframes desktop/mobile y estados](primera-entrega/Wireframe/wireframes-restaurante.pdf).
- [Fotos del sketch inicial y pendientes](primera-entrega/Sketch/LEEME.md).
- [Origen de las imágenes](primera-entrega/imagenes/LEEME.md).

El PDF se puede regenerar con `python herramientas/generar_wireframes.py .`
si se dispone de ReportLab. Esa herramienta no es necesaria para ejecutar la web.
