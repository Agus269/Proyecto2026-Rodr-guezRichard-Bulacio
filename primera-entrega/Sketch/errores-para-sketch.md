# Complemento en papel: mensajes de error

Corrección completada en el [issue #17](https://github.com/Agus269/Proyecto2026-Rodr-guezRichard-Bulacio/issues/17).

Las fotografías con los mensajes y estados de error ya fueron incorporadas
al repositorio mediante el PR #21. Esta guía se conserva como referencia
del trabajo realizado.
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

## Resultado final

- Se incorporaron las fotografías `sketch mensajes de error.jpg` y
  `sketch mensajes de error 2.jpg`.
- Los dibujos representan los estados de error solicitados.
- El PR #21 fue integrado a `main`.
- El issue #17 fue cerrado como completado.