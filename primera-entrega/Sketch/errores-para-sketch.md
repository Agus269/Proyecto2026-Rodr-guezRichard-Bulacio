# Complemento en papel: mensajes de error

Pendiente del [issue #17](https://github.com/Agus269/Proyecto2026-Rodr-guezRichard-Bulacio/issues/17).
Esta guía no reemplaza las fotografías del sketch.

No hace falta rehacer los dibujos anteriores. En una hoja adicional, dibujar
Menú y Pedido con el campo que falla, un aviso de error y su botón «Aceptar».
Mostrar también dónde queda el mensaje en la página. Para los campos inválidos,
anotar que se limpia el dato y el foco vuelve al campo para corregirlo.
Se pueden numerar los casos y representar avisos alternativos sobre el mismo
boceto; incluir una vista de escritorio y otra de celular donde sean legibles.

## Casos y textos actuales

| Caso a dibujar | Dato de ejemplo | Mensaje que muestra la web |
| --- | --- | --- |
| Cantidad inválida al agregar desde Menú | 0, 1,5 o más de 99 unidades acumuladas | Ingresá una cantidad entera entre 1 y 99. Cada producto admite hasta 99 unidades en el pedido. |
| Cantidad inválida al editar Pedido | 0 o 1,5 | Ingresá una cantidad entera entre 1 y 99, o usá Quitar para eliminar el producto. |
| Cantidad pendiente de corregir al confirmar | Campo de unidades vacío | Corregí la cantidad del producto antes de confirmar. |
| Apellido inválido | Vacío o «123» | Ingresá un apellido de 2 a 50 caracteres, con letras y sin números. |
| Mesa sin seleccionar | «Seleccione una mesa» | Seleccioná una mesa del 1 al 10. |
| Pago sin seleccionar | «Seleccione un método de pago» | Seleccioná un método de pago. |
| Almacenamiento del navegador bloqueado | No se puede guardar la selección | El navegador no permite guardar el pedido. Habilitá el almacenamiento del sitio y volvé a intentar. |

Los primeros seis casos muestran un alert y un mensaje en la página.
El error de almacenamiento muestra solo un alert; no dibujar un éxito ni un
pedido confirmado en ese caso. Los productos ya guardados no se borran por
errores en los datos del formulario.

## Pedido vacío (no es un error del formulario)

Dibujar el resumen sin productos, total `$0,00`, enlace hacia Menú y los botones
«Vaciar pedido» y «Confirmar Pedido» deshabilitados. El usuario debe ir a Menú
para agregar productos; no representar «Confirmar» como un botón utilizable
en este estado, según el issue #19.

## Para terminar

1. Fotografiar los dibujos sin sombras que tapen los textos.
2. Guardar las fotos en esta carpeta, por ejemplo `sketch-errores-desktop.jpg`
   y `sketch-errores-mobile.jpg`.
3. Enlazarlas en `LEEME.md` y subirlas desde la rama Agus mediante un PR a main.
4. Avisar qué PR incorpora las fotos. El issue #17 se revisa y cierra recién
   cuando el complemento está efectivamente incorporado.
