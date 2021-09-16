const listadoProductos = [{nombre: "mochila", precio: 400, id: 0001, stock: 20,},
{nombre: "lapiz", precio: 20, id: 0002, stock: 100,},
{nombre: "portamina", precio: 40, id: 0003, stock: 50,}, 
{nombre: "goma", precio: 10, id: 0004, stock: 50,}]

class ProductoAniadido {
    constructor(producto, cantidad) {
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.id = producto.id;
        this.cantidad = cantidad;
        this.subtotal = producto.precio * cantidad
    }
}
let productoElegido;
let cantidadElegida;
let productoSeleccionado;
let elegirProductoNuevo;
const carritoCompras = [];

comenzarCompra()
while(elegirProductoNuevo.toUpperCase() == "SI") {
    comenzarCompra()
}

verCarrito()

function comenzarCompra () {
    elegirProducto()
    const stockProducto = verDisponibilidadProducto(productoElegido, cantidadElegida)
    if(stockProducto) {
    
       let agregar = prompt("¿Desea agregar el producto al carrito? SI / NO")
       if (agregar.toUpperCase() == "SI") {    
           let producto = new ProductoAniadido(productoSeleccionado, cantidadElegida)
           
           agregarProducto(producto)
           elegirProductoNuevo = prompt("¿Quiere agregar otro producto mas? SI / NO")
        
       } else {
           elegirProductoNuevo = prompt("¿Quiere agregar otro producto mas? SI / NO")
       } 
    }

}

function elegirProducto() {
   
        productoElegido = prompt("Elige un producto: Mochila, lapiz, portamina, goma");
        cantidadElegida = parseInt(prompt("¿Cuanta cantidad necesitaria?"))
        
     
}

function verDisponibilidadProducto (nombreProducto, cantidad) {
    productoSeleccionado = listadoProductos.find((p) => p.nombre == nombreProducto.toUpperCase()) 
   
   
    if(!productoSeleccionado){
      
      alert("ERROR! El producto seleccionado no existe")

    }else{
       let verificado =  verificarStock(productoSeleccionado.stock, cantidad)
         if (verificado) {
            return true
            }else{
            alert("El producto " + nombreProducto + " no esta disponible actualmente")
            elegirProductoNuevo = prompt("¿Quiere agregar otro producto? SI / NO")
            }
    }    
 
}

function verificarStock(stockProducto, cantidad){
    if (stockProducto >= cantidad){
        return true
    } else {
        return false
    }
}

function agregarProducto(itemAagregar) {
     carritoCompras.push(itemAagregar)
    
}

function verCarrito() {
    for (let i = 0 ; i < carritoCompras.length; i++){
        console.log("Producto: " + carritoCompras[i].nombre + ". Cantidad: " + carritoCompras[i].cantidad)
   
    }
    let totalCarrito = carritoCompras.reduce((currentTotal, producto) => {
        return producto.subtotal + currentTotal;
      }, 0);

      console.log("El precio total de la compra es: " + totalCarrito)

        

}