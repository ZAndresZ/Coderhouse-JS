// En este archivo vamos a tener la logica de nuestra app, todo lo que tenga que ver con el funcionaiento

//Aca definimos que es lo que se va a ver y no ver en el comienzo de la app
formLogin.style.display = "block"
divFormsProductos.style.display = "none"
btnRegistro.style.display = "none"
tienda.style.display = "none"
cerrarSesion.style.visibility = "hidden"

let tiempoUsuario; //Es una variable que usaremos mas tarde

//Esta funcion se ejecuta cuando el usuario clickea el boton completar registro
// en el formulario de registro
const crearUsuario = () => {

	let nombre = inputNombre.value;
	let clave = inputClave.value;
	let tipo;

	//Si es el primer usuario que se regista el array de usuarios va a estar vacio
	//por lo que le va a asignar el tipo (usuario.tipo) como admin
	//si usuario ya tiene un usuario cuando cree uno nuevo va a asignarle tipo usuario

	if (usuarios == "") {

		tipo = "admin"

	} else {
		tipo = "usuario"

	}

	//Aca va a validar si el valor ingresado en nombre y en clave es mayor a tres
	// Si no lo es va a mostrar el mensaje que debe tener 4 carateres o mas

	if (inputNombre.value.length < 4) {

		validaciones.html("El usuario debe tener 4 caracteres o más")
		validaciones.style.color = "red"

	} else if (inputClave.value.length < 4) {

		$("#validaciones").html("La clave debe tener 4 caracteres o más") 
		validaciones.style.color = "red"

	} else {
        // Si se cumplen los requisitos va a crear el usuario utilizando la clase Usuario
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

        //Ponemos un setTimeout para limpiar el mensaje "Usuario registrado con éxito" luego de 2 segundos
		setTimeout(() => {
			validaciones.innerHTML = ""
		}, 2000
		)

	}


}

//Esta funcion va a encargarse de recorrer el array productos creando una tarjeta de bootstrap por cada uno
// y armando asi la tienda en el HTML

const renderizarTienda = () => {
    tienda.style.display = "flex"
	formLogin.style.display = "none"
	if (productos != "") {
       
		for (const producto of productos) {
			/*const tienda = document.getElementById("tienda")
			let div = document.createElement("div")
			div.innerHTML = `<div class="card" style="width: 18rem;">
								<div class="card-body"> 
			  						<h5 class="card-title">${producto.nombre}</h5>
			  						<p class="card-text"> ${producto.precio}</p>
			  						<button class="btn btn-primary" id="${producto.nombre}">Comprar</button>
								</div>
		  					</div>`
			
			tienda.appendChild(div) */
			let div = $("<div>").append(`<div class="card" style="width: 18rem;">
			<div class="card-body"> 
				  <h5 class="card-title">${producto.nombre}</h5>
				  <p class="card-text"> ${producto.precio}</p>
				  <button class="btn btn-primary" id="${producto.nombre}">Comprar</button>
			</div>
		  </div>`)
			$("#tienda").append(div) 
			
			

		
		  	document.getElementById(producto.nombre).addEventListener("click",function(e){
				// e.target.id nos va a dar el id del boton que estamos clickeando 
				
				let productoHtml = document.getElementById(e.target.id).parentElement // nos va a traer el padre del boton, o sea el div que lo contiene
				
				//Ahora con los childnodes del div padre del boton podemos obtener el nombre del producto que esta en el textContent de
				// el <h5> que vemos arriba y el precio que esta en el <p>, con estos datos podemos armar el producto que vamos 
				// a pushear en el carrito 
				let producto = new Producto(productoHtml.childNodes[1].textContent,productoHtml.childNodes[3].textContent)
			    carrito.push(producto)
			})
		}

	} else { 

		tienda.innerHTML += "Tienda en construcción, disculpe las molestias"
	}
}


//Esta funcion añade un producto al array de productos
const agregarProducto = () => {
	// Primero creamos el producto con los valores de los inputs del form y lo pusheamos en productos
	let nombreProducto = inputAgregarN.value
	let precioProducto = inputAgregarP.value
	let nuevoProducto = new Producto(nombreProducto, precioProducto)
	productos.push(nuevoProducto)
    
	//luego lo guardamos en el localStorage seteando el item productos con el objeto convertido en json
	localStorage.setItem("productos", JSON.stringify(productos))

	//vaciamos los inputs del form
	inputAgregarN.value = ""
	inputAgregarP.value = ""
	//llamamos a completarSelect para que agregue en el select de eliminar productos el nuevo producto
	completarSelect()

	//Mostramos el mensaje de validacion 
	validaciones.innerHTML = "Producto añadido con éxito"	
	validaciones.style.color = "green"
	setTimeout(()=>{
		validaciones.innerHTML = ""
		
	},2000)

}

//Esta funcion nos va a permitir eliminar un producto del array productos
const eliminarProducto = () => {
    //obtenemos el valor del form
	let nombreProducto = selectEliminarP.value

	//Creamos un nuevo array haciendo un filtro que nos traiga todos los productos que no sean el que el usuario selecciono
	productos = productos.filter(producto => producto.nombre != nombreProducto)

	//Volvemos a setear productos en el localStorage con el nuevo array filtrado
	localStorage.setItem("productos", JSON.stringify(productos))
	
	//Mostramos el mensaje de validacion
	validaciones.style.color = "green"
	validaciones.innerHTML = "Producto eliminado con éxito"
	
	setTimeout(()=>{
		validaciones.innerHTML = ""
		completarSelect()
	},2000)

}


//Esta funcion va a servir para ocultar el boton de ingresar y el link de registro, a la vez que va a mostrar el boton de completar registro
const mostrarRegistro = () => {

	btnRegistro.style.display = "block"
	linkRegistro.style.display = "none"
	btnIngresar.style.display = "none"
}

//Esta funciton va a completar el select en el form de eliminar producto
const completarSelect = () => {
	//primero vaciamos el select para volver a completarlo con el nuevo array de prodcutos
	selectEliminarP.innerHTML = ""
	
	//Si productos tiene algo recorremos el array, si no ocultamos el form de eliminar producto
	if(productos != ""){

		for (let producto of productos) {
		//Por cada producto vamos a crear un option e insertarlo en el select
		/*let option = document.createElement("option")
		option.value = producto.nombre
		option.innerHTML = producto.nombre

		selectEliminarP.appendChild(option)*/
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
//Funcion que se ejecuta cuando el usuario entra en la tienda
const login = (nombreUsuario,claveUsuario) => {
    
	//vamos a chequear si el usuario existe en nuestro local storage
	const chequeoUsuario = usuarios.find(usuario => usuario.nombre === nombreUsuario)

	//Si existe entrara en el if, si no nos va a mostrar el mensaje "Usuario no registrado" 
	if (chequeoUsuario) {
		//Vaciamos el div de validaciones por si el usuario cometio un error antes
		validaciones.innerHTML = ""
        //chequeamos si la clave coincide con la clave guardada en el usuario que encontramos en localStorage
		//si no coincide mostramos mensaje de validacion
		if (claveUsuario === chequeoUsuario.clave) {
			//Si coincide vamos a guardar el usuario que se logueo en el localStorage
			//seteando un item que va a ser usuarioLogueado
			localStorage.setItem("usuarioLogueado",JSON.stringify(chequeoUsuario))
			inputClave.value = ""
			inputNombre.value = ""
			tiempoUsuario = new Date().getTime() // guardamos el momento en el que el usuario ingresa

			//si el usuario es de tipo "admin" mostraremos el administrador de la tienda
			// si es de tipo "usuario" mostraremos la tienda
			if (chequeoUsuario.tipo == "admin") {
				//llamamos a completar select para armar el select de el form de eliminar producto
				completarSelect()
				//Ocultamos el form de login y mostramos los de agregar y eliminar producto
				formLogin.style.display = "none"
				divFormsProductos.style.display = "flex"
				//mostramos el link para cerrar sesion
				cerrarSesion.style.visibility = "visible"
				//Cambiamos el titulo de tienda online por bienvenidx con el nombre del usuario
				document.getElementById("titulo").innerHTML = `Bienvenidx ${chequeoUsuario.nombre.toUpperCase()}`

			} else {

				//Cambiamos el titulo de tienda online por bienvenidx con el nombre del usuario
				document.getElementById("titulo").innerHTML = `Bienvenidx ${chequeoUsuario.nombre.toUpperCase()}`
				//llamamos a la funcion que va a ocultar el form de login y mostrar la tienda
				renderizarTienda()
				//mostramos el link de cerrar sesion
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


//funcion que va a cerrar la sesion
const cerrarSesionFunc = ()=>{
    //Ocultamos el div con los formularios en el caso de que cierre sesion el admin
	// y el de la tienda en el caso de que cierre session un usuario
	formLogin.style.display = "block"
	divFormsProductos.style.display = "none"
	tienda.style.display = "none"
	//eliminamos de localStorage el usuario logueado
	localStorage.removeItem("usuarioLogueado")
}


//Evento cuando clickeamos el  link de registrarse
linkRegistro.onclick = (e) => {
	e.preventDefault()
	mostrarRegistro()
}


//Evento cuando clickeamos el boton registro
btnRegistro.onclick = (e) => {
	e.preventDefault()
	crearUsuario()
}

//Evento cuando clickeamos el boton ingresar
btnIngresar.onclick = (e) => {
	e.preventDefault()
	login(inputNombre.value,inputClave.value)
}


//Evento cuando clickeamos el boton del form Eliminar Producto
btnEliminarProducto.onclick = (e) => {

	e.preventDefault()
	eliminarProducto()

}


//Evento cuando clickeamos el boton del form agregar producto
btnAgregarProducto.onclick = (e) => {

	e.preventDefault()
	agregarProducto()


}

//Evento cuando clickeamos el link de cerrar sesion
cerrarSesion.onclick = ()=>{
	
	cerrarSesionFunc()
}


//Chequeamos si hay un usuario guardado en usuarioLogueado en el local storage y si hay llamamos a la funcion login() 
//pasandole la clave y el nombre de ese usuario
if(localStorage.getItem("usuarioLogueado")){

	let nombreUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre
	let claveUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).clave

	login(nombreUsuario,claveUsuario)
}



let body = document.body

//le agregamos el evento onmousemove al body para saber si el usuario esta en la pagina o no
body.onmousemove = ()=>{

   tiempoUsuario = new Date().getTime() //cada vez que mueve el mouse guardamos la hora en milisegundos
 
}

//fijamos un setInterval (un metodo que recibe como primer parametro una funcion que se va a ejecutar 
// una y otra vez, como segundo parametro le pasamos el tiempo que queremos que tarde entre una ejecuion y la otra)
// para que se ejecute cada 3 milisegundos
setInterval(() => {
	//cada vez que ejecute esta funcion va a guardar la hora en milisegundos en la variable tiempo actual
	let tiempoActual = new Date().getTime()
	//Si tiempo actual - tiempoUsuario (tiempo usuario guarda la ultima vez que el usuario movio el mouse)
	//es menor a 10 minutos, va a llamar a cerrarSesionFunc y mostrarnos el alert de que la sesion caduco
	if((tiempoActual - tiempoUsuario) > 3000000  && localStorage.getItem("usuarioLogueado")){
		cerrarSesionFunc()
		alert("La sesión ha caducado")
	
	   }
}, 3);
