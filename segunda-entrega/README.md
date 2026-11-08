# Segunda entrega - Restaurante

Proyecto realizado para la materia **Taller de Desarrollo Web** de la Universidad Católica de Córdoba.

La segunda entrega migra el proyecto del restaurante a **React**, incorporando enrutamiento, componentes reutilizables, SASS, consumo de una API mock y almacenamiento local.

## Integrantes

- Agustín Rodríguez Richard
- Nicolás Bulacio

## Tecnologías utilizadas

- HTML5
- React
- Vite
- JavaScript
- React Router DOM
- SASS
- JSON Server
- LocalStorage
- ESLint

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js 22.12 o posterior (verificado con Node 24)
- npm

## Instalación

Desde la carpeta `segunda-entrega` ejecutar:

```bash
npm install
```

## Ejecución del proyecto

El proyecto utiliza dos servidores: Vite para la aplicación React y JSON Server como API mock.

### 1. Iniciar la API mock

En una terminal, desde `segunda-entrega`:

```bash
npm run mock
```

La API estará disponible en:

```text
http://localhost:3000
```

Los productos pueden consultarse en:

```text
http://localhost:3000/productos
```

### 2. Iniciar la aplicación

En otra terminal:

```bash
npm run dev
```

Vite mostrará en consola la dirección local para abrir la aplicación en el navegador.

## Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite.

```bash
npm run mock
```

Inicia JSON Server utilizando `src/data/db.json`.

```bash
npm run build
```

Genera la versión de producción del proyecto.

```bash
npm run lint
```

Ejecuta ESLint para revisar el código.

```bash
npm run preview
```

Permite visualizar localmente el build generado.

## Funcionalidades

- Navegación mediante React Router.
- Layout general con Header, Nav, contenido mediante Outlet y Footer.
- Catálogo de productos obtenido desde `src/data/db.json`.
- Consumo de la API mediante `fetch`, `async` y `await`.
- Uso de `useState` y `useEffect`.
- Componentes reutilizables como `Button` y `ProductCard`.
- Selección de productos y cantidades.
- Persistencia del pedido mediante `localStorage`.
- Diseño responsive mediante SASS.
- Validaciones del formulario de pedido.
- Separación del proyecto en componentes, páginas, estilos y API.

## Estructura principal

```text
segunda-entrega/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   └── db.json
│   ├── layout/
│   │   └── Layout.jsx
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## API mock

El catálogo se encuentra almacenado en `src/data/db.json`.

La aplicación consulta los productos mediante:

```text
GET /productos
```

La comunicación se realiza mediante `fetch` utilizando funciones asincrónicas con `async/await`.

## Pedido

Los productos seleccionados se almacenan en el navegador utilizando la clave:

```text
pedido
```

Cada elemento conserva el siguiente formato:

```json
{
  "id": 1,
  "nombre": "Hamburguesa Completa",
  "precio": 12000,
  "cantidad": 2
}
```

Este almacenamiento permite conservar el pedido al navegar entre las distintas páginas de la aplicación.

## Integración y validaciones

Las cinco rutas usan las páginas reales de ambos integrantes dentro del Layout.
Toda la aplicación importa `@/styles/estilos.scss`; los CSS de plantilla y la
vista aislada de pruebas se retiraron. Button se reutiliza en Menú y Pedido.
Los IDs string del mock se normalizan a números al leer la API.

Se aceptan de 1 a 99 unidades enteras por producto, también al acumular varias
veces. Los errores se muestran junto al campo y con mensajes accesibles. La
confirmación es una simulación: no envía pedidos ni cobra; limpia el pedido solo
si se pudo guardar el cambio en localStorage.

Para reproducir la instalación exacta usar `npm ci`. Desde la raíz del repositorio:

```sh
node tests/pedido.test.cjs
node --test tests/segunda-entrega.test.mjs tests/segunda-entrega-vistas.test.mjs
node tests/build-segunda-entrega.mjs
```

Desde esta carpeta: `npm run lint`, `npm run build` y `npm audit`.
Se mantiene ESLint 10; el override de minimatch 11.0.1 o posterior corrige
GHSA-g3hv-75wg-m249 y se verificó con lint y audit completo. No se utilizó
`npm audit fix --force` ni se mantuvo una versión sin soporte de ESLint.

Las imágenes de platos son ilustrativas, generadas para este trabajo y guardadas
en el repositorio. Ver [origen y prompts](public/imagenes/LEEME.md).
Se conservan las fotos de sketch de la primera entrega, incluidos sus mensajes
de error. Ver [revisión final](../docs/revision-segunda-final.md).
