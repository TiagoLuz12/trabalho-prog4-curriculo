document.addEventListener("DOMContentLoaded", function () {

  const typedLine = document.getElementById("typedLine");
  const textoDigitado = "Disponível para novas oportunidades ✔";
  let indiceChar = 0;

  function digitar() {
    if (indiceChar <= textoDigitado.length) {
      typedLine.textContent = textoDigitado.slice(0, indiceChar);
      indiceChar++;
      setTimeout(digitar, 60);
    }
  }
  digitar();

  const btnSaudacao = document.getElementById("btnSaudacao");
  const inputNome = document.getElementById("nomeVisitante");
  const saudacaoDinamica = document.getElementById("saudacaoDinamica");
  const heroName = document.getElementById("heroName");

  btnSaudacao.addEventListener("click", function () {
    const nome = inputNome.value.trim();

    if (nome === "") {
      alert("Olá! Obrigado por visitar meu currículo.");
      return;
    }

    saudacaoDinamica.innerText = "Olá, " + nome + "! Que bom ter você por aqui 👋";
    alert("Olá, " + nome + "! Obrigado por visitar meu currículo.");
  });

  inputNome.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      btnSaudacao.click();
    }
  });

  const btnToggleBio = document.getElementById("btnToggleBio");
  const bioExtra = document.getElementById("bioExtra");

  btnToggleBio.addEventListener("click", function () {
    const estaEscondida = bioExtra.classList.toggle("hidden");
    btnToggleBio.textContent = estaEscondida ? "+ ver mais sobre mim" : "- ver menos";
    btnToggleBio.setAttribute("aria-expanded", String(!estaEscondida));
  });

  const formContato = document.getElementById("formContato");
  const formFeedback = document.getElementById("formFeedback");

  formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("email").value;
    formFeedback.innerHTML =
      "Mensagem recebida! Em breve retorno o contato em <strong>" + email + "</strong>.";

    formContato.reset();
  });

  const contadorVisitas = document.getElementById("contadorVisitas");
  let visitas = Number(localStorage.getItem("visitasCurriculo")) || 0;
  visitas += 1;
  localStorage.setItem("visitasCurriculo", visitas);
  contadorVisitas.innerText = "Você visitou esta página " + visitas + " vez(es) neste navegador.";

  const canvas = document.getElementById("skillChart");
  const ctx = canvas.getContext("2d");

  const habilidades = [
    { nome: "HTML", valor: 95 },
    { nome: "CSS", valor: 90 },
    { nome: "JS", valor: 80 },
    { nome: "A11y", valor: 75 },
    { nome: "UI/UX", valor: 70 }
  ];

  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;
  const raioMax = 110;
  const cores = { grade: "#2a3450", area: "rgba(232, 163, 61, 0.35)", linha: "#e8a33d", texto: "#8b93a7" };

  function pontoNoEixo(indice, total, raio) {
    const angulo = (Math.PI * 2 * indice) / total - Math.PI / 2;
    return {
      x: centroX + raio * Math.cos(angulo),
      y: centroY + raio * Math.sin(angulo)
    };
  }

  function desenharGrade() {
    const niveis = 4;
    for (let n = 1; n <= niveis; n++) {
      const raio = (raioMax * n) / niveis;
      ctx.beginPath();
      habilidades.forEach(function (h, i) {
        const p = pontoNoEixo(i, habilidades.length, raio);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.strokeStyle = cores.grade;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function desenharEixosELabels() {
    habilidades.forEach(function (h, i) {
      const p = pontoNoEixo(i, habilidades.length, raioMax);
      ctx.beginPath();
      ctx.moveTo(centroX, centroY);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = cores.grade;
      ctx.stroke();

      const pLabel = pontoNoEixo(i, habilidades.length, raioMax + 22);
      ctx.fillStyle = cores.texto;
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(h.nome, pLabel.x, pLabel.y);
    });
  }

  function desenharArea() {
    ctx.beginPath();
    habilidades.forEach(function (h, i) {
      const raio = (raioMax * h.valor) / 100;
      const p = pontoNoEixo(i, habilidades.length, raio);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = cores.area;
    ctx.fill();
    ctx.strokeStyle = cores.linha;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  desenharGrade();
  desenharEixosELabels();
  desenharArea();

});
