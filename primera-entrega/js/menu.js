/**
 * Recorre el array con forEach y dibuja las tarjetas con sus controles de cantidad.
 * @method mostrarProductos
 * @return {void}
 */
const mostrarProductos = () => {
    let contenido = "";
    productos.forEach((producto) => {
        contenido += `
            <article class="producto">
                <img src="${producto.imagen}" alt="Ilustración de ${producto.nombre}" width="480" height="320">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: ${mostrarPrecio(producto.precio)}</p>
                <label for="cantidad-${producto.id}">Cantidad de ${producto.nombre}:</label>
                <input type="number" id="cantidad-${producto.id}" min="1" max="99" step="1" value="1">
                <button type="button" onclick="agregarProducto(${producto.id})">Agregar al pedido</button>
            </article>
        `;
    });
    document.getElementById("listaProductos").innerHTML = contenido;
};

/**
 * Valida la cantidad y agrega unidades al pedido guardado.
 * @method agregarProducto
 * @param {number} idProducto - Identificador del producto elegido.
 * @return {void}
 */
const agregarProducto = (idProducto) => {
    const producto = buscarProducto(idProducto);
    const campo = document.getElementById("cantidad-" + idProducto);
    if (!producto || !campo) {
        return;
    }
    const cantidad = Number(campo.value);
    const pedido = leerPedido();
    let existente = null;
    pedido.forEach((item) => {
        if (item.id === idProducto) {
            existente = item;
        }
    });
    const totalCantidad = cantidad + (existente ? existente.cantidad : 0);
    if (!cantidadValida(cantidad) || !cantidadValida(totalCantidad)) {
        const mensaje = "Ingresá una cantidad entera entre 1 y 99. Cada producto admite hasta 99 unidades en el pedido.";
        document.getElementById("mensajeMenu").textContent = mensaje;
        alert(mensaje);
        campo.value = "";
        campo.focus();
        return;
    }
    if (existente) {
        existente.cantidad = totalCantidad;
    } else {
        pedido.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });
    }
    if (guardarPedido(pedido)) {
        document.getElementById("mensajeMenu").textContent =
            producto.nombre + " agregado. Unidades en tu pedido: " + totalCantidad + ".";
    }
};
