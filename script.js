let carrito = [];

function agregarAlCarrito(nombre, precio) {
    let productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    let lista = document.getElementById("carrito");
    let contador = document.getElementById("contador");
    let total = document.getElementById("total");

    lista.innerHTML = "";

    let suma = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, indice) => {
        suma += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;

        lista.innerHTML += `
            <p>
                ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </p>
        `;
    });

    contador.textContent = cantidadTotal;
    total.textContent = suma.toFixed(2);
}

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}
// BUSCADOR DE PRODUCTOS

function iniciarBuscador() {

    const buscador = document.getElementById("buscarProducto");

    if (!buscador) return;

    buscador.addEventListener("input", function() {

        const texto = buscador.value.toLowerCase().trim();

        const productos = document.querySelectorAll(".productos");

        productos.forEach(function(producto) {

            const titulo = producto.querySelector("h3");

            if (!titulo) return;

            const nombre = titulo.textContent.toLowerCase();

            producto.style.display = nombre.includes(texto)
                ? ""
                : "none";

        });

    });

}

// Esperar a que el HTML esté disponible

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarBuscador);
} else {
    iniciarBuscador();
}
function calcularDescuento(precio, porcentaje) {

    let descuento = precio * (porcentaje / 100);

    let precioFinal = precio - descuento;

    return precioFinal;

}
console.log(calcularDescuento(150, 20));
console.log(calcularDescuento(250, 15));
console.log(calcularDescuento(200, 30));
function mostrarPrecioOferta(precio, porcentaje) {

    let precioFinal = calcularDescuento(precio, porcentaje);

    return precioFinal.toFixed(2);

}
console.log(mostrarPrecioOferta(150, 20));