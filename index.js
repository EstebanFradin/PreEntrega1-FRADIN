
// Esta variable muestra las opciones posibles a elegir, con una pequeña descripción de lo que realizan si eligen x número.
let opciones = parseInt(prompt("Instrucciones: \n 1 -- Ver los productos disponibles \n 2 -- Buscar algun producto \n 3 -- Añadir alguno de los productos al carrito \n 4 -- SALIR"))

//Array vacío para luego añadir objetos.
const carrito = []

// CONSTRUCTOR
class Producto {
    constructor(prenda, precio) {
        this.prenda = prenda;
        this.precio = precio;
    }

}

// Esta variable contiene un array con algunos productos base.
let listaDeProductos = [new Producto("Remera Nike".toUpperCase(), 5000), new Producto("Pantalon Adidas".toUpperCase(), 3500), new Producto("Zapatillas AirForce".toUpperCase(), 15000)]

// Bucle que se encarga de verificar que la opción elegida sea distinta a 4.
while (opciones !== 4) {
// Este switch contiene las opciones posibles a elegir para que se realice determinada acción.
    switch (opciones) {
        // El case 1 muestra todos los objetos que contiene el array principal
        case 1:

            let mensajeProductos = `Productos:\n `;
            listaDeProductos.forEach((el, index) => {
                mensajeProductos += `${index + 1}- ${el.prenda} ${el.precio}$\n`;
            })
            alert(mensajeProductos)
            break;

        // El case 2 es un buscador en donde escribis el producto que buscas y te devuelve el objeto con el nombre y el precio
        case 2:

            let busqueda = prompt("¿Qué desea buscar?")
            const resultadoBusqueda = listaDeProductos.filter((el) => el.prenda.includes(busqueda.toUpperCase()))
            if (resultadoBusqueda.length == 0) {
                console.log(`No se encontro ningun artículo con los buscado anteriormente (${busqueda})`)
            } else {
                console.log(resultadoBusqueda)
            }

            break;

            //Añade productos al carrito y luego realiza la suma total
        case 3:

            let eleccion = prompt("Ingresar el nombre que le corresponde al producto que desea añadir: ")
            const resultado = listaDeProductos.filter((el)=> el.prenda == (eleccion.toUpperCase()))
            
            if( resultado.length != 0 ){
                console.log(carrito.push(resultado))
                console.log(`Carrito: \n ${carrito}\n`)
            }else {
                alert("Elija un producto que este disponible..")
            } 

            break;

        case 404: /*Esta opción la cree para que el administrador de la página pudiese añadir nuevos productos con su precio, 
        por eso no fue mencionada en las opciones del inicio. Al recargar la página los valores no se guardan (no sabía como hacerlo..)*/

            nombrePrenda = prompt("Nombre de la prenda")
            precioPrenda = parseFloat(prompt("Precio de la prenda"))
            const productoCreado = new Producto(nombrePrenda.toUpperCase(), precioPrenda)
            let agregarItem = listaDeProductos.push(productoCreado)
            console.log(agregarItem)

            break;
        default:
            break;
    }
    opciones = parseInt(prompt("Instrucciones: \n 1 -- Ver los productos disponibles \n 2 -- Buscar algun producto \n 3 -- Añadir alguno de los productos al carrito \n 4 -- SALIR"));

    //Condicional si, al momento de elegir el número 4 (SALIR) muestra un pequeño alert con un saludo, ya que el usuario se esta retirando
    if (opciones == 4) {
        alert("Nos vemos!!");
    }
}

//Funcion encargada de la suma total del carrito
function sumarTotal() {
            let total = 0
            carrito.forEach((el) => {
                total = total + 1;
            })
            alert(`El total a pagar es de ${total}`)
        }











