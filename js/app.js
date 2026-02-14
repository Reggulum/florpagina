const startBtn = document.getElementById("startBtn");
const petalsContainer = document.getElementById("petalsContainer");
const bgMusic = document.getElementById("bgMusic");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

let openedPetals = new Set(); // Para saber cuántos únicos ha visto

startBtn.addEventListener("click", () => {
  bgMusic.volume = 0.5;
  bgMusic.play();
  document.querySelector(".intro").style.display = "none";
  document.querySelector(".main").style.display = "flex";
  createPetals();
  startRain("❤️", 350); // Lluvia normal de corazones
});

function createPetals() {
  const total = petalsData.length;
  const radius = 75;

  for (let i = 0; i < total; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.classList.add(petalsData[i].type === "video" ? "type-video" : "type-text");

    const angle = (360 / total) * i;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;

    petal.style.left = `${x - 25}px`;
    petal.style.top = `${y - 70}px`;
    petal.style.transform = `rotate(${angle + 90}deg)`;

    petal.addEventListener("click", () => openContent(i, petal));
    petalsContainer.appendChild(petal);
  }
}

function openContent(i, el) {
  openedPetals.add(i); // Marcamos este pétalo como visto
  el.style.opacity = "0.6";

  bgMusic.volume = 0.1;
  modal.style.display = "flex";
  modalContent.innerHTML = "";

  const data = petalsData[i];
  if (data.type === "video") {
    modalContent.innerHTML = `<video id="activeVid" src="${data.src}" controls autoplay style="width:100%"></video>`;
  } else {
    modalContent.innerHTML = `<p style="font-size:22px; padding:20px; color:#ff4d6d;">${data.message}</p>`;
  }
}

function close() {
  const vid = document.getElementById("activeVid");
  if(vid) { vid.pause(); vid.src = ""; }
  
  modal.style.display = "none";
  bgMusic.volume = 0.5;

  // Si ya vio todos los pétalos, lanzamos la sorpresa
  if (openedPetals.size === petalsData.length) {
    showFinalSurprise();
  }
}

closeModal.onclick = close;
window.onclick = (e) => { if(e.target === modal) close(); };

function showFinalSurprise() {
  const finalScreen = document.getElementById("finalScreen");
  const glass = document.querySelector(".glass");
  
  // Efecto: El cristal se desvanece
  glass.style.opacity = "0";
  glass.style.transform = "scale(1.2)";

  setTimeout(() => {
    finalScreen.style.display = "flex";
    // Lluvia masiva de pétalos y corazones
    startRain("🌸", 150); 
    startRain("❤️", 150);
  }, 1000);
}

function startRain(char, speed) {
  setInterval(() => {
    const d = document.createElement("div");
    d.classList.add("drop");
    d.innerHTML = char;
    d.style.left = Math.random() * 100 + "vw";
    d.style.fontSize = Math.random() * 25 + 15 + "px";
    d.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 5000);
  }, speed);
}

// Añade esto al final de tu app.js

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  const finalScreen = document.getElementById("finalScreen");
  const glass = document.querySelector(".glass");
  const petals = document.querySelectorAll(".petal");

  // 1. Ocultar pantalla final
  finalScreen.style.display = "none";

  // 2. Aparecer el cristal de nuevo
  glass.style.opacity = "1";
  glass.style.transform = "scale(1)";

  // 3. Restaurar los pétalos
  petals.forEach(p => {
    p.style.opacity = "1"; // Recuperan su brillo
    p.style.filter = "none";
  });

  // 4. Reiniciar el contador de pétalos vistos
  openedPetals.clear();
  
  // Opcional: Detener la lluvia masiva de la sorpresa
  // (Aunque si la dejas se ve lindo, tú decides)
});