const botones = document.getElementById('botones');
botones.innerHTML = '<button class="btn-small btnComprar blue" onclick="comprar()">Comprar</button><button class=" botons btn-small btnSalir grey" onclick="salir()">Salir</button>';

const formContainer = document.getElementById('formContainer');
formContainer.style.display = 'none'; // Ocultar el formulario por defecto

// Función que se llama al presionar el botón "Comprar"
function comprar() {
  botones.style.display = 'none'; // Ocultar los botones de "Comprar" y "Salir"
  formContainer.style.display = 'block'; // Mostrar el formulario
}

// Función que se llama al presionar el botón "Salir"
function salir() {
  setTimeout(() => {
    window.location.href = "index.html"; // redirecciona a la página principal
    }, 1000); // espera 1 segundos antes de redireccionar
}

// Crear label para indicar qué debe ingresar el usuario
const labelCorreo = document.createElement('label');
labelCorreo.for = 'correoInput';
labelCorreo.innerHTML = 'Ingrese su correo electrónico: ';
formContainer.appendChild(labelCorreo);

// Crear input para ingresar el correo electrónico
const inputCorreo = document.createElement('input');
inputCorreo.type = 'email';
inputCorreo.id = 'correoInput';
inputCorreo.required = true;
formContainer.appendChild(inputCorreo);
let correoIngresado;

inputCorreo.addEventListener('change', (event) => {
  correoIngresado = event.target.value;
});


// Crear label para indicar qué debe ingresar el usuario
const labelCodigo = document.createElement('label');
labelCodigo.for = 'codigoInput';
labelCodigo.innerHTML = 'Ingrese el código de pago de 5 dígitos: ';
formContainer.appendChild(labelCodigo);

// Crear input para ingresar el código
const inputCodigo = document.createElement('input');
inputCodigo.type = 'text';
inputCodigo.id = 'codigoInput';
formContainer.appendChild(inputCodigo);

// Crear botón para validar el correo electrónico y el código
const boton = document.createElement('button');
boton.innerHTML = '<button class="btn-small btnComprar grey" onclick="validarCompra()">Validar</button>';
formContainer.appendChild(boton);

// Función que se llama al presionar el botón "Validar"
function validarCompra() {
  const correo = document.getElementById('correoInput').value;
  const codigo = document.getElementById('codigoInput').value;
  const divResultado = document.getElementById('resultado');

  if (correo.length > 0 && /\S+@\S+\.\S+/.test(correo) && codigo.length === 5 && /^\d+$/.test(codigo)) {
    swal.fire({
      title: "Compra realizada con éxito",
      text: "Gracias por su compra",
      icon: "success",
    }).then(() => {
      realizarCompra(); 
    });
  } else {
    swal.fire({
      title: "Información inválida",
      text: "Por favor, ingrese un correo electrónico válido y un código de pago de 5 dígitos",
      icon: "error",
    }).then(() => {
      pintarCarrito(carrito);
      setTimeout(() => {
        window.location.href = "index.html"; // redirecciona a la página principal
      }, 2000); // espera 2 segundos antes de redireccionar
    });
  }
}

// Crear div para mostrar el resultado
const divResultado = document.createElement('div');
divResultado.id = 'resultado';
document.body.appendChild(divResultado);
