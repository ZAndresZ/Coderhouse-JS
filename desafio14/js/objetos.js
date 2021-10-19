class Usuario {
	constructor(nombre, clave, tipo) {
		this.nombre = nombre
		this.clave = clave
		this.tipo = tipo
	}
}

class Queja {
	constructor(descripcion, tiempo) {
		this.descripcion = descripcion
		this.tiempo = tiempo
	}
}

const quejasInicio = [   {descripcion:"Desconeccion del internet",tiempo:202110012001},
                            {descripcion:"Coneccion lenta",tiempo:202110022001},
                            {descripcion:"Router sin senial",tiempo:202110032001},
                            {descripcion:"Cable de router-pc no emite senial",tiempo:202110042001}
                        ]

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
let quejas = JSON.parse(localStorage.getItem("quejas")) || quejasInicio
const carrito = []