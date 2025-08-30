let html5QrCode;

async function buscarFolio(folio) {
  const resultadoDiv = document.getElementById("resultado");
  const iconoDiv = document.getElementById("icono");

  try {
    const response = await fetch("./constancias.json");
    const constancias = await response.json();

    // Limpiar espacios y comparar
    const folioLimpio = folio.trim();
    const registro = constancias.find(c => c.folio.trim() === folioLimpio);

    if (registro) {
      // Fondo verde solo
      resultadoDiv.style.backgroundColor = "#d4edda";
      resultadoDiv.style.color = "#155724";
      iconoDiv.textContent = "✅";
    } else {
      // Fondo rojo si es inválido
      resultadoDiv.style.backgroundColor = "#f8d7da";
      resultadoDiv.style.color = "#721c24";
      iconoDiv.textContent = "❌";
    }
  } catch (error) {
    resultadoDiv.style.backgroundColor = "#fff3cd";
    resultadoDiv.style.color = "#856404";
    iconoDiv.textContent = "⚠️";
    console.error(error);
  }

  // Animación del icono
  iconoDiv.classList.remove("bounce");
  void iconoDiv.offsetWidth;
  iconoDiv.classList.add("bounce");
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
