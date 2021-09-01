let nombre;
const centroFromacion = 'CoderHouse';
let numero1,numero2;
let resultado;
let texto1, texto2;

nombre = prompt("1 - Introduzca su nombre por favor")
alert("Hola " + nombre + ", como estas? Bienvenido a " + centroFromacion);


alert("2 - Por favor introduzca un numero para concatenarlo con '10'");
numero1 = prompt ("Ingrese el numero:");
numero2 = 10;
resultado = numero1 + numero2;
alert(numero1 + " + " + numero2 + " = " + resultado);

alert("3 - Por favor introduzca un numero para sumarlo con 100");
numero1 = parseFloat(prompt("Ingrese el numero:"));
numero2 = 10;
resultado = numero1 + numero2;
alert(numero1 + " + " + numero2 + " = " + resultado);
console.log(numero1 + " + " + numero2 + " = " + resultado);

texto1 = prompt("4 - Introduzca el texto");
texto2 = prompt("Introduzca otro texto");
alert("El resultado de la concatenacion es: " + texto1 + " " + texto2);
console.log("El resultado de la concatenacion es: " + texto1 + " " + texto2);

console.log(typeof(texto1));
console.log(typeof(texto2));