
//////////////////////////// INICIALIZACIONES  //////////////////// {
 
	let miCarritoEnLS = JSON.parse(localStorage.getItem("miCarro"))										
	let totaldelcarro = JSON.parse(localStorage.getItem("totaldelcarro"))
	let vistaTotalCarroArriba = document.getElementById("totalCarritoArriba")
	let drop2 = document.getElementById("drop2")
	let miCarro = JSON.parse(localStorage.getItem("miCarro"))
	let probando = document.getElementById("probando")
	let carroFlotante = document.getElementById("botonFlotante")
	let miCarrito = []
	let productos = []
	let productosEnStock = []
	let items = []
	let i=0
	let h=0
	// JSON = todoslosproductos1.JSON

	class Producto {
	    constructor(nombre, precio, nroItem, cantidad){
	        this.nombre = nombre;
	        this.precio = parseFloat(precio);
	         this.nroItem = nroItem;
	         this.cantidad = parseFloat(cantidad);
	        this.vendido = false;
	    }


	    verInfo(){
      Swal.fire({
        title: `${this.nombre}`,
        text: `${this.descripcion}, PRECIO: $${this.precio}`,
        imageUrl: `${this.img}`,
        imageHeight: 300,
        imageAlt: 'Imagen del producto'        
      })
    }

	}

//}

//////////////////////////// FUNCIONES ////////////////////////////{
	//----------------------------------------------------------------
	function borrarstorage ()  {
		localStorage.clear()
		sessionStorage.clear()
	}
	//----------------------------------------------------------------
	function guardarLocal (clave, valor)  {
		localStorage.setItem(clave, valor)
	}
	//----------------------------------------------------------------
	function mueveElChanguito(){
			for(var i=0; i<4 ; i++){     
			          carroFlotante.classList.add('moviendoElChango1')
			setTimeout(() => {
			          carroFlotante.classList.remove('moviendoElChango1')
			            }, 500)
			setTimeout(() => {
			          carroFlotante.classList.add('moviendoElChango2')
			            }, 501)    
			setTimeout(() => {
			          carroFlotante.classList.remove('moviendoElChango2')
			            }, 1000)
			}
	}
	//---------------------------------------------------------------
	function botoncarroFlotante(){
  Swal.fire({
    title: '<h3>Su carrito</h3> <br> <div id="vistaRapida"></div><div id="vistaRapida2"></div> ',
    icon: 'info',
  })

	miCarritoEnLS = JSON.parse(localStorage.getItem("miCarro"))
  for(num in miCarritoEnLS){
    let carritoRapido = document.getElementById("vistaRapida");
    carritoRapido.innerHTML += `<h5><img width="30%" src="img/${miCarritoEnLS[num].nombre}.jpg"> ${miCarritoEnLS[num].nombre} ||  $ ${miCarritoEnLS[num].precio}</h5>`
     }
      let carritoRapido = document.getElementById("vistaRapida2");
     carritoRapido.innerHTML += `<br><h3> TOTAL: ${totaldelcarro}</h3>`
     carritoRapido.append();
}	

	//---------------------------------------------------------------
	function comprando (numerito, boton){
		// intentando realizar la compra"
		items = JSON.parse(localStorage.getItem("Stock"))
		let StockMomentaneoProducto = items[numerito].cantidad
		let numeroAComprar = document.getElementById("cantidadAcomprar").value
		// si la cantidad no se puede comprar porque es mucha
		if(numeroAComprar <= 0 ||  numeroAComprar>StockMomentaneoProducto){
			boton.classList.add('popup-active')
	 	  setTimeout(() => {
	      boton.classList.remove('popup-active')
	 		}, 2500)

	 	}
	 	//si todo esta OK! se realiza la compra
	 	if(numeroAComprar >0 && numeroAComprar <= StockMomentaneoProducto){
			Swal.fire({
			    position: 'top',
			    icon: 'success',
			    title: `AGREGANDO...... ${items[numerito].nombre}`,
			    showConfirmButton: false,
			    timer: 750,

			})			
			// muevo el chango (efecto visual)
			mueveElChanguito()
			setTimeout(() => {mueveElChanguito()}, 1000)
			setTimeout(() => {mueveElChanguito()}, 2000)
			setTimeout(() => {mueveElChanguito()}, 3000)					
			const saldo = items[numerito].precio*numeroAComprar
			miCarrito.push(new Producto(items[numerito].nombre,saldo,items[numerito].nroItem, numeroAComprar))
			items[numerito].cantidad = items[numerito].cantidad - numeroAComprar
			totaldelcarro = totaldelcarro + saldo
			vistaTotalCarroArriba.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" color="white"  width="35%" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg> $ ${totaldelcarro} `			
			i++
		} else{}
		document.getElementById("cantidadAcomprar").value = ""
		guardarLocal("Stock", JSON.stringify(items)) 	 
		productosEnStock = JSON.parse(localStorage.getItem("TodosLosProductos1"))
		productosEnStock[numerito].cantidad = items[numerito].cantidad

	}



	//----------------------------------------------------------------
		function chekearYcomprar (numerito, boton){		
			// si existe ya un carro comprando
			miCarritoEnLS = JSON.parse(localStorage.getItem("miCarro"))
			if(miCarritoEnLS == null){
				comprando(numerito, boton)
				guardarLocal("totaldelcarro", totaldelcarro)
				miCarritoEnLS = miCarrito
				guardarLocal("miCarro", JSON.stringify(miCarritoEnLS))
				
			} else{
				miCarrito = miCarritoEnLS
				comprando(numerito, boton)
				guardarLocal("totaldelcarro", totaldelcarro)
				miCarrito = miCarritoEnLS 
				// guardarLocal("miCarro", JSON.stringify(miCarritoEnLS) )
				guardarLocal("miCarro", JSON.stringify(miCarrito) )
			}	
		}
		//----------------------------------------------------------------
		function arrancoLaPagina(){
			let lista = document.querySelector('#cuerpo')
			items2 = JSON.parse(localStorage.getItem("TodosLosProductos1"))
			// voy poniendo todos los items de mi JSON en el HTML 
			for (var i=0;i< items2.length;i++){
				lista = document.querySelector('#cuerpo')
				let div1 = document.getElementById('div1')
				let div0 = document.getElementById('div0')
				let clave = i+1
				div0.innerHTML = `UNIDADES A COMPRAR : <input type="number" id="cantidadAcomprar">  </input>`
				div1.innerHTML += `
				
				<div class="right">
	            <img src="img/${items2[i].nombre}.jpg">
	            <h3>${items2[i].nombre}</h3>
	            <p>$ ${items2[i].precio} </p>
	            <button class="btn btn-primary btn-custom m-1 productito" id="clave${clave}">AGREGARLO AL CARRO</button>
	            </div>
	       		`
	       		lista.append(div1)	
	       		let abajoCuerpo = document.getElementById('abajoCuerpo')
	       		lista.append(abajoCuerpo)	
			}
					// les asigno a los botones , la 
					document.getElementById("clave1").addEventListener('click', () => {chekearYcomprar(0,document.getElementById("clave1"))})
					document.getElementById("clave2").addEventListener('click', () => { chekearYcomprar(1,document.getElementById("clave2"))})  
					document.getElementById("clave3").addEventListener('click', () => {chekearYcomprar(2,document.getElementById("clave3"))})
					document.getElementById("clave4").addEventListener('click', () => {chekearYcomprar(3,document.getElementById("clave4"))	})  
					document.getElementById("clave5").addEventListener('click', () => {chekearYcomprar(4,document.getElementById("clave5"))})	
					document.getElementById("clave6").addEventListener('click', () => {chekearYcomprar(5,document.getElementById("clave6"))})  
					document.getElementById("clave7").addEventListener('click', () => {chekearYcomprar(6,document.getElementById("clave7"))})  
					document.getElementById("clave8").addEventListener('click', () => {chekearYcomprar(7,document.getElementById("clave8"))})
					document.getElementById("clave9").addEventListener('click', () => {	chekearYcomprar(8,document.getElementById("clave9"))})
					carroFlotante.addEventListener('click', () => {botoncarroFlotante()})
			// })

		}
		//----------------------------------------------------------------
		function arrayPorJsonProductos(){
			// arranca la pagina y le pone los productos de la JSON a el array Productos
			fetch('todoslosproductos1.JSON')
			.then((response) => response.json())
				.then((json) =>  {
					json.forEach((cadaUno) => {
						productos.push(new Producto(cadaUno.nombre,cadaUno.precio,cadaUno.nroItem, cadaUno.cantidad))	
					})
					productosEnStock = productos
					guardarLocal("TodosLosProductos1", JSON.stringify(productos))	
					guardarLocal("Stock", JSON.stringify(productos))	

														
				})
			items = JSON.parse(localStorage.getItem("TodosLosProductos1"))
			productosEnStock = JSON.parse(localStorage.getItem("TodosLosProductos1"))
			items2 = JSON.parse(localStorage.getItem("TodosLosProductos1"))

		}
		//----------------------------------------------------------------
		function barraArribaCarrito(){
			if(totaldelcarro == null){
			vistaTotalCarroArriba.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" color="white"  width="35%"   fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg> $ 0 `
			} else {vistaTotalCarroArriba.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" color="white"  width="35%" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg>  $ ${totaldelcarro} `}
		}
//}
//////////////////////////// EJECUTA JS ////////////////////////////{
	items2 = JSON.parse(localStorage.getItem("TodosLosProductos1"))
	barraArribaCarrito()
	arrayPorJsonProductos()
	arrancoLaPagina()

//}

////////////////////////// PROBANDO ///////////////////////////// {




//}
