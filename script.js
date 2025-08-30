// Inicializar escáner
const html5QrCode = new Html5Qrcode("reader");

// Función al leer QR
function onScanSuccess(decodedText) {
  console.log("Folio leído:", decodedText);

  // Cargar archivo JSON
  fetch("constancias.json")
    .then(response => response.json())
    .then(data => {
      const constancia = data.find(item => item.folio === decodedText);

      const resultDiv = document.getElementById("result");
      if (constancia) {
        resultDiv.innerHTML = `
          <h2 style="color:green;">✅ Constancia Válida</h2>
          <p><strong>Folio:</strong> ${constancia.folio}</p>
          <p><strong>Nombre:</strong> ${constancia.nombre}</p>
          <p><strong>Curso:</strong> ${constancia.curso}</p>
          <p><strong>Fecha de expedición:</strong> ${constancia.fecha}</p>
        `;
      } else {
        resultDiv.innerHTML = `<h2 style="color:red;">❌ Constancia no encontrada</h2>`;
      }
    })
    .catch(err => console.error("Error al cargar JSON:", err));
}

// Arrancar cámara
Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    );
  }
}).catch(err => console.error("Error al iniciar cámara:", err));
