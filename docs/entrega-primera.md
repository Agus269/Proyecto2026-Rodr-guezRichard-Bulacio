# Estado de la primera entrega

Revisión del 4 de octubre de 2026. Fuente: Proyecto.html de la cátedra y
primera-entrega/Requerimientos.md. Este documento distingue trabajo implementado
de condiciones de entrega todavía pendientes.

## Funcionalidad implementada

- Catálogo de seis productos conservando identificadores, precios y clave `pedido`.
- Agregar cantidades enteras de 1 a 99 por producto y conservarlas al recargar.
- Resumen con precio unitario, cantidad, subtotal y total.
- Cambiar cantidades, quitar un producto y vaciar el pedido.
- Validar apellido, mesa y método de pago. Error con alert, mensaje, limpieza y foco.
- Confirmación académica sin cobros ni comunicaciones a un negocio.
- HTML con metadatos, favicon, imágenes locales con alt, labels y captions.
- CSS compartido, selectores por etiqueta/clase/id, fuente externa y responsive.
- Wireframes desktop/mobile de las cinco páginas y estados de error en PDF.

## Relación con las clases

HTML avanzado: formularios, etiquetas semánticas, labels y atributos de campos.
CSS y CSS avanzado: selectores, flex, grid, variables, transiciones, media queries,
fuentes, sombras y bordes. JavaScript 1 a 3: funciones flecha, bucles, arrays,
objetos, DOM, eventos en HTML, innerHTML, alert, JSON y localStorage.

Todas las funciones del sitio están documentadas con JSDoc. Los eventos están en
atributos HTML; los cuerpos de las funciones están en archivos JavaScript externos.

Detalles complementarios que no se confirmaron en las filminas:

- `try/catch` y `Array.isArray`: evitan que datos dañados o almacenamiento bloqueado
  detengan el catálogo. `typeof` verifica los datos recuperados.
- `trim`, `toLowerCase` e `includes`: normalizan y revisan el apellido.
- `aria-live`, `role=status`, `aria-current` y `tabindex=-1`: anuncian cambios y
  permiten enfocar mensajes sin agregar pasos al recorrido con Tab.
- `novalidate`: permite que la función propia muestre el alert y limpie el campo,
  como exige la consigna; no elimina la validación realizada por JavaScript.
- `prefers-reduced-motion`: reduce transiciones si el usuario lo pide en su sistema.
- `noopener noreferrer`: protege el enlace de mapa que abre otra pestaña.
- SVG: formato de imágenes vectoriales locales; no agrega una librería al sitio.

Las pruebas Node y el generador Python del PDF son herramientas de desarrollo;
el navegador del usuario solo ejecuta HTML, CSS y JavaScript.

## Verificación

Ejecutar `node tests/pedido.test.cjs` desde la raíz. Cubre límites de cantidades,
entradas inválidas, datos guardados corruptos, precios del catálogo, acumulación,
resumen, cambio, eliminación, vaciado, apellidos, campos obligatorios, confirmación,
doble confirmación y almacenamiento bloqueado.

En navegador: revisar las cinco páginas, imágenes, consola y navegación con
teclado; probar Menú > agregar > recargar > Pedido > cambiar > confirmar.
En celular la tabla del pedido se desplaza dentro de su bloque.

Resultado de esta revisión: las 13 pruebas de lógica pasan. En el navegador se
comprobó persistencia al recargar, resumen, actualización con teclado, eliminación
y confirmación. Las cinco páginas se revisaron a 390 px y en escritorio, sin
desbordamiento de página, imágenes rotas, IDs duplicados, campos sin label ni
tablas sin caption. No se registraron errores de consola en la pestaña de prueba.
El diálogo alert bloqueó la primera pestaña de automatización: las ramas de error
y limpieza se verificaron en pruebas de lógica, pero conviene probar manualmente
Aceptar en esos diálogos antes de entregar.

Se corrigió y comprobó en navegador que escribir una cantidad y hacer clic
inmediatamente en Quitar elimina el producto con un solo clic. La actualización
del importe conserva los controles existentes para no interrumpir ese clic.

## Pendientes que requieren a los integrantes

- Ya se incorporaron tres fotos del sketch inicial en papel en `primera-entrega/Sketch`.
  Falta completar mobile y adecuar las láminas al template, con Ubicación y errores.
  Las fotos conservan el diseño original; el wireframe refleja la evolución actual.
- Habilitar GitHub Pages desde Settings con una cuenta administradora del repo.
  La cuenta de Nico tiene permiso de escritura, pero no de administración.
  En la cuenta de Agus: Settings > Pages > Deploy from a branch > main > / (root)
  > Save. Luego abrir la URL del README terminada en /primera-entrega/.
- Revisar la entrega desde la cuenta de Agus y confirmar que los dos pueden
  explicar el código. Las correcciones preservan su catálogo y almacenamiento.

## Historial y alcance

El repositorio proviene del template UCC-TallerDesarrolloWeb/proyecto2026.
Las ramas personales son Agus y Nico. Varios mensajes históricos de Agus no
siguen Conventional Commits; no se reescriben commits ya compartidos.
Los commits nuevos sí utilizan la convención.

El nombre actual contiene `Rodr-guezRichard`; no se renombra el repositorio
compartido sin coordinar con su propietario.

React, Vite, SASS y servicios simulados pertenecen al segundo parcial y no son
requisitos implementados en esta primera entrega.

## Rechequeo final

Se volvió a ejecutar la suite: 13 pruebas aprobadas y los tres archivos JavaScript
sin errores de sintaxis. Un análisis con HTMLParser comprobó cierre y anidación
de etiquetas, referencias locales, metadatos, IDs, labels y captions en las cinco
páginas. Este análisis no sustituye un validador completo de HTML.

En navegador se comprobaron nuevamente las cinco páginas a 1280 y 390 px:
sin imágenes rotas, campos sin etiqueta, desbordamiento de página ni errores de
consola. Cada navegación contiene los cinco destinos. Se ajustó Inicio para
presentar pizza para compartir en lugar de anunciar postres ausentes del catálogo.

| Consigna | Resultado y evidencia |
| --- | --- |
| HTML, imágenes y CSS compartido | Implementados; referencias y estructura verificadas. |
| Accesibilidad pedida | Alt, labels con for y captions presentes; revisión de DOM y código. |
| JavaScript y documentación | Funciones flecha externas con JSDoc, eventos HTML y 13 pruebas aprobadas. |
| README y organización | Secciones, índice, negritas, tabla, tecnologías, autores y enlace de publicación presentes. |
| Ramas y participación | Ramas Agus y Nico; trabajo de ambos conservado e integrado por PR. |
| Historial de al menos 10 commits en 4 días | Superado: 14 commits de trabajo sin contar merges ni el commit del template, distribuidos en 4 fechas. |
| Conventional Commits | Cumplido en los cambios nuevos; mensajes históricos de Agus pendientes de aceptación docente. |
| Wireframe desktop/mobile | PDF de las cinco páginas y estados; revisado visualmente. |
| Sketch | Tres fotos originales incorporadas; faltan mobile completo, template, Ubicación y errores. |
| Publicación | URL pública y API de Pages devolvieron 404; Nico no tiene permiso admin. Requiere Agus. |

El intento adicional de probar la alerta de pedido vacío volvió a bloquear el
control automático del navegador. Sigue pendiente comprobar manualmente Aceptar.
No se marca la entrega como completa hasta resolver sketch y publicación.

El nombre del repositorio difiere del patrón literal solicitado por la consigna.
Su propietario debe confirmar el nombre y la vinculación con GitHub Classroom;
el origen en el template de la cátedra por sí solo no demuestra esa vinculación.
