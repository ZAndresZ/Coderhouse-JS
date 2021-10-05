
formLogin.style.display = "block"
divFormsProductos.style.display = "none"
btnRegistro.style.display = "none"
tienda.style.display = "none"
cerrarSesion.style.visibility = "hidden"

let tiempoUsuario; 

const crearUsuario = () => {

	let nombre = inputNombre.value;
	let clave = inputClave.value;
	let tipo;


	if (usuarios == "") {

		tipo = "admin"

	} else {
		tipo = "usuario"

	}


	if (inputNombre.value.length < 4) {

		validaciones.html("El usuario debe tener 4 caracteres o más")
		validaciones.style.color = "red"

	} else if (inputClave.value.length < 4) {

		$("#validaciones").html("La clave debe tener 4 caracteres o más") 
		validaciones.style.color = "red"

	} else {
		const usuario = new Usuario(nombre, clave, tipo)

		usuarios.push(usuario)
		validaciones.style.color = "green"
		localStorage.setItem("usuarios", JSON.stringify(usuarios))
		inputNombre.value = "";
		inputClave.value = "";
		validaciones.innerHTML = "Usuario registrado con éxito"
		btnIngresar.style.display = "block"
		btnRegistro.style.display = "none"
		linkRegistro.style.display = "block"

		setTimeout(() => {
			validaciones.innerHTML = ""
		}, 2000
		)

	}


}


const renderizarTienda = () => {
    tienda.style.display = "flex"
	formLogin.style.display = "none"
	if (productos != "") {
       
		for (const producto of productos) {
			
			let div = $("<div>").append(`<div class="card" style="width: 18rem;">
			<div class="card-body"> 
				  <h5 class="card-title">${producto.nombre}</h5>
				  <p class="card-text"> ${producto.precio}</p>
				  <button class="btn btn-primary" id="${producto.nombre}">Comprar</button>
			</div>
		  </div>`)
			$("#tienda").append(div) 
			
			

		
		  	document.getElementById(producto.nombre).addEventListener("click",function(e){
				
				let productoHtml = document.getElementById(e.target.id).parentElement 
				let producto = new Producto(productoHtml.childNodes[1].textContent,productoHtml.childNodes[3].textContent)
			    carrito.push(producto)
			})
		}

	} else { 

		tienda.innerHTML += "Tienda en construcción, disculpe las molestias"
	}
}


const agregarProducto = () => {
	let nombreProducto = inputAgregarN.value
	let precioProducto = inputAgregarP.value
	let nuevoProducto = new Producto(nombreProducto, precioProducto)
	productos.push(nuevoProducto)
    
	localStorage.setItem("productos", JSON.stringify(productos))

	inputAgregarN.value = ""
	inputAgregarP.value = ""
	completarSelect()

	validaciones.innerHTML = "Producto añadido con éxito"	
	validaciones.style.color = "green"
	setTimeout(()=>{
		validaciones.innerHTML = ""
		
	},2000)

}

const eliminarProducto = () => {
	let nombreProducto = selectEliminarP.value

	productos = productos.filter(producto => producto.nombre != nombreProducto)

	localStorage.setItem("productos", JSON.stringify(productos))
	
	validaciones.style.color = "green"
	validaciones.innerHTML = "Producto eliminado con éxito"
	
	setTimeout(()=>{
		validaciones.innerHTML = ""
		completarSelect()
	},2000)

}


const mostrarRegistro = () => {

	btnRegistro.style.display = "block"
	linkRegistro.style.display = "none"
	btnIngresar.style.display = "none"
}

const completarSelect = () => {
	selectEliminarP.innerHTML = ""
	
	if(productos != ""){

		for (let producto of productos) {
		
         let option = $("<option>", {
			value: producto.nombre,
			text: producto.nombre
		 })

		$("#eliminarProductos").append(option)
	}

	    formProductoEliminar.style.display = "block"

	}else{

		formProductoEliminar.style.display = "none"

	}
	

}

const login = (nombreUsuario,claveUsuario) => {
    
	const chequeoUsuario = usuarios.find(usuario => usuario.nombre === nombreUsuario)

	if (chequeoUsuario) {
		validaciones.innerHTML = ""
		if (claveUsuario === chequeoUsuario.clave) {
			localStorage.setItem("usuarioLogueado",JSON.stringify(chequeoUsuario))
			inputClave.value = ""
			inputNombre.value = ""
			tiempoUsuario = new Date().getTime() 

			if (chequeoUsuario.tipo == "admin") {
				completarSelect()
				formLogin.style.display = "none"
				divFormsProductos.style.display = "flex"
				cerrarSesion.style.visibility = "visible"
				document.getElementById("titulo").innerHTML = `Bienvenidx ${chequeoUsuario.nombre.toUpperCase()}`

			} else {

				document.getElementById("titulo").innerHTML = `Bienvenidx ${chequeoUsuario.nombre.toUpperCase()}`
				renderizarTienda()
				cerrarSesion.style.visibility = "visible"
			}

		} else {
			validaciones.innerHTML = "La clave ingresada es incorrecta"
			validaciones.style.color = "red"

		}
	} else {
		validaciones.innerHTML = "El usuario no esta regustrado"
		validaciones.style.color = "red"
	}


}


const cerrarSesionFunc = ()=>{
	formLogin.style.display = "block"
	divFormsProductos.style.display = "none"
	tienda.style.display = "none"
	localStorage.removeItem("usuarioLogueado")
}

linkRegistro.onclick = (e) => {
	e.preventDefault()
	mostrarRegistro()
}

btnRegistro.onclick = (e) => {
	e.preventDefault()
	crearUsuario()
}

btnIngresar.onclick = (e) => {
	e.preventDefault()
	login(inputNombre.value,inputClave.value)
}

btnEliminarProducto.onclick = (e) => {
	e.preventDefault()
	eliminarProducto()
}

btnAgregarProducto.onclick = (e) => {
	e.preventDefault()
	agregarProducto()
}

cerrarSesion.onclick = ()=>{
	
	cerrarSesionFunc()
}

if(localStorage.getItem("usuarioLogueado")){

	let nombreUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre
	let claveUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).clave

	login(nombreUsuario,claveUsuario)
}

let body = document.body

body.onmousemove = ()=>{

   tiempoUsuario = new Date().getTime() 
}

setInterval(() => {
	let tiempoActual = new Date().getTime()
	if((tiempoActual - tiempoUsuario) > 3000000  && localStorage.getItem("usuarioLogueado")){
		cerrarSesionFunc()
		alert("La sesión ha caducado")
	
	   }
}, 3);
