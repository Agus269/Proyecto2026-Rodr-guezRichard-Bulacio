# Revisión de integración — 5 de noviembre de 2026

El PR #25 se actualizó para reconocer el trabajo ya terminado por Agus y se
fusionó antes de iniciar la integración, desde main `c538d95`. El registro de
`segunda-entrega.md` describe etapas anteriores, no pendientes actuales.

## Consignas y evidencia

| Requisito | Implementación |
| --- | --- |
| React + Vite, scripts y dependencias | package.json, lock reproducible, dev/mock/build/lint/preview |
| useState, useEffect y useNavigate | Pedido/ProductCard, carga de Menu y botón Seguir eligiendo |
| Router y Outlet | BrowserRouter, App con cinco páginas y Layout compartido |
| components, pages, styles y api; alias | Estructura src e imports @ configurados en Vite |
| public y assets | Imágenes del catálogo y foto importada de Inicio |
| onChange, errores accesibles | Formulario controlado y cantidades; labels, aria-invalid, aria-live |
| Componente genérico reutilizado | Button en ProductCard y Pedido |
| localStorage | Clave pedido compartida, limpieza al confirmar y recuperación de JSON dañado |
| Servicio mock GET, fetch y async/await | db.json, script mock, api/productos.js y Menu |
| Todos los estilos en SCSS/styles | estilos.scss con @use, variables, anidación y mixins; CSS de plantilla retirados |
| README actualizado | Documentación raíz y segunda-entrega con dos servidores y verificaciones |
| Correcciones anteriores | Precios con miles/dos decimales; botones coherentes en vacío; fotos del sketch con errores conservadas |

Los issues docentes #17, #18 y #19 están cerrados en GitHub. Se conservaron los
archivos de primera-entrega sin modificarlos durante esta integración.

## Verificación

- 15 pruebas de primera entrega y 11 de lógica/renderizado/integración React.
- Prueba contra el mock: devuelve IDs string, normalizados antes de guardar.
- Navegador real: decimal rechazado, agregar dos hamburguesas, recargar Pedido,
  errores de formulario sin perder productos, cambiar a tres, confirmar mesa 3
  por $36.000,00; limpieza y botones deshabilitados después.
- Límite acumulado 99 comprobado en Menú y quitar el último producto en Pedido.
- Build y lint ejecutados con la aplicación conectada, no con placeholders.
- Instalación reproducida con `npm ci`; audit completo: cero vulnerabilidades.
  Se mantiene ESLint 10 con override de minimatch 11.0.1 o posterior; lint pasó.
- Cinco rutas revisadas a viewport 1280 y 390, sin imágenes rotas, campos sin
  etiqueta ni desbordamiento de página; un solo main y h1 por vista. Tabla de
  Pedido desplazable dentro de su región y foco de teclado visible.
- Vaciar un pedido de pizza y milanesa por $24.500,00 dejó ambos botones
  deshabilitados. Mock detenido: aviso accesible y en español, sin caída de la app;
  luego se restableció el servicio. Los errores de red de esa prueba negativa
  se distinguen de los recorridos normales sin errores de consola.

## Alcance

Es una demostración académica, no un sistema seguro de cobros o pedidos reales.
Necesita la API mock activa para mostrar el catálogo. Un hosting puramente
estático no ejecuta JSON Server. Los resultados son comprobaciones concretas,
no una garantía de ausencia de todos los defectos posibles.
