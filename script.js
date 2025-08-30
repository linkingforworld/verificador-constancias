// script.js
async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error cargando el archivo JSON:", error);
    return [];
  }
}

function initScanner(data) {
  const html5QrCode = new Html5Qrcode("reader");

  function onScanSuccess(decodedText) {
    const folioEscaneado = decodedText.trim(); // quita espacios invisibles
    console.log("Folio leído:", folioEscaneado);

    // buscar el folio en el JSON
    const registro = data.find(item => item.folio.trim() === folioEscaneado);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (registro) {
      // ✅ Folio encontrado
      resultDiv.innerHTML = `
        <div class="success">
          <h2>✔ Folio válido</h2>
          <p><b>Folio:</b> ${registro.folio}</p>
          <p><b>Curso:</b> ${registro.curso}</p>
          <p><b>Usuario:</b> ${registro.usuario}</p>
          <p><b>Fecha de expedición:</b> ${registro.fecha}</p>
        </div>
      `;
    } else {
      // ❌ Folio no encontrado
      resultDiv.innerHTML = `
        <div class="error">
          <h2>✘ Folio inválido</h2>
          <p>No se encontró el registro en la base de datos.</p>
        </div>
      `;
    }
  }

  function onScanFailure(error) {
    // no pasa nada si falla, solo no detectó código
  }

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    onScanSuccess,
    onScanFailure
  );
}

// carga el JSON y arranca el escáner
loadData().then(data => initScanner(data));
