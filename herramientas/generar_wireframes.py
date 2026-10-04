from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from pathlib import Path
import sys

root = Path(sys.argv[1])
output = root / "primera-entrega/Wireframe/wireframes-restaurante.pdf"
c = canvas.Canvas(str(output), pagesize=(1000, 800))
c.setTitle("Restaurante - Wireframes desktop y mobile")
c.setAuthor("Proyecto Rodríguez Richard - Bulacio")
def text(x, y, value, size=11):
    c.setFillColor(HexColor("#252525"))
    c.setFont("Helvetica",size)
    c.drawString(x,y,value)
def box(x,y,w,h,label="",fill="#f4f4f4"):
    c.setFillColor(HexColor(fill))
    c.setStrokeColor(HexColor("#888888"))
    c.rect(x,y,w,h,fill=1,stroke=1)
    if label: text(x+10,y+h-20,label,11)
def lines(x,y,items,step=17):
    for item in items:
        text(x,y,item,10)
        y-=step
def shell(title):
    text(30,766,"RESTAURANTE / "+title,21)
    text(30,744,"Wireframe actualizado - primera entrega - 04/10/2026",11)
    text(30,714,"ESCRITORIO",12)
    text(730,714,"CELULAR",12)
    box(30,100,650,595,fill="#ffffff")
    box(730,100,235,595,fill="#ffffff")
    box(30,634,650,61,"Restaurante")
    box(30,596,650,38)
    text(44,609,"Inicio     Menú     Nosotros     Ubicación     Pedido",11)
    box(730,646,235,49,"Restaurante")
    box(730,557,235,89)
    lines(745,625,["Inicio                 Menú","Nosotros            Ubicación","                  Pedido"],25)
    box(30,100,650,33,"Restaurante - Córdoba")
    box(730,100,235,33,"Restaurante - Córdoba")
def footer(num,notes):
    lines(30,72,notes,16)
    text(936,28,str(num),10)
    c.showPage()

shell("Inicio")
box(50,362,610,214,"Bienvenidos")
box(240,419,220,113,"Ilustración del plato")
text(190,397,"Presentación del restaurante y pedidos por mesa")
box(230,371,110,25,"Ver menú")
box(351,371,125,25,"Hacer pedido")
box(50,271,610,78,"Una experiencia para compartir")
for x,label in [(50,"Platos"),(257,"Bebidas"),(464,"Postres")]:
    box(x,153,196,104,label)
box(745,334,205,209,"Bienvenidos")
box(761,411,173,90,"Ilustración")
box(761,375,173,27,"Ver menú")
box(761,340,173,27,"Hacer pedido")
box(745,250,205,70,"Experiencia para compartir")
box(745,146,205,90,"Categorías apiladas")
footer(1,["Las cinco páginas mantienen la misma navegación. En celular los enlaces siguen visibles.",
          "Los botones de Inicio llevan al catálogo y al resumen del pedido."])

shell("Menú")
text(50,566,"Elegí productos / precios en pesos / mensaje de agregado",12)
for i in range(3):
    x=50+i*207
    box(x,198,196,347)
    box(x+10,396,176,131,"Ilustración")
    lines(x+10,376,["Nombre del producto","Descripción","Precio: $12000.00","Cantidad [ 1 ]"],24)
    box(x+10,221,176,34,"Agregar al pedido")
text(50,167,"Más productos debajo. Enlace: Ver Pedido",11)
box(745,180,205,359,"Producto")
box(758,382,179,128,"Ilustración")
lines(758,357,["Nombre y descripción","Precio: $12000.00","Cantidad [ 1 ]"],30)
box(758,234,179,42,"Agregar al pedido")
text(758,207,"Más tarjetas al desplazar",10)
footer(2,["Agregar valida cantidades enteras de 1 a 99 y conserva la selección al recargar.",
          "Error: alert + mensaje visible; se vacía y enfoca el campo incorrecto."])

shell("Nosotros")
for y,label in [(439,"Nuestra historia"),(288,"Nuestros valores"),(151,"Nuestro equipo")]:
    box(50,y,610,130,label)
    lines(65,y+85,["Contenido del restaurante ficticio.","Texto breve, legible y organizado por sección."])
for y,label in [(420,"Nuestra historia"),(284,"Nuestros valores"),(148,"Nuestro equipo")]:
    box(745,y,205,122,label)
    lines(757,y+72,["Contenido apilado","y texto adaptable."])
footer(3,["La versión actual separa Nosotros y Ubicación para mantener las cinco páginas acordadas.",
          "Desde Nuestro equipo se puede acceder a la página Ubicación."])

shell("Ubicación")
box(50,429,610,141,"Dónde encontrarnos")
lines(65,525,["Aviso: datos de ejemplo de un restaurante ficticio.","Dirección / Córdoba, Argentina","Abrir ubicación en Google Maps"])
box(50,260,610,153,"Horarios")
lines(65,369,["Tabla: días y horarios de atención","Caption y encabezados de columna","Martes a jueves / viernes y sábado / domingo"])
box(50,149,610,93,"Contacto")
lines(65,201,["Teléfono y correo de ejemplo"])
box(745,394,205,147,"Dónde encontrarnos")
lines(757,488,["Aviso de datos ficticios","Dirección","Abrir Google Maps"])
box(745,249,205,132,"Horarios")
lines(757,327,["Tabla de días y horas"])
box(745,147,205,87,"Contacto")
footer(4,["El mapa abre en otra pestaña; la dirección no representa un negocio real.",
          "Se mantienen títulos, enlaces descriptivos y tabla con caption."])

shell("Pedido")
box(50,366,610,206,"Resumen del pedido")
lines(65,526,["Producto | Cantidad | Precio unitario | Subtotal | Quitar",
               "Hamburguesa | [ 2 ] | $12000.00 | $24000.00 | [Quitar]",
               "Total: $24000.00"],26)
box(65,382,140,31,"Vaciar pedido")
text(233,393,"Seguir eligiendo productos",11)
box(50,148,610,204,"Datos del pedido")
lines(65,300,["Apellido: [                         ]","Mesa: [Seleccionar 1 a 10]","Pago: [Efectivo / Transferencia / Tarjeta]"],28)
box(65,164,180,30,"Confirmar Pedido")
box(745,356,205,184,"Resumen")
lines(757,490,["Tabla con desplazamiento","horizontal dentro del bloque.","Total: $24000.00"],22)
box(757,370,180,31,"Vaciar pedido")
box(745,147,205,194,"Datos del pedido")
lines(757,291,["Apellido [                     ]","Mesa [                           ]","Método de pago [           ]"],27)
box(757,159,180,32,"Confirmar Pedido")
footer(5,["Cambiar cantidad recalcula el total; Quitar elimina una fila; Vaciar borra la selección.",
          "La confirmación es una simulación: no se envía un pedido ni se cobra dinero."])

text(30,760,"PEDIDO / ESTADOS Y FLUJO",22)
text(30,731,"Inicio > Menú > agregar productos > Pedido > completar datos > confirmar",13)
box(30,520,445,176,"Pedido vacío")
lines(45,646,["No hay productos seleccionados.","Enlace a Menú para comenzar.","Confirmar sin productos muestra un alert y un mensaje."])
box(515,520,450,176,"Cantidad incorrecta")
lines(530,646,["Vacío, cero, negativo, decimal o más de 99:","alert con explicación; el campo queda vacío y recibe foco.","El pedido guardado no se reemplaza por el valor inválido."])
box(30,299,445,176,"Datos incompletos o inválidos")
lines(45,425,["Apellido: letras, espacios, guion y apóstrofe; 2 a 50 caracteres.","Mesa: 1 a 10. Pago: una de las tres opciones.","El mensaje identifica el campo y permite corregirlo.","Los demás datos y los productos permanecen."])
box(515,299,450,176,"Confirmación")
lines(530,425,["Pedido de demostración confirmado para [apellido], mesa [n].","Total: $[importe]. Método de pago: [opción].","No se realizó ningún cobro.","Se vacía el pedido; no se permite confirmar dos veces."])
box(30,124,935,130,"Evolución del diseño")
lines(45,206,["El borrador anterior tenía cuatro páginas y datos de entrega a domicilio.",
              "La versión acordada mantiene cinco páginas y utiliza apellido, mesa y pago.",
              "Este PDF es un wireframe digital actualizado; no sustituye las fotos del sketch en papel.",
              "Los estados de error y confirmación se aplican tanto a escritorio como a celular."])
footer(6,["Wireframes creados digitalmente para documentar el flujo actual del proyecto."])
c.save()
print(output)
