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

- Node.js
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

Inicia JSON Server utilizando `db.json`.

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
- Catálogo de productos obtenido desde `db.json`.
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
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
└── vite.config.js
```

## API mock

El catálogo se encuentra almacenado en `db.json`.

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