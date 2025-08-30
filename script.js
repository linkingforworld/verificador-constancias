let html5QrCode;

async function buscarFolio(folio) {
  const resultadoDiv = document.getElementById("resultado");

  try {
    const response = await fetch("./constancias.json");
    const constancias = await response.json();

    const folioLimpio = folio.trim();
    const registro = constancias.find(c => c.folio.trim() === folioLimpio);

    if (registro) {
      resultadoDiv.style.backgroundColor = "#d4edda"; // verde
    } else {
      resultadoDiv.style.backgroundColor = "#f8d7da"; // rojo
    }
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    resultadoDiv.style.backgroundColor = "#f8d7da"; // rojo si hay error
  }
}

function iniciarQR() {
  html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      buscarFolio(decodedText);
    },
    (errorMessage) => {}
  ).catch(err => {
    console.error("Error al iniciar cámara:", err);
  });
}

window.onload = iniciarQR;
