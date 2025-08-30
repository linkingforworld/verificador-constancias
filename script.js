const html5QrCode = new Html5Qrcode("reader");

function onScanSuccess(decodedText) {
  const folioEscaneado = decodedText.trim();
  console.log("Folio leído:", folioEscaneado);

  fetch("constancias.json")
    .then(response => response.json())
    .then(data => {
      const resultado = document.getElementById("result");

      // Buscar usando la clave correcta "Folio"
      const constancia = data.find(item => item.Folio.trim() === folioEscaneado);

      if (constancia) {
        resultado.className = "valido";
        resultado.innerHTML = `
          <strong>Constancia Verificada ✅</strong><br><br>
          <strong>Folio:</strong> ${constancia.Folio}<br>
          <strong>Nombre:</strong> ${constancia.Nombre}<br>
          <strong>Curso:</strong> ${constancia.Curso}<br>
          <strong>Fecha:</strong> ${constancia.Fecha}<br><br>
          Nancy Jazzmín Martínez Morales<br>
          <em>Directora General</em>
        `;
      } else {
        resultado.className = "invalido";
        resultado.innerHTML = "❌ Constancia No Encontrada";
      }
    })
    .catch(err => console.error("Error cargando JSON:", err));
}

// Inicia cámara
Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    );
  }
}).catch(err => console.error("Error iniciando cámara:", err));
