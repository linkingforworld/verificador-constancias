const html5QrCode = new Html5Qrcode("reader");

function onScanSuccess(decodedText) {
  console.log("Folio leído:", decodedText);

  fetch("constancias.json")
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById("result");
      const constancia = data.find(item => item.folio === decodedText);

      if (constancia) {
        resultDiv.className = "valido";
        resultDiv.innerHTML = `
          <strong>Constancia Verificada ✅</strong><br><br>
          <strong>Folio:</strong> ${constancia.Folio}<br>
          <strong>Nombre:</strong> ${constancia.Nombre}<br>
          <strong>Curso:</strong> ${constancia.Curso}<br>
          <strong>Fecha:</strong> ${constancia.Fecha}<br><br>
          Nancy Jazmín Martínez Morales <br>
          <em>Directora General</em>
        `;
      } else {
        resultDiv.className = "invalido";
        resultDiv.innerHTML = "❌ Constancia No Encontrada";
      }
    })
    .catch(err => console.error("Error cargando JSON:", err));
}

// Inicia la cámara
Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    );
  }
}).catch(err => console.error("Error iniciando cámara:", err));


