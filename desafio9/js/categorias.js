let deJson = localStorage.getItem("productos")

const Productos = JSON.parse(deJson)

console.log(Productos)

let categoriaAux = []
let categoriaActual = prompt("Ingrese un categoria")

function filtroCategoria() {
    let categoria = Productos.filter(Producto => Producto.categoria == categoriaActual)
    categoriaAux = categoria
    console.log(categoria)
}

function imprimirProductos() {
    let idImprimir = document.getElementById("cardsCategoria")
    categoriaAux.forEach (e =>{
        idImprimir.innerHTML +=
        <div class = "card" style="width: 18rem;">
            <div class = "card body">
                <h5 class="card-title">nombre del producto:$(e.nombre)</h5>
                <p class="card-text">categoria del producto:$(e.categoria)</p>
                <p class="card-text">precio del producto:$(e.precio)</p>
                <a>Comprar</a>
            </div>
        </div>
    })
}

filtroCategoria();
imprimirProductos();