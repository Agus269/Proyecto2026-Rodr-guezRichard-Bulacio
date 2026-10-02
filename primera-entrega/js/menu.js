let pedidoActual = [];

function mostrarProductos() {

    let contenedor = document.getElementById("listaProductos");
    let contenido = "";

    productos.forEach((producto) => {

        contenido += `
            <article class="producto">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <p>Precio: $${producto.precio}</p>

                <label for="cantidad-${producto.id}">
                    Cantidad:
                </label>

                <input
                    type="number"
                    id="cantidad-${producto.id}"
                    min="1"
                    value="1"
                >

                <button
                    type="button"
                    onclick="agregarProducto(${producto.id})"
                >
                    Agregar al pedido
                </button>

            </article>
        `;
    });

    contenedor.innerHTML = contenido;
}


function agregarProducto(idProducto) {

    let producto = productos.find(
        (producto) => producto.id === idProducto
    );

    let cantidad = Number(
        document.getElementById(
            "cantidad-" + idProducto
        ).value
    );

    if (cantidad < 1) {

        alert("La cantidad debe ser mayor a 0.");

        return;
    }

    let productoExistente = pedidoActual.find(
        (item) => item.id === idProducto
    );

    if (productoExistente) {

        productoExistente.cantidad += cantidad;

    } else {

        pedidoActual.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });
    }

    alert(
        producto.nombre +
        " agregado al pedido. Cantidad: " +
        cantidad
    );
}


document.addEventListener(
    "DOMContentLoaded",
    mostrarProductos
);