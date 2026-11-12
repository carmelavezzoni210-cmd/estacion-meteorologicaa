const historial = [];

const grafico = new Chart(
  document.getElementById("grafico"),
  {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Temperatura (°C)",
          data: [],
          borderColor: "#e58a40",
          tension: 0.3
        },
        {
          label: "Humedad (%)",
          data: [],
          borderColor: "#3296d1",
          tension: 0.3
        }
      ]
    }
  }
);

function actualizarEstacion(temp, hum, suelo, lluvia) {
  const hora = new Date().toLocaleTimeString();

  document.getElementById("temperatura").textContent = temp + " °C";
  document.getElementById("humedad").textContent = hum + " %";
  document.getElementById("suelo").textContent = suelo + " %";
  document.getElementById("lluvia").textContent = lluvia;

  grafico.data.labels.push(hora);
  grafico.data.datasets[0].data.push(temp);
  grafico.data.datasets[1].data.push(hum);

  if (grafico.data.labels.length > 20) {
    grafico.data.labels.shift();
    grafico.data.datasets.forEach(d => d.data.shift());
  }

  grafico.update();

  historial.unshift({hora, temp, hum, suelo});

  if (historial.length > 30) historial.pop();

  document.getElementById("historial").innerHTML =
    historial.map(d => `
      <tr>
        <td>${d.hora}</td>
        <td>${d.temp} °C</td>
        <td>${d.hum} %</td>
        <td>${d.suelo} %</td>
      </tr>
    `).join("");
}

function actualizarReloj() {
  document.getElementById("reloj").textContent =
    new Date().toLocaleString("es-AR");
}

setInterval(actualizarReloj, 1000);
actualizarReloj();

actualizarEstacion(24, 65, 48, "Sin lluvia");

setInterval(() => {
  actualizarEstacion(
    24 + Math.floor(Math.random() * 5),
    60 + Math.floor(Math.random() * 15),
    40 + Math.floor(Math.random() * 20),
    "Sin lluvia"
  );
}, 5000);