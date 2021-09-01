let nombre = prompt("Introduzca su nombre por favor");
const desafio = "Control de flujos";
let textoIngresado;
let texto = "Hola";
let numero1 = parseFloat(prompt("Ingrese un numero para compararlo con 1000: "));
let numero2 = parseFloat(prompt("Ingrese un numero para saber si cae entre 10 y 50: "));



alert("Hola " + nombre + ", como estas? Bienvenido a la entrega de " + desafio);
console.log("Hola " + nombre + ", como estas? Bienvenido a la entrega de " + desafio);

numero = parseFloat(prompt("Ingrese un numero para compararlo con 1000: "));
if(numero > 1000) {
    alert("El numero que ingreso: " + numero + " es mayor que 1000")
    console.log("El numero que ingreso: " + numero + " es mayor que 1000")
} else {
    alert("El numero que ingreso: " + numero + " no es mayor que 1000")
    console.log("El numero que ingreso: " + numero + " no es mayor que 1000")
}

textoIngresado = prompt("Ingrese la palabra Hola");
if(textoIngresado === texto){
    alert("Ud. ingreso la palabra Hola tal cual como esperabamos.")
    console.log("Ud. ingreso la palabra Hola tal cual como esperabamos.")
} else {
    alert("Ud. debe ingresar la palabra como Hola, con la letra h en mayuscula y el resto en minuscula.")
    console.log("Ud. debe ingresar la palabra como Hola, con la letra h en mayuscula y el resto en minuscula.")
}

numero = parseFloat(prompt("Ingrese un numero para saber si cae entre 10 y 50: "));
if(numero > 10 && numero < 50) {
    alert("El numero que ingreso: " + numero + " cae entre 10 y 50")
    console.log("El numero que ingreso: " + numero + " cae entre 10 y 50")
} else {
    alert("El numero que ingreso: " + numero + " no cae entre 10 y 50")
    console.log("El numero que ingreso: " + numero + " no cae entre 10 y 50")
}