# Segunda entrega: coordinación Nico / Agus

Estado de partida: 4 de noviembre. Base integrada de Agus: `c1f81e7`.
Referencia: `segunda-entrega/Requerimientos.md` y reparto acordado entre ambos.

## Alcance de este bloque de Nico

- Migrar los estilos existentes a módulos SCSS con variables, anidación y mixin.
- Preparar Inicio, Nosotros y Ubicación sin duplicar Header, Nav, Footer ni main.
- Preparar Pedido y sus validaciones usando el mismo formato de almacenamiento.
- Verificar las páginas de Nico separadamente mientras Agus termina rutas y Menú.
- No modificar `primera-entrega`, `App.jsx`, `main.jsx`, componentes del layout,
  configuración de Vite, dependencias ni API de Agus.

## Acuerdos de integración

- Alias ya configurado: `@` apunta a `src`.
- Páginas: exports por defecto de `@/pages/Inicio`, `Nosotros`, `Ubicacion`, `Pedido`.
- Rutas: `/`, `/menu`, `/nosotros`, `/ubicacion`, `/pedido`.
- Entrada de estilos: `@/styles/estilos.scss`. Sustituir los imports CSS de Vite
  al integrar, para que no compitan con el diseño del restaurante.
- Clave de localStorage: `pedido`, conservando el formato de la primera entrega:
  `[{ id: 1, nombre: "Hamburguesa Completa", precio: 12000, cantidad: 2 }]`.
- IDs y precios son números; cantidades enteras de 1 a 99 por producto.
- El botón genérico es responsabilidad de Agus. Integrarlo cuando estén definidos
  su export y props; no crear otra versión que compita con su componente.
- El pedido es una simulación académica: no envía compras ni realiza cobros.

## Secuencia y comprobaciones

1. SASS: compilar la entrada SCSS y conservar colores, responsive, foco y tabla desplazable.
2. Contenido: comprobar estructura semántica, enlaces de React Router e imágenes.
3. Pedido: pruebas primero para apellido, mesa, pago, cantidades, total y almacenamiento.
   Probar datos dañados, eliminar el último producto, vaciar y almacenamiento bloqueado.
4. Vista aislada: probar las páginas reales dentro del Layout de Agus, sin simular
   que existe una API o un Menú terminado. Comprobar validaciones al escribir.
5. Cierre: build, lint, pruebas, audit e inspección del diff; PR desde Nico.

## Cierre previsto para el 5 de noviembre (aproximadamente dos horas)

- 30 min: actualizar desde main y conectar las páginas y estilos con las rutas de Agus.
- 20 min: sustituir botones nativos de Pedido por el componente compartido de Agus.
- 40 min: probar Menú/API real > agregar > recargar > Pedido > modificar > confirmar.
- 30 min: revisar móvil, teclado, mensajes, consola, build, audit y README final.

La estimación depende de que Agus haya terminado routing, Button, API y Menú.
Si esos bloques siguen pendientes, no se puede garantizar ese cierre en dos horas.

## Comprobaciones del bloque de hoy

- Las cuatro páginas de Nico están implementadas; usan el Layout existente en la
  vista aislada. `pruebas/` no sustituye el routing definitivo ni simula una API.
- Formulario controlado, validaciones onChange, mensajes por campo, aria-live,
  tabla con caption, cantidades, eliminación, vaciado, total y confirmación local.
- `useNavigate` se usa en «Seguir eligiendo productos». `useRef` permite enfocar
  el aviso después de confirmar o eliminar sin buscar elementos por id.
- 9 pruebas nuevas (lógica y renderizado) y las 15 de la primera entrega pasan.
- El build aislado compila las cuatro páginas y SASS. El build normal todavía
  compila la pantalla de Vite: no demuestra una aplicación final integrada.
- ESLint pasa. Las cuatro páginas se revisaron a viewport 1280 y 390: sin
  desbordamiento de página, imágenes rotas ni campos sin label. La tabla de Pedido
  se desplaza dentro de su región en móvil.
- En navegador: pedido vacío; datos inválidos sin perder productos; cambio de
  cantidades y recarga; confirmación por `$47.000,00`, limpieza y botones
  deshabilitados; quitar el último producto; navegación con useNavigate.
- Sin errores de consola en la pestaña de prueba. Falta repetirlo con Menú/API real.

## Cómo comprobar este bloque mientras falta la integración

Desde `segunda-entrega`, ejecutar `npm ci` y `npm run dev`; abrir
`http://localhost:5173/pruebas/index.html`. El botón de arriba carga una selección
fija de prueba en la clave `pedido`; usar solo con datos descartables. La pantalla
«Menú pendiente de integración» es intencional y no cuenta como Menú implementado.

Desde la raíz:

```sh
node tests/pedido.test.cjs
node --test tests/segunda-entrega.test.mjs tests/segunda-entrega-vistas.test.mjs
node tests/build-segunda-entrega.mjs
```

El último comando compila las páginas de prueba en una carpeta temporal, sin
modificar App, Vite ni la salida normal de Agus. No es un servidor mock.

## Pendientes antes de declarar completa la segunda entrega

- **Agus 8–21:** rutas/Outlet conectado, imagen en public, db.json con catálogo,
  API fetch/async-await, Menú/useEffect/ProductCard, Button compartido,
  almacenamiento compatible, scripts mock, README y revisión de dependencias.
- **Cierre Nico:** importar SASS y retirar CSS de plantilla al conectar las rutas;
  reutilizar Button de Agus; repetir flujo completo y revisión accesible conjunta.
- Audit completo confirmado: cuatro avisos moderados en herramientas de desarrollo
  (`eslint`, `@eslint/js`, `@eslint/config-array` y `minimatch`), relacionados con
  [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
  `npm audit --omit=dev` informa cero vulnerabilidades de producción. El audit
  completo no está limpio: revisar y resolver en el bloque técnico de Agus,
  sin aplicar automáticamente el cambio mayor que propone `--force`.
- En el HTML base de Vite todavía quedan el idioma inglés y el título de plantilla.
  Cambiarlos por español, título y metadatos del restaurante al integrar.
- Verificar la ejecución de la segunda entrega y la forma de publicación que
  corresponda; GitHub Pages de la primera no ejecuta por sí solo el servicio mock.

## Entrega de este avance

Los tres bloques de código se subieron desde Nico en los commits `745ab64`
(SASS), `7a2dff7` (contenido) y `47b6af3` (Pedido y pruebas).
El [PR #25](https://github.com/Agus269/Proyecto2026-Rodr-guezRichard-Bulacio/pull/25)
queda abierto para revisión de Agus e integración. Una revisión independiente
repitió pruebas, build aislado y lint sin encontrar hallazgos dentro de este alcance.
Esto no marca la aplicación final como terminada ni acredita pruebas contra una API real.

## Actualización del 5 de noviembre: cierre de rama Nico

Esta sección actualiza los pendientes históricos del día anterior. Se incorporó
`origin/main` (`91705cb`) a Nico sin conflictos. Agus ya agregó Router, Button,
Menú, ProductCard, servicio mock, imágenes públicas y README. No se conectaron
las páginas de Nico ni el SASS en App/main: esa integración se reserva para
después de revisar y fusionar el PR #25.

Se compactó la cabecera mediante SASS y se reorganizó Inicio con texto e imagen
en dos columnas, una llamada principal a Menú y otra secundaria a Pedido.
En celular se apila en una columna. No se agregaron imágenes ni dependencias.

Para la revisión conjunta: comprobar cantidades enteras y el máximo acumulado
de 99 en ProductCard, recuperación frente a almacenamiento corrupto/bloqueado,
formato de precios con dos decimales y el tipo de id devuelto por el mock frente
al contrato numérico de Pedido. Son comprobaciones pendientes de integración;
no se modificó el código de Agus para resolverlas unilateralmente.

El PR queda abierto: primero revisión entre integrantes, luego merge, y recién
después conectar las páginas, estilos y Button y repetir el flujo completo.
