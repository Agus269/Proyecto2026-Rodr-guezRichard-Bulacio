/**
 * Calcula el importe total del pedido.
 * @method calcularTotal
 * @param {Array} pedido - Productos y cantidades seleccionadas.
 * @return {number} Total en pesos.
 */
const calcularTotal = (pedido) => {
    let total = 0;
    for (const item of pedido) {
        total += item.precio * item.cantidad;
    }
    return total;
};

/**
 * Actualiza la tabla y el total desde el pedido guardado.
 * @method mostrarPedido
 * @return {void}
 */
const mostrarPedido = () => {
    const pedido = leerPedido();
    let filas = "";
    for (const item of pedido) {
        filas += `
            <tr>
                <th scope="row">${item.nombre}</th>
                <td>
                    <label for="unidades-${item.id}">Unidades de ${item.nombre}</label>
                    <input type="number" id="unidades-${item.id}" min="1" max="99" step="1"
                        value="${item.cantidad}" onchange="cambiarCantidad(${item.id})">
                </td>
                <td>${mostrarPrecio(item.precio)}</td>
                <td id="subtotal-${item.id}">${mostrarPrecio(item.precio * item.cantidad)}</td>
                <td><button type="button" onclick="eliminarProducto(${item.id})">Quitar ${item.nombre}</button></td>
            </tr>
        `;
    }
    if (pedido.length === 0) {
        filas = '<tr><td colspan="5">No hay productos seleccionados. Elegí un plato en <a href="menu.html">Menú</a>.</td></tr>';
    }
    document.getElementById("productosPedido").innerHTML = filas;
    document.getElementById("totalPedido").textContent = mostrarPrecio(calcularTotal(pedido));
    document.getElementById("vaciarPedido").disabled = pedido.length === 0;
};

/**
 * Rechaza un dato, informa el motivo y devuelve el foco al campo.
 * @method informarError
 * @param {object} campo - Input o select que contiene el dato incorrecto.
 * @param {string} mensaje - Explicación de la corrección necesaria.
 * @return {void}
 */
const informarError = (campo, mensaje) => {
    document.getElementById("mensajePedido").textContent = mensaje;
    alert(mensaje);
    campo.value = "";
    campo.focus();
};

/**
 * Cambia las unidades de un producto y vuelve a calcular el total.
 * @method cambiarCantidad
 * @param {number} id - Identificador del producto.
 * @return {void}
 */
const cambiarCantidad = (id) => {
    const campo = document.getElementById("unidades-" + id);
    const cantidad = Number(campo.value);
    if (!cantidadValida(cantidad)) {
        informarError(campo, "Ingresá una cantidad entera entre 1 y 99, o usá Quitar para eliminar el producto.");
        return;
    }
    const pedido = leerPedido();
    for (const item of pedido) {
        if (item.id === id) {
            item.cantidad = cantidad;
        }
    }
    if (guardarPedido(pedido)) {
        const producto = buscarProducto(id);
        document.getElementById("subtotal-" + id).textContent = mostrarPrecio(producto.precio * cantidad);
        document.getElementById("totalPedido").textContent = mostrarPrecio(calcularTotal(pedido));
        document.getElementById("mensajePedido").textContent = "Cantidad y total actualizados.";
    }
};

/**
 * Elimina un producto manteniendo el resto del pedido.
 * @method eliminarProducto
 * @param {number} id - Identificador del producto.
 * @return {void}
 */
const eliminarProducto = (id) => {
    const pedido = leerPedido();
    for (let i = 0; i < pedido.length; i++) {
        if (pedido[i].id === id) {
            pedido.splice(i, 1);
            break;
        }
    }
    if (guardarPedido(pedido)) {
        mostrarPedido();
        document.getElementById("mensajePedido").textContent = "Producto eliminado del pedido.";
        document.getElementById("tituloResumen").focus();
    }
};

/**
 * Vacía todos los productos del pedido.
 * @method vaciarPedido
 * @return {void}
 */
const vaciarPedido = () => {
    if (guardarPedido([])) {
        mostrarPedido();
        document.getElementById("mensajePedido").textContent = "Pedido vacío. Podés elegir nuevamente desde Menú.";
        document.getElementById("tituloResumen").focus();
    }
};

/**
 * Valida un apellido, admitiendo letras, espacios, apóstrofes y guiones.
 * @method apellidoValido
 * @param {string} apellido - Apellido ingresado.
 * @return {boolean} Indica si el apellido tiene un formato válido.
 */
const apellidoValido = (apellido) => {
    const letras = "abcdefghijklmnopqrstuvwxyzáéíóúüñàèìòùâêîôûç";
    const texto = apellido.trim().toLowerCase();
    let cantidadLetras = 0;
    if (texto.length < 2 || texto.length > 50) {
        return false;
    }
    for (const caracter of texto) {
        if (letras.includes(caracter)) {
            cantidadLetras++;
        } else if (caracter !== " " && caracter !== "-" && caracter !== "'" && caracter !== "’") {
            return false;
        }
    }
    return cantidadLetras >= 2 && letras.includes(texto[0]) && letras.includes(texto[texto.length - 1]);
};

/**
 * Valida el formulario y confirma una simulación del pedido por mesa.
 * @method confirmarPedido
 * @return {boolean} Siempre false para evitar el envío y la recarga del formulario.
 */
const confirmarPedido = () => {
    const pedido = leerPedido();
    const mensaje = document.getElementById("mensajePedido");
    if (pedido.length === 0) {
        mensaje.textContent = "Agregá al menos un producto desde Menú antes de confirmar.";
        alert(mensaje.textContent);
        return false;
    }
    for (const item of pedido) {
        const campo = document.getElementById("unidades-" + item.id);
        if (!campo || !cantidadValida(Number(campo.value))) {
            if (campo) {
                informarError(campo, "Corregí la cantidad del producto antes de confirmar.");
            }
            return false;
        }
        item.cantidad = Number(campo.value);
    }
    const apellido = document.getElementById("apellido");
    const mesa = document.getElementById("mesa");
    const pago = document.getElementById("metodoPago");
    if (!apellidoValido(apellido.value)) {
        informarError(apellido, "Ingresá un apellido de 2 a 50 caracteres, con letras y sin números.");
        return false;
    }
    const numeroMesa = Number(mesa.value);
    if (!(numeroMesa >= 1 && numeroMesa <= 10 && numeroMesa % 1 === 0)) {
        informarError(mesa, "Seleccioná una mesa del 1 al 10.");
        return false;
    }
    if (pago.value !== "efectivo" && pago.value !== "transferencia" && pago.value !== "tarjeta") {
        informarError(pago, "Seleccioná un método de pago.");
        return false;
    }
    const confirmacion = "Pedido de demostración confirmado para " + apellido.value.trim() +
        ", mesa " + numeroMesa + ". Total: " + mostrarPrecio(calcularTotal(pedido)) +
        ". Método de pago: " + pago.options[pago.selectedIndex].text + ". No se realizó ningún cobro.";
    if (!guardarPedido([])) {
        return false;
    }
    mostrarPedido();
    document.getElementById("formPedido").reset();
    mensaje.textContent = confirmacion;
    mensaje.focus();
    return false;
};
