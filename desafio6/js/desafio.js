const listadoProductos = [{nombre: "mochila", precio: 400,},
{nombre: "lapiz", precio: 20,},
{nombre: "portamina", precio: 40,}, 
{nombre: "goma", precio: 10,}];
listadoProductos.sort(function(a, b){return a.precio - b.precio});
console.log(arr.sort('precio'));


const personas = [{nombre: "andres", edad = 23,}, 
{nombre = "anny", edad = 57,}, 
{nombre = "miguel", edad = 60,}];
personas.sort(function(a, b){return b.edad - a.edad});
console.log(arr.sort('edad'));


const fecha = [{dia: "cumple", fecha = 19980304,}, 
{dia: "cumple de mama", fecha = 19640222,}, 
{dia: "cumple de papa", fecha = 10611108}];
fecha.sort(function(a, b){return a.fecha - b.fecha});
console.log(arr.sort('fecha'));