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



