//////////////////////////// INICIALIZACIONES  //////////////////// {
let totaldelcarro = JSON.parse(localStorage.getItem("totaldelcarro"))
const miCarro = JSON.parse(localStorage.getItem("miCarro"))
const cuerpo = document.getElementById("cuerpo")
const vistaTotalCarroArriba = document.getElementById("totalCarritoArriba")
//}
//////////////////////////// FUNCIONES //////////////////////////// {
//----------------------------------------------------------------
// funcion que pone el subtotal (hasta ahora) del carrito en la barra nav. de arriba
function barraArribaCarrito(){
  if(totaldelcarro == null){
  vistaTotalCarroArriba.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" color="white"  width="35%" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg> $  0 `
  } else {vistaTotalCarroArriba.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" color="white"  width="35%" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg> $  ${totaldelcarro} `}
}
  //----------------------------------------------------------------
  // funcion que arranca la pagina
function paginaCarrito(){
  barraArribaCarrito()
  cuerpo.innerHTML += `<h3 style="color:blue;"> Su carro es: </h3><br>`
  // pongo en el body, si es null que esta vacio y si no, muestro el carro.
  if(miCarro == null){
   cuerpo.innerHTML = `<h2 style="color:red;">Tu carro esta vacio</h2>`
   } else{
   miCarro.forEach((cadaUnito) => {
   cuerpo.innerHTML += ` Producto: <img class="fotitoChica" src="img/${cadaUnito.nombre}.jpg"> ${cadaUnito.nombre} || unidades: ${cadaUnito.cantidad}  ||  Subtotal: ${cadaUnito.precio} <br><br>   `  
   })
   cuerpo.innerHTML += ` Total :  ${totaldelcarro} $ <br><br><br> <div class="right"><button class="btn btn-primary btn-custom m-1 productito" id="comprar">Comprar</button><button class="btn btn-primary btn-custom m-1 productito" id="limpiar">Limpiar</button></div>`
   const btnComprar = document.getElementById("comprar")
   const btnLimpiar = document.getElementById("limpiar")

   // boton comprar: compra y guarda compra
   btnComprar.addEventListener('click', () => {   
   Swal.fire({
    position: 'top',
    icon: 'success',
    title: `COMPRADOOO.!`,
    showConfirmButton: false,
    timer: 2000,

    })
    cuerpo.innerHTML =  `Su carro fue COMPRADO <br>`   
    for (var i=0; i<miCarro.lenght; i++){
     localStorage.setItem(`Carrito compra ${i}`,JSON.stringify(miCarro))
     localStorage.setItem(`Total de compra ${i}`,JSON.stringify(totaldelcarro))
    }
     localStorage.removeItem("miCarro") 
     localStorage.removeItem("totaldelcarro")
     localStorage.removeItem("miCarro") 
     localStorage.removeItem("totaldelcarro") 
     localStorage.removeItem("Stock")
     productos = JSON.parse(localStorage.getItem("TodosLosProductos1"))
     localStorage.setItem("Stock",JSON.stringify(productos)) 
   }) 
   // boton limpiar, limpia el carro. ( lo borra)
   btnLimpiar.addEventListener('click', () => {   
    btnLimpiar.classList.add('popup-active')
    setTimeout(() => {
    btnLimpiar.classList.remove('popup-active')
    }, 2500)
    cuerpo.innerHTML =  `Su carro fue borrado! <br>`    
    localStorage.removeItem("miCarro") 
    localStorage.removeItem("totaldelcarro") 
    localStorage.removeItem("Stock")
    productos = JSON.parse(localStorage.getItem("TodosLosProductos1"))
    localStorage.setItem("Stock",JSON.stringify(productos)) 
    })  
    }
} 
//----------------------------------------------------------------
//}
//////////////////////////// EJECUTA JS ////////////////////////////{
// entra la pagina y arranca la funcion pagina 
  paginaCarrito()
  console.log(miCarro)
//}