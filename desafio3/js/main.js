//1
let numeroIngresado = parseFloat(prompt("Por favor ingrese un numero y se obtendra el valor sumado seis veces 10"));
let resultadoDeLaSuma;

for(let i=0; i<=5; i++) 
{
    resultadoDeLaSuma = numeroIngresado+10;
    alert(numeroIngresado + " + 10 = " + resultadoDeLaSuma);
    console.log(numeroIngresado + " + 10 = " + resultadoDeLaSuma);
    numeroIngresado += 10;
}

//2
let gaseosas = "";
let contador = 0;

alert("Introduzca su lista de gaseosa(s) favorita(s), al terminar escriba la palabra ESC");
let nombre = prompt("ingrese una gaseosa");

while(nombre == null || nombre == "")
{
    nombre = prompt("ingrese una gaseosa");
}
nombre = nombre.toUpperCase();

while(nombre != "ESC")
{
    contador++;
    console.log(contador + "- " + nombre);
    nombre = prompt("ingrese una gaseosa");
    while(nombre == null || nombre == "")
    {
        nombre = prompt("ingrese una gaseosa");
    }
    nombre = nombre.toUpperCase();
}

//3
let numero3;
let contador3;
alert("Ingrese un numero para repetir n veces el saludo cordial");
numero3 = Number(prompt("Ingrese las veces que quiera que se repite"));

while(numero3 == null || numero3 == "" || numero3 <=0)
{
    numero3 = Number(prompt("Ingrese un numero"));
}

for(let i = 0; i < numero3; i++)
{
    console.log((i+1) + "- " + "Hola");
}