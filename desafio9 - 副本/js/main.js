class Producto {
    constructor(id, categoria, nombre, precio) {
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
    }
}
const Productos = [];

Productos.push(new Producto(0, "Lapiz", "HB", 10))
Productos.push(new Producto(1, "Lapiz", "2B", 12))
Productos.push(new Producto(2, "Goma", "Para lapiz", 5))
Productos.push(new Producto(3, "Lapiz", "Para lapiz y lapicera", 8))
Productos.push(new Producto(4, "Mochila", "Addidas", 100))
Productos.push(new Producto(5, "Mochila", "Nike", 120))
Productos.push(new Producto(6, "Mochila", "New Balance", 90))

console.log(Productos)

function saveLocal() {
    let aJson = JSON.stringify(Productos)
localStorage.setItem("productos",aJson)
}

function imprimirProductos() {
    let idImprimir = document.getElementById("cardsId")
    Productos.forEach(e => {

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

saveLocal();


const elementos = ["cepillo", "broches", "colita"];
const DIV_ELEMENTOS= document.querySelector(".nombres")

elementos.forEach((elemento) => {
    //DIV_ELEMENTOS.innerHTML += `<div class='card'>$[elemento]</div>`
    const DIV_ELEMENTO = document.createElement("div");
    DIV_ELEMENTO.textContent = elemento;
    DIV_ELEMENTO.classList.add('card', 'elemento')
    DIV_ELEMENTOS.appendChild(DIV_ELEMENTO);
});

const INPUT = document.querySelector(`#input`);
const INPUT2 = document.querySelector(`#input2`);

INPUT2.addEventListener('click', (e)=>console.log(e.target.value))

const SELECTION = document.querySelector("#select")
const marcas = ["NIKE", "ADDIDAS", "PUMA", "NEW BALANCA"];

marcas.forEach(marca => {
    const OPTION = document.createElement("option");
    OPTION.textContent = marcas;
    OPTION.value = marca
    console.log(OPTION)
    SELECTION.appendChild(OPTION)
})

SELECTION.addEventListener("change", (e) =>{
    console.log(e);
})