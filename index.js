// DECLARACION DE VARIABLES

let cantidadDeProductos = parseInt(prompt("¿Cuántos productos agregará? (Aviso: permitido hasta 5 productos)"))
let numProductos = 0

//SWITCH
switch(cantidadDeProductos){
    case 1:
        instruccion(numProductos);
        break;
    case 2:
        instruccion(numProductos);
        break;
    case 3:
        instruccion(numProductos);
        break;
    case 4:
        instruccion(numProductos);
        break;
    case 5:
        instruccion(numProductos);
        break;
    default:
        alert("No podes agregar mas de 5 productos!");
        break;
       
}

// DECLARACIÓN DE FUNCIONES

//PREGUNTA POR EL NOMBRE DEL PRODUCTO Y EL PRECIO

function instruccion(numProductos){
 do{
    numProductos = numProductos + 1

    nombreProducto = prompt("Nombre del producto a agregar: ")

    precioProducto = parseFloat(prompt("Precio del producto agregado anteriormente: "))
    
    mostrar(numProductos,nombreProducto,precioProducto)
    
 }while(cantidadDeProductos != numProductos);

 alert("¡¡¡Hasta pronto!!!")
}

//LE MUESTRA AL USUARIO EL RESULTADO DE CONCATERNAR EL NOMBRE DEL PRODUCTO CON SU PRECIO

function mostrar(contador,nombreProducto,precioProducto){
  alert("Usted acaba de agregar: \n" + contador + ")" + " " + nombreProducto + "  " + precioProducto + "$")
}





