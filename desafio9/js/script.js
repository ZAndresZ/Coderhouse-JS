const id = document.getElementById("id")
const nombre = document.getElementById("nombre")
const precio = document.getElementById("precio")
const info = document.getElementById("info")
const contenedor = document.getElementById("contenedor")
const carritoVista = document.getElementById("carritoVista")


let productos = []
if (localStorage.getItem("productos")){
    productos = JSON.parse(localStorage.getItem("productos"))
}
console.log(productos)
let carrito = []
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
}

const render = (elegir,nodo) =>{
    let acumulador = ""
    elegir.forEach(el => {
        acumulador +=
        <div class="card" style="width: 18rem;">
				<img src="..." class="card-img-top" alt="...">
				<div class="card-body">
				  <h5 class="card-title" id="cardTitle">${el.nombre}</h5>
				  <p class="card-text" id="cardText">${el.info}</p>
				  <p class="card-text" id="cardPrice">${el.precio}</p>
                  ${(el.cantidad)?
                      '<p class="card-text"> Cantidad total: '+el.cantidad+'</p>':'<a href="#" class="btn btn-primary" id="botonCarga" onclick="agregarAlCarrito(${el.id})">Agregar</a>'
                  }

				  
				</div>
			  </div>
    })
    nodo.innerHTML = acumulador
}

render(productos, contenedor)

const agregarAlCarrito = (id) => {
    let seleccion = productos.find(el => el.id == id)
    let existe = carrito.find(el => el.id == id)

    if(existe){
        let buscarProducto = carrito.findIndex(el => el.id == id)
        carrito[buscarProducto].cantidad = carrito[buscarProducto].cantidad+1
    } else {
        const productoCarrito = {
            id: seleccion.id,
            nombre: seleccion.nombre,
            precio: seleccion.precio,
            info: seleccion.info,
            cantidad: 1
        }
    
        carrito.push(productoCarrito)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

const reseteaValores = () => {
    id.value = null;
    nombre.value = "";
    precio.value = "";
    info.value = ""
}

const agregarPoructo = (e) => {
    e.preventDefautl()

    let existe = productos.find(el => el.id === id.value)
    console.log(existe)
    if(existe){
        alert("este id ya existe, por favor intente con otro")
        reseteaValores()
    } else {
        producto = {
            id: id.value,
            nombre: nombre.value,
            precio: precio.value,
            info: info.value
        }
    
        productos.push(producto)
        localStorage.setItem("productos", JSON.stringify(productos))

        reseteaValores()
    }
    
}



nombre.addEventListener("change", ()=>{
    const nombreCard = document.getElementById("cardTitle")
    nombreCard.innerText = nombre.value
})
info.addEventListener("change", ()=>{
    const infoCard = document.getElementById("cardText")
    infoCard.innerText = info.value
})
precio.addEventListener("change", ()=>{
    const precioCard = document.getElementById("cardPrice")
    precioCard.innerText = precio.value
})

document.getElementById("botonCarga").addEventListener("click", agregarPoructo)
carritoVista.addEventListener("click",()=>{render(carrito, carritoVista)} )