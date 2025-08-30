function verificarConstancia(folio) {
    folio = folio.trim(); // quita espacios
    console.log("Folio escaneado:", folio);

    fetch("constancias.json")
        .then(response => response.json())
        .then(data => {
            console.log("Constancias cargadas:", data);

            const constancia = data.find(c => c.folio.trim() === folio);
            const resultado = document.getElementById("resultado");

            if (constancia) {
                resultado.style.background = "green";
                resultado.innerHTML = `
                    <p>✅ Constancia verificada</p>
                    <p><strong>Folio:</strong> ${constancia.folio}</p>
                    <p><strong>Nombre:</strong> ${constancia.nombre}</p>
                    <p><strong>Curso:</strong> ${constancia.curso}</p>
                    <p><strong>Fecha:</strong> ${constancia.fecha}</p>
                    <br>
                    <p>Nancy Jazzmín Martínez Morales<br><em>Directora General</em></p>
                `;
            } else {
                resultado.style.background = "red";
                resultado.innerHTML = "<p>❌ Constancia no encontrada</p>";
            }
        })
        .catch(error => {
            console.error("Error cargando JSON:", error);
        });
}
