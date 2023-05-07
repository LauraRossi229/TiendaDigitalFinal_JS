const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito')
const modalComprar = document.querySelector('.btnComprar')
const modalSalir = document.querySelector('.btnSalir')

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click()
});

modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
  
    if (e.target.classList.contains('boton-eliminar')) {
      eliminarProductoCarrito(e.target.value)
      Toastify({
        text: 'El producto se ha eliminado',
        duration: 3000,
        gravity: 'top',
        position: 'center',
        backgroundColor: '#28a745',
        stopOnFocus: true,
        close: true,
      }).showToast();
    }
  });
  

modalComprar.addEventListener('click', (e) => {
    e.stopPropagation()

    if (e.target.classList.contains('btnComprar')) {
        realizarCompra(e.target.value)
    }
})


modalSalir.addEventListener('click', () => {
    cerrarCarrito.click()
});