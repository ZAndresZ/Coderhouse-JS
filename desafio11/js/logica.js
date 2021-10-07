formLogin.style.display = "block"
divFormsQuejas.style.display = "none"
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
	if (quejas != "") {
       
		for (const queja of quejas) {
			
			let div = $("<div>").append(`<div class="card" style="width: 18rem;">
			<div class="card-body"> 
				  <h5 class="card-title">${queja.descripcion}</h5>
				  <p class="card-text"> ${queja.tiempo}</p>
				  <button class="btn btn-primary" id="${queja.descripcion}">Comprar</button>
			</div>
		  </div>`)
			$("#tienda").append(div) 
			
			

		
		  	document.getElementById(queja.descripcion).addEventListener("click",function(e){
				
				let quejaHtml = document.getElementById(e.target.id).parentElement 
				let queja = new Queja(quejaHtml.childNodes[1].textContent,quejaHtml.childNodes[3].textContent)
			    carrito.push(queja)
			})
		}

	} else { 

		tienda.innerHTML += "Tienda en construcción, disculpe las molestias"
	}
}


const agregarQueja = () => {
	let descripcionQueja = inputAgregarN.value
	let tiempoQueja = inputAgregarP.value
	let nuevoQueja = new Queja(descripcionQueja, tiempoQueja)
	quejas.push(nuevoQueja)
    
	localStorage.setItem("quejas", JSON.stringify(quejas))

	inputAgregarN.value = ""
	inputAgregarP.value = ""
	completarSelect()

	validaciones.innerHTML = "Queja añadido con éxito"	
	validaciones.style.color = "green"
	setTimeout(()=>{
		validaciones.innerHTML = ""
		
	},2000)

}

const eliminarQueja = () => {
	let descripcionQueja = selectEliminarP.value

	quejas = quejas.filter(queja => queja.descripcion != descripcionQueja)

	localStorage.setItem("quejas", JSON.stringify(quejas))
	
	validaciones.style.color = "green"
	validaciones.innerHTML = "Queja eliminado con éxito"
	
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
	
	if(quejas != ""){

		for (let queja of quejas) {
		
         let option = $("<option>", {
			value: queja.descripcion,
			text: queja.descripcion
		 })

		$("#eliminarQuejas").append(option)
	}

	    formQuejaEliminar.style.display = "block"

	}else{

		formQuejaEliminar.style.display = "none"

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
				divFormsQuejas.style.display = "flex"
				cerrarSesion.style.visibility = "visible"
				document.getElementById("titulo").innerHTML = `Hola ${chequeoUsuario.nombre.toUpperCase()}`

			} else {

				document.getElementById("titulo").innerHTML = `Hola ${chequeoUsuario.nombre.toUpperCase()}`
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
	divFormsQuejas.style.display = "none"
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

btnEliminarQueja.onclick = (e) => {
	e.preventDefault()
	eliminarQueja()
}

btnAgregarQueja.onclick = (e) => {
	e.preventDefault()
	agregarQueja()
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