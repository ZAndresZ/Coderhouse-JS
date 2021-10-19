class Usuario {
	constructor(nombre, clave, tipo) {
		this.nombre = nombre
		this.clave = clave
		this.tipo = tipo
	}
}

class Producto {
	constructor(nombre, precio) {
		this.nombre = nombre
		this.precio = precio
	}
}

const productosInicio = [   {nombre:"Lapicera BIC",precio:50},
                            {nombre:"Lapicera ChenGuang",precio:60},
                            {nombre:"Lapiz",precio:25},
                            {nombre:"Mochila NIKE",precio:3500},
                            {nombre:"Mochila china",precio:2500},
                            {nombre:"Changuito de compra",precio:1900},
                            {nombre:"Palazo",precio:1500},
                            {nombre:"Jogging",precio:1500},
                            {nombre:"Pantalon de fibrana",precio:1400},
                            {nombre:"Remera",precio:950},
                            {nombre:"Musculosa",precio:400},
                            {nombre:"Pulover",precio:2500}
                        ]

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
let productos = JSON.parse(localStorage.getItem("productos")) || productosInicio
const carrito = []

