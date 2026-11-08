# Segunda entrega - Restaurante

Proyecto realizado para la materia **Taller de Desarrollo Web** de la Universidad Católica de Córdoba.

La segunda entrega migra el proyecto del restaurante a **React**, incorporando enrutamiento, componentes reutilizables, SASS y persistencia mediante una API mock.

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

Copiar `.env.example` a `.env`. La variable `VITE_BASE_URL=http://localhost:3000/`
define la URL base de la API. Reiniciar Vite si cambia su valor. El archivo `.env` no se versiona.

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
- Catálogo de productos obtenido mediante JSON Server.
- Consumo de la API mediante `fetch`, `async` y `await`.
- Uso de `useState` y `useEffect`.
- Componentes reutilizables como `Button` y `ProductCard`.
- Selección de productos y cantidades.
- Persistencia del pedido mediante el endpoint `/pedido`.
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

JSON Server utiliza `src/data/db.json` para almacenar el catálogo y el pedido.

La aplicación consulta los productos mediante:

```text
GET /productos
```

La comunicación se realiza mediante `fetch` utilizando funciones asincrónicas con `async/await`.

## Pedido

Los productos seleccionados se persisten en JSON Server mediante:

```text
GET /pedido          # Consultar el pedido
POST /pedido         # Agregar un producto nuevo
PATCH /pedido/:id    # Actualizar o acumular cantidades
DELETE /pedido/:id   # Quitar un producto
```

Cada registro conserva `productoId`, nombre, precio y cantidad; JSON Server genera
su propio `id`. Agregar un producto existente acumula unidades sin duplicarlo.
Vaciar o confirmar el pedido elimina sus registros mediante DELETE.

## Integración y validaciones

Las cinco rutas usan las páginas reales de ambos integrantes dentro del Layout.
Toda la aplicación importa `@/styles/estilos.scss`; los CSS de plantilla y la
vista aislada de pruebas se retiraron. Button se reutiliza en Menú y Pedido.
Los IDs string del mock se normalizan a números al leer la API.

Se aceptan de 1 a 99 unidades enteras por producto, también al acumular varias
veces. Los errores se muestran junto al campo y con mensajes accesibles. La
confirmación es una simulación: no envía pedidos ni cobra; limpia el pedido solo
si se pudo guardar el cambio en la API.

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
