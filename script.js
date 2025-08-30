let html5QrCode;

async function buscarFolio(folio) {
  const resultadoDiv = document.getElementById("resultado");
  const iconoDiv = document.getElementById("icono");
  const mensajeDiv = document.getElementById("mensaje");

  try {
    const response = await fetch("./constancias.json");
    const constancias = await response.json();
    console.log("Constancias cargadas:", constancias);

    // Limpiar espacios y caracteres invisibles del folio escaneado
    const folioLimpio = folio.trim();

    // Buscar registro
    const registro = constancias.find(c => c.folio.trim() === folioLimpio);
    console.log("Buscando folio:", folioLimpio, "Encontrado:", registro);

    if (registro) {
      resultadoDiv.style.backgroundColor = "#d4edda";
      resultadoDiv.style.color = "#155724";
      iconoDiv.textContent = "✅";
      mensajeDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${registro.nombre}</p>
        <p><strong>Curso:</strong> ${registro.curso}</p>
        <p><strong>Fecha de expedición:</strong> ${registro.fecha}</p>
      `;
    } else {
      resultadoDiv.style.backgroundColor = "#f8d7da";
      resultadoDiv.style.color = "#721c24";
      iconoDiv.textContent = "❌";
      mensajeDiv.textContent = "Folio no válido.";
    }
  } catch (error) {
    resultadoDiv.style.backgroundColor = "#fff3cd";
    resultadoDiv.style.color = "#856404";
    iconoDiv.textContent = "⚠️";
    mensajeDiv.textContent = "Error al cargar los datos.";
    console.error(error);
  }

  // Animación: mostrar resultado
  resultadoDiv.classList.remove("visible");
  void resultadoDiv.offsetWidth;
  resultadoDiv.classList.add("visible");

  // Animación “rebote” del icono
  iconoDiv.classList.remove("bounce");
  void iconoDiv.offsetWidth;
  iconoDiv.classList.add("bounce");
}

function iniciarQR() {
  html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      console.log("QR leído:", decodedText); // depuración
      buscarFolio(decodedText);
    },
    (errorMessage) => {}
  ).catch(err => {
    console.error("Error al iniciar cámara:", err);
  });
}

window.onload = iniciarQR;
