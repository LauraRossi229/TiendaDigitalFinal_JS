async function generarQR(link) {
    try {
      // Construir la URL de la API para generar el código QR
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${link}`;
  
      // Obtener los datos del código QR de la API
      const response = await fetch(url);
      const blob = await response.blob();
  
      // Crear la URL del código QR generado
      const qr = URL.createObjectURL(blob);
  
      // Crear un elemento de imagen y establecer la fuente en el código QR generado
      const img = document.createElement('img');
      img.src = qr;
      return img;
    } catch (error) {
      console.error(error);
    }
  }