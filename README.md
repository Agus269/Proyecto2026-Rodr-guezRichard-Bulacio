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
2. Abrir `primera-entrega/index.html` en un navegador moderno.
3. Para desarrollo local, se recomienda servir la carpeta con una extensión como Live Server para comprobar correctamente la navegación y el almacenamiento.

## Publicación

La dirección prevista para el sitio es [GitHub Pages — Restaurante](https://agus269.github.io/Proyecto2026-Rodr-guezRichard-Bulacio/primera-entrega/). El enlace quedará operativo cuando GitHub Pages sea habilitado desde la rama `main`.

## Forma de trabajo

- Cada integrante desarrolla en su rama personal: `Agus` o `Nico`.
- Los cambios se incorporan a `main` mediante pull requests.
- Los commits siguen la convención [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).
- Antes de integrar un cambio, el otro integrante revisa navegación, accesibilidad y cumplimiento de las consignas.
