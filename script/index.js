
// ********************************** CONSTRUCTOR ************************************** //

class Producto {
    constructor(productos) {
        this.id = productos.id;
        this.marca = productos.marca;
        this.precio = productos.precio;
        this.cantidad = productos.cantidad;
        this.precioTotal = productos.precio;
    }

    agregarUnidad() {
        this.cantidad++;
    }

    quitarUnidad() {
        this.cantidad--;
    }

    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }
}

// ********************************** FUNCIONES ************************************** //

function imprimirProductosEnHTML(array) {
   
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    for (const productos of array) {
        
        let card = document.createElement("div");
        
        card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <img src="${productos.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${productos.marca}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${productos.descripcion}</h5>
                <p class="card-text">$${productos.precio}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${productos.marca}${productos.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

        contenedor.appendChild(card);

        let boton = document.getElementById(`agregar${productos.marca}${productos.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(productos));
    }
}

function agregarAlCarrito(producto) {
   
    let index = carrito.findIndex((elemento) => elemento.id === producto.id);
    console.log({ index });

    if (index != -1) {
       
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        
        let productos = new Producto(producto);
        productos.cantidad = 1;
        carrito.push(productos);
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
    
    let index = carrito.findIndex((element) => element.id === id);

    if (carrito[index].cantidad > 1) {
    
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();

    } else {
        
        carrito.splice(index, 1);
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarCarrito() {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");
    
     swal("Compra eliminada con éxito", "", "success" ,); 

    document.getElementById("tabla-carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerPrecioTotal(array) {
    return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

function imprimirTabla(array) {
    let contenedor = document.getElementById("tabla-carrito");
    contenedor.innerHTML = "";

    let tabla = document.createElement("div");

    tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">

            </tbody>
        </table>
    `;

    contenedor.appendChild(tabla);

   
    let bodyTabla = document.getElementById("bodyTabla");

    for (let productos of array) {
        let datos = document.createElement("tr");
        datos.innerHTML = `
                <td>${productos.marca}</td>
                <td>${productos.cantidad}</td>
                <td>$${productos.precioTotal}</td>
                <td><button id="eliminar${productos.id}" class="btn btn-dark">Eliminar</button></td>
      `;

        bodyTabla.appendChild(datos);

        let botonEliminar = document.getElementById(`eliminar${productos.id}`);
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(productos.id));
    }

    let precioTotal = obtenerPrecioTotal(array);
    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
		<h5>PrecioTotal: $${precioTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
	`;
}

function filtrarBusqueda(e) {
    e.preventDefault();

    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = productos.filter((elemento) => elemento.marca.toLowerCase().includes(ingreso));

    imprimirProductosEnHTML(arrayFiltrado);
}

function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

    if (contenidoEnStorage) {
    
        let array = [];

        for (const objeto of contenidoEnStorage) {
           
            let productos = new Producto(objeto);

            productos.actualizarPrecioTotal();

            array.push(productos);
        }

        imprimirTabla(array);

        return array;
    }

    return [];
}

// ************** EVENTO **************
let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

// ************** CONSTANTES Y VARIABLES **************
const productos = [
    {
        id: 0,
        marca: "Nike",
        descripcion: "Remera básica de color negro",
        precio: 7000,
        img: "./images/remera.jpg",
    },
    {
        id: 1,
        marca: "Adidas",
        descripcion: "Pantalon deportivo largo de color negro",
        precio: 5000,
        img: "./images/pantalon.jpg",
    },
    {
        id: 2,
        marca: "Jordan",
        descripcion: "Zapatillas Air Jordan 1 mid",
        precio: 55000,
        img: "./images/zapatillas.jpg",
    },
    {
        id: 3,
        marca: "Lacoste",
        descripcion: "Chomba pique negra",
        precio: 11000,
        img: "./images/chomba.jpg",
    },
    {
        id: 4,
        marca: "Levis",
        descripcion: "Jean '54 para hombre ",
        precio: 6500,
        img: "./images/jean.jpg",
    },
    {
        id: 5,
        marca: "Everlast",
        descripcion: "Mochila Negra",
        precio: 25000,
        img: "./images/bolso.jpg",
    },
];

imprimirProductosEnHTML(productos);

let carrito = chequearCarritoEnStorage();






