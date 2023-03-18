
// ********************************** VARIABLES ************************************** //

const arrayVacio = [];


// ********************************** API ************************************** //
const lista = document.querySelector("#listado");


class Productos {
  constructor(products) {
    this.id = products.id;
    this.nombre = products.nombre;
    this.precio = products.precio;
    this.img = products.img;
    this.cantidad = products.cantidad;
    this.precioTotal = products.precio;
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

function imprimirProductosEnHTML() {

    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    fetch('https://dummyjson.com/products')
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        res.products.forEach((el) => {
          lista.innerHTML += `
              <div class="cajas">
                <div class="center-img-api">
                  <img src="${el.images[0]}" class="images-api">
                </div>
                <hr>
                <h4 class="center-text-api">${el.title}</h4>
                <p class="center-text-api">${el.price}$</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${el.title}${el.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
              </div>`;
        });
      });

    contenedor.appendChild(lista);
    let boton = document.getElementById(`agregar${produc.nombre}${produc.id}`);
    boton.addEventListener("click", () => agregarAlCarrito());
  }
  
  

function agregarAlCarrito(producto) {

  let index = carrito.findIndex((elemento) => elemento.id === producto.id);
  console.log({ index });

  if (index != -1) {
    carrito[index].agregarUnidad();
    carrito[index].actualizarPrecioTotal();
  } else {

    let prod = new Productos(producto);
    prod.cantidad = 1;
    carrito.push(prod);
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

  swal("Compra eliminada con éxito", "", "success");

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
                  <th>Total</th>
              </tr>
          </thead>

          <tbody id="bodyTabla">

          </tbody>
      </table>
  `;

  contenedor.appendChild(tabla);

  let bodyTabla = document.getElementById("bodyTabla");

  for (let produc of array) {
      let datos = document.createElement("tr");
      datos.innerHTML = `
              <td>${produc.title}</td>
              <td>${produc.precio}</td>
              <td>$${alfajor.precioTotal}</td>
              <td><button id="eliminar${produc.id}" class="btn btn-dark">Eliminar</button></td>
    `;

      bodyTabla.appendChild(datos);

      let botonEliminar = document.getElementById(`eliminar${produc.id}`);
      botonEliminar.addEventListener("click", () => eliminarDelCarrito(produc.id));
  }

  let precioTotal = obtenerPrecioTotal(array);
  let accionesCarrito = document.getElementById("acciones-carrito");
  accionesCarrito.innerHTML = `
  <h5>PrecioTotal: $${precioTotal}</h5></br>
  <button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
`;
}

imprimirProductosEnHTML();
let carrito = chequearCarritoEnStorage();
