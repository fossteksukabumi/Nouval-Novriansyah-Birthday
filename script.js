const startButton = document.getElementById("startButton");
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");
const bgMusic = document.getElementById("bgMusic");
const balloonContainer = document.getElementById("balloonContainer");
const confettiContainer = document.getElementById("confettiContainer");

let balloonInterval = null;
let confettiInterval = null;

startButton.addEventListener("click", () => {
  bgMusic.play();
  startBalloons();
  startConfetti();

  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    mainContent.classList.remove("hidden");
  }, 1200);
});

/* ------------------ BALLOON ------------------ */
function startBalloons() {
  balloonInterval = setInterval(() => {
    const activeBalloons = document.querySelectorAll(".balloon").length;
    if (activeBalloons < 8) createBalloon();
  }, 1500);
}

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.background = getRandomColor();
  balloon.style.left = `${Math.random() * 100}%`;
  const size = 30 + Math.random() * 20;
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.5}px`;
  balloon.style.animationDuration = `${6 + Math.random() * 3}s`;
  balloon.style.animationDelay = `${Math.random() * 1}s`;
  balloonContainer.appendChild(balloon);
  setTimeout(() => balloon.remove(), 10000);
}

/* ------------------ CONFETTI ------------------ */
function startConfetti() {
  confettiInterval = setInterval(() => {
    const activeConfetti = document.querySelectorAll(".confetti").length;
    if (activeConfetti < 30) createConfetti();
  }, 250);
}

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  confetti.style.backgroundColor = getRandomColor();
  confetti.style.left = `${Math.random() * 100}%`;

  const size = 6 + Math.random() * 6;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size * 1.6}px`;
  confetti.style.animationDuration = `${3 + Math.random() * 2}s`;

  confettiContainer.appendChild(confetti);
  setTimeout(() => confetti.remove(), 6000);
}

/* ------------------ UTILITAS ------------------ */
function getRandomColor() {
  const colors = ["#ff6b6b", "#ffb347", "#ffd166", "#6ecb63", "#6ec1e4", "#a56cc1"];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* ------------------ SLIDESHOW ------------------ */
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active");

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  setTimeout(showSlides, 4000);
}

/* ------------------ YOUTUBE VIDEO CONTROL ------------------ */
let players = [];

function onYouTubeIframeAPIReady() {
  const iframes = document.querySelectorAll(".video-container iframe");

  iframes.forEach((iframe) => {
    const player = new YT.Player(iframe, {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
    players.push(player);
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    bgMusic.pause();
  } else if (
    event.data === YT.PlayerState.PAUSED ||
    event.data === YT.PlayerState.ENDED
  ) {
    bgMusic.play();
  }
}
