const productos = [
    {
        id: 1,
        nombre: "Hamburguesa Completa",
        descripcion: "Hamburguesa con carne, queso, lechuga y tomate.",
        categoria: "comida",
        precio: 12000,
        imagen: "imagenes/hamburguesa.svg"
    },
    {
        id: 2,
        nombre: "Pizza Muzzarella",
        descripcion: "Pizza de muzzarella con salsa de tomate y orégano.",
        categoria: "comida",
        precio: 11000,
        imagen: "imagenes/pizza.svg"
    },
    {
        id: 3,
        nombre: "Milanesa con Papas",
        descripcion: "Milanesa de carne acompañada con papas fritas.",
        categoria: "comida",
        precio: 13500,
        imagen: "imagenes/milanesa.svg"
    },
    {
        id: 4,
        nombre: "Coca-Cola",
        descripcion: "Gaseosa Coca-Cola.",
        categoria: "bebida",
        precio: 3000,
        imagen: "imagenes/coca-cola.svg"
    },
    {
        id: 5,
        nombre: "Agua Mineral",
        descripcion: "Botella de agua mineral.",
        categoria: "bebida",
        precio: 2000,
        imagen: "imagenes/agua.svg"
    },
    {
        id: 6,
        nombre: "Limonada",
        descripcion: "Limonada casera.",
        categoria: "bebida",
        precio: 3500,
        imagen: "imagenes/limonada.svg"
    }
];

/**
 * Busca un producto en el catálogo.
 * @method buscarProducto
 * @param {number} id - Identificador del producto.
 * @return {object|null} Producto encontrado o null.
 */
const buscarProducto = (id) => {
    for (const producto of productos) {
        if (producto.id === id) {
            return producto;
        }
    }
    return null;
};

/**
 * Comprueba que una cantidad sea entera y esté entre 1 y 99.
 * @method cantidadValida
 * @param {number} cantidad - Unidades solicitadas.
 * @return {boolean} Indica si se admite la cantidad.
 */
const cantidadValida = (cantidad) => {
    return cantidad >= 1 && cantidad <= 99 && cantidad % 1 === 0;
};

/**
 * Recupera el pedido usando los nombres y precios actuales del catálogo.
 * Descarta datos dañados para evitar errores al recargar.
 * @method leerPedido
 * @return {Array} Productos válidos seleccionados.
 */
const leerPedido = () => {
    try {
        const guardado = JSON.parse(localStorage.getItem("pedido")) || [];
        if (!Array.isArray(guardado)) {
            return [];
        }
        const pedido = [];
        for (const item of guardado) {
            if (!item || typeof item !== "object") {
                continue;
            }
            const producto = buscarProducto(item.id);
            if (!producto || typeof item.cantidad !== "number" || !cantidadValida(item.cantidad)) {
                continue;
            }
            let repetido = false;
            for (const existente of pedido) {
                if (existente.id === producto.id) {
                    repetido = true;
                    existente.cantidad = Math.min(99, existente.cantidad + item.cantidad);
                }
            }
            if (!repetido) {
                pedido.push({ id: producto.id, nombre: producto.nombre,
                    precio: producto.precio, cantidad: item.cantidad });
            }
        }
        return pedido;
    } catch (error) {
        return [];
    }
};

/**
 * Guarda el pedido e informa si el navegador bloquea el almacenamiento.
 * @method guardarPedido
 * @param {Array} pedido - Productos seleccionados.
 * @return {boolean} True si se guardó correctamente.
 */
const guardarPedido = (pedido) => {
    try {
        localStorage.setItem("pedido", JSON.stringify(pedido));
        return true;
    } catch (error) {
        alert("El navegador no permite guardar el pedido. Habilitá el almacenamiento del sitio y volvé a intentar.");
        return false;
    }
};

/**
 * Presenta un importe en pesos con dos decimales.
 * @method mostrarPrecio
 * @param {number} precio - Importe a mostrar.
 * @return {string} Precio en pesos.
 */
const mostrarPrecio = (precio) => {
    return "$" + precio.toFixed(2);
};
