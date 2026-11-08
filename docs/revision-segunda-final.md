# Revisión de integración — 5 de noviembre de 2026

> Registro histórico de la integración inicial. La revisión del 8 de noviembre,
> al final de este archivo, actualiza la persistencia y las cantidades del Menú.

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

## Correcciones del 8 de noviembre de 2026

Se revisaron los issues docentes #29 a #33 sobre main `f557df6`.
Agus ya había trasladado la base a `src/data/db.json`, incorporado
POST/PATCH/DELETE de `/pedido` y ubicado Layout en `src/layout`.

Para completar la corrección de cantidades (#33), el campo de Menú expresa
el total deseado. Al volver desde Pedido recupera las unidades guardadas;
guardar 3 cuando ya hay 3 mantiene 3 y cambiar a 4 deja 4. El botón cambia
de Agregar al pedido a Guardar cantidad y se muestra la cantidad persistida.
Esta interpretación conserva lo pedido por la profesora sin sumar de nuevo
la cantidad que ya estaba seleccionada.

Se retiraron los archivos sin uso de Vite y las ilustraciones de platos
reemplazadas por WebP en la segunda entrega (#31). La foto importada desde
assets y las imágenes usadas desde public se conservan.

Se recuperó el requisito de localStorage guardando mesa y método de pago
con la clave `datosPedido`, sin duplicar el pedido que pertenece a la API.
Los datos inválidos o el almacenamiento bloqueado no impiden usar el formulario.
Se corrigieron el import relativo de la API y las cadenas `.then`, conservando
alias y funciones async/await. No se agregaron dependencias ni se modificaron
los estilos, las fotografías actuales o los archivos de la primera entrega.

Relación con las clases: formularios controlados, useState/useEffect, props,
Router/Outlet y alias de la unidad 6; arrays, validación y localStorage de
JavaScript; fetch/async/await y JSON Server del servicio mock. Se mantiene
la estructura y la división de SCSS ya existentes.

La lectura del pedido espera las escrituras que ya se iniciaron en esta
aplicación, para no mostrar cantidades anteriores si se cambia de página
mientras termina un PATCH. La prueba reprodujo el fallo antes de corregirlo.

### Comprobaciones de esta revisión

- 15 pruebas de la primera entrega y 10 de lógica, persistencia, API y vistas
  React aprobadas. Las pruebas de API usan JSON Server real con una copia temporal
  de la base; el archivo del proyecto queda intacto.
- Guardado repetido de 3 conserva 3; cambiar a 4 deja 4. Sin duplicados,
  admitiendo 99 y rechazando vacío, 0, decimales y cantidades mayores a 99.
- localStorage: recuperación de mesa/pago, JSON dañado, tipos inválidos y
  almacenamiento bloqueado. Recarga real del formulario comprobada.
- Navegador: confirmación de cuatro hamburguesas para mesa 3 por $48.000,00,
  formulario inválido sin perder productos, vaciado y botones deshabilitados.
- Cinco páginas a 390 y 1280 píxeles: sin desbordamiento de página, imágenes
  rotas, campos sin label ni errores de consola en el recorrido normal.
- API apagada: aviso de conexión accesible en español, sin caída de la aplicación.
- Compilación de producción y SASS aprobada, ESLint sin errores y auditoría
  completa de dependencias con cero vulnerabilidades.
- Imports internos con alias, sin cadenas `.then`, Button reutilizado,
  Router/Outlet, metadatos, imágenes en public/assets y estilos SCSS revisados.
- La primera entrega mantiene las fotos del sketch con errores, los wireframes,
  los metadatos, el menú con arrays/forEach y las correcciones de precios/botones.
  No se modificó ninguno de sus archivos. Classroom sigue descartado según la
  aclaración docente registrada en `entrega-primera.md`.

Se realizó además una revisión independiente del diff. No quedan fallos conocidos
en el alcance revisado; esta evidencia corresponde a una demostración académica
con API mock, no a un sistema de pedidos multiusuario o de pagos reales.
