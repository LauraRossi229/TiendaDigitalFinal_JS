let carrito = [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar')) {
    validarProductoEnCarrito(e.target.id);
    Toastify({
      text: 'Agregado al carrito',
      duration: 3000,
      gravity: 'top',
      position: 'center',
      backgroundColor: '#4CAF50',
      stopOnFocus: true,
    }).showToast();
  };
})


const validarProductoEnCarrito = async (productoId) => {
  const estaRepetido = carrito.some(producto => producto.id == productoId)

  if (!estaRepetido) {
    const productos = await getProducts(); // obtener los productos del archivo stock.json
    const producto = productos.find(producto => producto.id == productoId)
    carrito.push(producto)
    pintarProductoCarrito(producto)
  } else {
    const productoRepetido = carrito.find(producto => producto.id == productoId)
    const cantidad = document.getElementById(`cantidad${productoRepetido.id}`)
    productoRepetido.cantidad++
    cantidad.innerText = `Cantidad: ${productoRepetido.cantidad}`
    actualizarTotalesCarrito(carrito)
  }
}

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById('carrito-contenedor')
  const div = document.createElement('div')
  div.classList.add('productoEnCarrito')
  div.innerHTML = `
  <img class="imgEnCarrito" src="${producto.imagen}">
  <p>${producto.nombre}</p>
  <p>Precio: $${producto.precio}</p>
  <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
  <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
  `
  contenedor.appendChild(div)
  actualizarTotalesCarrito(carrito)
}


const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
  const totalCompra = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)

  pintarTotalesCarrito(totalCantidad, totalCompra)
  guardarCarritoStorage(carrito)
}

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById('contador-carrito')
  const precioTotal = document.getElementById('precioTotal')

  contadorCarrito.innerText = totalCantidad
  precioTotal.innerText = totalCompra

  
}


const eliminarProductoCarrito = (productoId) => {
  const productoIndex = carrito.findIndex(producto => producto.id == productoId)
  carrito.splice(productoIndex, 1)
  pintarCarrito(carrito)
  actualizarTotalesCarrito(carrito)
}

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById('carrito-contenedor')

  contenedor.innerHTML = ''

  carrito.forEach(producto => {
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
      <img class="imgEnCarrito" src="${producto.imagen}">
      <p>${producto.nombre}</p>
      <p>Precio: $${producto.precio}</p>
      <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    div.querySelector('.boton-eliminar').addEventListener('click', () => eliminarProductoCarrito(producto.id))
    contenedor.appendChild(div)
  })
}



const pintarCarritoCompra = async (carrito) => {
  try {
    const productos = await getProducts(); // obtener los productos del archivo stock.json

    const contenedor = document.getElementById('carrito-contenedor')
    contenedor.innerHTML = ''

    const linksCompra = []; // inicializar array para recolectar los links

    for (let producto of carrito) {
      const productoEncontrado = productos.find(p => p.id === producto.id); // buscar el producto en la lista de productos
      if (productoEncontrado) {
        const div = document.createElement('div')
        div.classList.add('productoEnCarritoCompra')
        div.innerHTML = `
          <img class="imgEnCarrito" src="${productoEncontrado.imagen}">
          <p>${productoEncontrado.nombre}</p>
          <p>Si no puede acceder al QR, haga click en siguiente link:</p>
          <a href="${productoEncontrado.link}">Link del curso</a>
        `
        // Generar el código QR y agregarlo al div
        const imgQR = await generarQR(productoEncontrado.link)
        imgQR.classList.add('imgQR')
        div.appendChild(imgQR)

        contenedor.appendChild(div)

        linksCompra.push(productoEncontrado.link); // agregar el link al array
      }
    }

  
  } catch (error) {
    console.error(error)
  }
};




const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
  return carritoStorage
}

if (localStorage.getItem('carrito')) {
  carrito = obtenerCarritoStorage()
  pintarCarrito(carrito)
  actualizarTotalesCarrito(carrito)
}

const realizarCompra = () => {
  pintarCarritoCompra(carrito)
  localStorage.clear()
  carrito = []
  actualizarTotalesCarrito(carrito)
}
