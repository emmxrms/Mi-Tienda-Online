// RECUPERAR EL CARRITO GUARDADO
let carrito = JSON.parse(localStorage.getItem("carritoCherie")) || [];

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

    // GUARDAR EL CARRITO
    localStorage.setItem("carritoCherie", JSON.stringify(carrito));

    let lista = document.getElementById("carrito");
    let contador = document.getElementById("contador");
    let total = document.getElementById("total");

    if (lista) lista.innerHTML = "";

    let suma = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, indice) => {

        suma += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;

        if (lista) {
            lista.innerHTML += `
                <p>
                    ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                    <button onclick="eliminarProducto(${indice})">
                        Eliminar
                    </button>
                </p>
            `;
        }
    });

    if (contador) contador.textContent = cantidadTotal;
    if (total) total.textContent = suma.toFixed(2);
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

// CALCULAR DESCUENTOS
function calcularDescuento(precio, porcentaje) {

    let descuento = precio * (porcentaje / 100);
    let precioFinal = precio - descuento;

    return precioFinal;
}

function mostrarPrecioOferta(precio, porcentaje) {

    let precioFinal = calcularDescuento(precio, porcentaje);

    return precioFinal.toFixed(2);
}

// INICIAR FUNCIONES CUANDO CARGUE LA PÁGINA
function iniciarPagina() {

    iniciarBuscador();
    actualizarCarrito();

    // FILTRO DE CATEGORÍAS
    const parametros = new URLSearchParams(window.location.search);
    const categoria = parametros.get("categoria");

    const productos = document.querySelectorAll(".productos");

    if (categoria) {

        productos.forEach(function(producto) {

            const categoriaProducto = producto.dataset.categoria;

            producto.style.display =
                categoriaProducto === categoria ? "" : "none";
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarPagina);
} else {
    iniciarPagina();
}