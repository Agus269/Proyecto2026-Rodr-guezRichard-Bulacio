const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const base = path.resolve(__dirname, "../primera-entrega/js");
const data = new Map();
const elements = new Map();
let alerts = [];
let blocked = false;
const element = id => {
    if (!elements.has(id)) elements.set(id, {value:"", textContent:"", innerHTML:"", disabled:false, focus(){}, reset(){}, options:[{text:"Efectivo"}], selectedIndex:0});
    return elements.get(id);
};
const context = vm.createContext({
    localStorage: {
        getItem: key => data.get(key) || null,
        setItem: (key, value) => {if(blocked) throw Error("blocked"); data.set(key,value);}
    },
    document: {getElementById: element},
    alert: message => alerts.push(message)
});
for (const file of ["productos.js", "menu.js", "pedido.js"]) {
    vm.runInContext(fs.readFileSync(path.join(base, file), "utf8"), context);
}
const run = code => vm.runInContext(code, context);
let passed = 0;
const check = (name, fn) => { data.clear(); elements.clear(); alerts=[]; blocked=false; fn(); passed++; console.log("OK",name); };
check("precios con separador de miles y dos decimales", () => {
    for (const [precio, esperado] of [[0,"$0,00"],[12,"$12,00"],[3123.45,"$3.123,45"],[12000,"$12.000,00"],[1234567.8,"$1.234.567,80"]]) {
        assert.equal(run("mostrarPrecio("+precio+")"),esperado);
    }
});
check("cantidades y límites", () => {
    for(const n of [1,2,99]) assert.equal(run("cantidadValida("+n+")"),true);
    for(const value of ["0","-1","1.5","100","NaN","Infinity"]) assert.equal(run("cantidadValida("+value+")"),false);
});
check("lectura de datos corruptos", () => {
    for(const raw of ["{","null","{}","42",'[null,{},{"id":999,"cantidad":2}]']) {
        data.set("pedido",raw); assert.equal(run("leerPedido().length"),0);
    }
});
check("ambos botones se deshabilitan cuando el pedido queda vacío", () => {
    run("mostrarPedido()");
    assert.equal(element("vaciarPedido").disabled,true);
    assert.equal(element("botonConfirmarPedido").disabled,true);
    data.set("pedido",JSON.stringify([{id:1,cantidad:1}]));
    run("mostrarPedido()");
    assert.equal(element("vaciarPedido").disabled,false);
    assert.equal(element("botonConfirmarPedido").disabled,false);
    run("eliminarProducto(1)");
    assert.equal(element("vaciarPedido").disabled,true);
    assert.equal(element("botonConfirmarPedido").disabled,true);
    data.set("pedido",JSON.stringify([{id:2,cantidad:1}]));
    run("mostrarPedido(); vaciarPedido()");
    assert.equal(element("vaciarPedido").disabled,true);
    assert.equal(element("botonConfirmarPedido").disabled,true);
});
check("catálogo autoritativo y duplicados", () => {
    data.set("pedido",JSON.stringify([{id:1,cantidad:2,precio:-1,nombre:"<script>"},{id:1,cantidad:3},{id:2,cantidad:"2"}]));
    assert.equal(run("leerPedido().length"),1);
    assert.equal(run("leerPedido()[0].cantidad"),5);
    assert.equal(run("leerPedido()[0].precio"),12000);
    assert.equal(run("leerPedido()[0].nombre"),"Hamburguesa Completa");
});
check("agregar y acumular sin duplicar", () => {
    element("cantidad-1").value="2"; run("agregarProducto(1); agregarProducto(1)");
    assert.equal(JSON.parse(data.get("pedido"))[0].cantidad,4);
    assert.equal(run("leerPedido().length"),1);
});
check("rechazar entrada vacía, letras, decimales y negativos", () => {
    for(const value of ["","abc","0","-3","1.5","100"]) {
        element("cantidad-1").value=value; run("agregarProducto(1)");
        assert.equal(element("cantidad-1").value,"");
        assert.equal(data.has("pedido"),false);
    }
    assert.equal(alerts.length,6);
});
check("no superar 99 unidades acumuladas", () => {
    element("cantidad-1").value="99"; run("agregarProducto(1)");
    element("cantidad-1").value="1"; run("agregarProducto(1)");
    assert.equal(run("leerPedido()[0].cantidad"),99); assert.equal(alerts.length,1);
});
check("renderizado de seis productos recorriendo el array con forEach", () => {
    run(`
        var recorridosCatalogo = 0;
        const recorrerCatalogo = productos.forEach;
        productos.forEach = (accion) => {
            recorridosCatalogo++;
            return recorrerCatalogo.call(productos, accion);
        };
        mostrarProductos();
        productos.forEach = recorrerCatalogo;
    `);
    assert.equal(run("recorridosCatalogo"), 1);
    assert.equal((element("listaProductos").innerHTML.match(/class="producto"/g)||[]).length,6);
    assert.match(element("listaProductos").innerHTML,/Precio: \$12\.000,00/);
});
check("resumen, cambio y eliminación", () => {
    data.set("pedido",JSON.stringify([{id:1,cantidad:2},{id:2,cantidad:1}]));
    run("mostrarPedido()"); assert.equal(element("totalPedido").textContent,"$35.000,00");
    assert.match(element("productosPedido").innerHTML,/<td>\$12\.000,00<\/td>/);
    assert.match(element("productosPedido").innerHTML,/id="subtotal-1">\$24\.000,00/);
    const controles = element("productosPedido").innerHTML;
    element("unidades-1").value="3"; run("cambiarCantidad(1)");
    assert.equal(element("totalPedido").textContent,"$47.000,00");
    assert.equal(element("subtotal-1").textContent,"$36.000,00");
    assert.equal(element("productosPedido").innerHTML, controles);
    run("eliminarProducto(1)"); assert.equal(element("totalPedido").textContent,"$11.000,00");
    run("vaciarPedido()"); assert.equal(element("totalPedido").textContent,"$0,00");
    assert.equal(element("vaciarPedido").disabled,true);
});
check("apellidos", () => {
    for(const name of ["Bulacio","Rodríguez Richard","O'Connor","De la Cruz","Pérez-Gómez"]) assert.equal(run("apellidoValido("+JSON.stringify(name)+")"),true);
    for(const name of [""," ","A","123","Nico1","--","<script>","a".repeat(51)]) assert.equal(run("apellidoValido("+JSON.stringify(name)+")"),false);
});
check("no confirmar pedido vacío", () => {
    assert.equal(run("confirmarPedido()"),false);
    assert.match(element("mensajePedido").textContent,/al menos/);
});
const prepare = () => {
    data.set("pedido",JSON.stringify([{id:1,cantidad:2}]));
    element("unidades-1").value="2"; element("apellido").value="Bulacio";
    element("mesa").value="3"; element("metodoPago").value="efectivo";
};
check("validar todos los campos sin perder productos", () => {
    for(const [id,value] of [["unidades-1",""],["apellido","123"],["mesa",""],["mesa","11"],["metodoPago",""]]) {
        prepare(); element(id).value=value; run("confirmarPedido()");
        assert.equal(element(id).value,""); assert.equal(run("leerPedido().length"),1);
    }
});
check("confirmación y doble envío", () => {
    prepare(); assert.equal(run("confirmarPedido()"),false);
    assert.match(element("mensajePedido").textContent,/mesa 3/);
    assert.match(element("mensajePedido").textContent,/\$24\.000,00/);
    assert.equal(run("leerPedido().length"),0);
    assert.equal(element("vaciarPedido").disabled,true);
    assert.equal(element("botonConfirmarPedido").disabled,true);
    run("confirmarPedido()"); assert.match(element("mensajePedido").textContent,/al menos/);
});
check("almacenamiento bloqueado no anuncia éxito", () => {
    prepare(); blocked=true; run("confirmarPedido()");
    assert.equal(run("leerPedido().length"),1);
    assert.doesNotMatch(element("mensajePedido").textContent,/confirmado/);
    assert.equal(alerts.length,1);
});
console.log(passed+" pruebas aprobadas.");
