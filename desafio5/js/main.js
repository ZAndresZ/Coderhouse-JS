// seleccionar productos
/*let precioFinal = 1210;
var producto
var productoSeleccionado = prompt("Por favor elija entre a, b, c y d");
switch (productoSeleccionado){
    case "a":
        alert("Usted elegio el producto a y sale 10 pesos")
        break;
    case "b":
        alert("Usted elegio el producto b y sale 20 pesos")
        break;
    case "c":
        alert("Usted elegio el producto c y sale 30 pesos")
        break;
    case "d":
        alert("Usted elegio el producto d y sale 40 pesos")
        break;
    default:
        alert("Por favor elija entre los productos a, b, c y d");
        productoSeleccionado = prompt("Por favor elija entre a, b, c y d")
        break;
}    


const suma  = (a,b) => a + b;
const resta = (a,b) => a - b;
const multiplicar = (a,b) => a * b;
let descuento = 10;
let precioConIva = multiplicar(precioFinal, 1.21);
let precioDescontado = resta(precioConIva, descuento);

var cuota = prompt("Usted puede elegir entre 3, 6 y 12 cuotas");
switch (cuota){
    case "3":
        precio3Cuotas = precioDescontado/3;
        alert("Usted elegio pagar en 3 cuotas, y cada cuota seria de " + precio3Cuotas + " pesos.");
        break;
    case "6":
        precio6Cuotas = precioDescontado/6;
        alert("Usted elegio pagar en 6 cuotas, y cada cuota seria de " + precio6Cuotas + " pesos.");
        break;
    case "12":
        precio12Cuotas = precioDescontado/12;
        alert("Usted elegio pagar en 12 cuotas, y cada cuota seria de " + precio12Cuotas + " pesos.");
        break;
    default:
        alert("Por ahora solamente ofrecemos 3, 6 o 12 cuotas");
        cuota = prompt("Usted puede elegir entre 3, 6 y 12 cuotas");
        break;
}    


const edadMediaDeDosPersonas = (a,b) => (a+b)/2;
let edad1 = parseInt(prompt("Ingrese una edad"));
let edad2 = parseInt(prompt("Ingrese otra edad"));
let edadMedia;
if(edad1 >0 || edad2 >0){
    edadMedia = edadMediaDeDosPersonas(edad1, edad2);
    alert("La edad media de las dos personas es: " + edadMedia);
}else{
    alert("Ambas edades tienen que ser mayor que 0!")
    edad1 = parseInt(prompt("Ingrese una edad"));
    edad2 = parseInt(prompt("Ingrese otra edad"));
}


// complementario

// calcular el precio de re-venta segun el precio de compra de dos tipos de productos
let valorIngresado = prompt("Ingrese un precio para calcular el precio descontado.")
let precioYaDescontado;
let porcentajeDescuento1000Mas = 0.20;
let porcentajeDescuento1000Menos = 0.10;
if (valorIngresado>1000) {
    precioYaDescontado = multiplicar(valorIngresado,(1-porcentajeDescuento1000Mas));
    alert("El precio descontado es " + precioYaDescontado);
} else {
    precioYaDescontado = multiplicar(valorIngresado,(1-porcentajeDescuento1000Menos));
    alert("El precio descontado es " + precioYaDescontado);
}

// calcular si un numero es multiplo de otro
let num1 = parseInt(prompt("Ingrese un numero"));
let num2 = parseInt(prompt("Ingrese otro numero"));
const esMultiplo = (a,b) => a%b;
if (esMultiplo(num2,num1)){
    alert(num1 + " es multiplo de " + num2);
} else {
    alert(num1 + " no es multiplo de " + num2);
}


// calculadora del precio de taximetro
let kilometros = prompt("Ingrese el kilometraje del viaje para calcular dinamicamente el precio final");
let precioTaxiInicial = 100;
let precioTaxiFinal;
let precioXkmMenorA10km = 25;
let precioXkmEntre10Y20km = 20;
let precioXkmMayorA20km = 12;
if (kilometros < 10) {
    precioTaxiFinal = suma(precioTaxiInicial, multiplicar(kilometros,precioXkmMenorA10km));
    alert("El precio final es de " + precioTaxiFinal);
} else {
    if (kilometros > 20) {
        precioTaxiFinal = suma(precioTaxiInicial, multiplicar(kilometros,precioXkmMayorA20km));
        alert("El precio final es de " + precioTaxiFinal);        
    } else {
        precioTaxiFinal = suma(precioTaxiInicial, multiplicar(kilometros,precioXkmEntre10Y20km));
        alert("El precio final es de " + precioTaxiFinal); 
    }
}*/

//6
/*const producto = {
    nombre:"portamina",
    precio:10,
    descuento:false,
    caracteristicas:{
        caracteristica1:"x",
        caracteristica2:"y"
    }
}
console.log(producto)*/

class productos{
    constructor(nombre,precio,disponible,caracteristicas,stock){
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;
        this.caracteristicas = caracteristicas;
        this.stock=stock
    }
    promocion(){
        console.log(resultado)
        if (this.disponible==true) {
            let resultado = `Ud. tiene un descuento de 10% en ${this.nombre}, salia ${this.precio}, ahora se lo dejo en ${this.precio*0.9}`
        } else {
            let error = `lo sentimos, ${this.nombre} se quedo sin stock`
            console.log(error)
        }
    }
    comprar(){
        if (this.stock>0) {
            console.log(`Ud. compro ${this.nombre} efectivamente`)
            this.stock = this.stock -1
        } else {
            let error = `No nos quedo mas ${this.nombre}`
            console.log(error)
        }
    }
    proveedor(cantidad){
        console.log(`LA COMPRA DE ${cantidad} DE ${this.nombre} AL PROVEEDOR FUE EXITOSA`)
    }
}


const portamina = new productos("portamina",10,true,"liviano",100)
const carpeta = new productos("carpeta",20,false,"grande",50)
const mochila = new productos("mochila",100,true,"espacioso",100)

//carpeta.promocion()
//mochila.promocion()
//portamina.comprar()
//portamina.promocion()
//carpeta.comprar()
//mochila.comprar()
//mochila.comprar()
//mochila.comprar()
//mochila.comprar()
//mochila.comprar()
//mochila.comprar()
//mochila.comprar()
//mochila.comprar()
//mochila.proveedor(100)