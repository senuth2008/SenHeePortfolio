// ================= LOADER =================
const loader = document.getElementById("loader");
const mainContent = document.getElementById("mainContent");

window.addEventListener("load", () => {

  setTimeout(() => {
    // fade out loader
    loader.classList.add("fade-out");

    // show main content smoothly
    mainContent.classList.add("show");

  }, 600);

  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);

});


// ================= POPUP SYSTEM =================
const popup = document.getElementById("popup");
const popupFrame = document.getElementById("popupFrame");
const closeBtn = document.getElementById("closePopup");

// open video
function openVideo(videoId, type){
  popup.classList.add("active");

  popup.classList.remove("landscape", "portrait");

  if(type){
    popup.classList.add(type);
  }

  document.body.style.overflow = "hidden";

  popupFrame.src =
    "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";
}

// close popup
function closePopup(){
  popup.classList.remove("active");
  popup.classList.remove("landscape", "portrait");

  document.body.style.overflow = "auto";
  popupFrame.src = "";
}

// close button
closeBtn.addEventListener("click", closePopup);

// click outside closes
popup.addEventListener("click", (e)=>{
  if(e.target === popup){
    closePopup();
  }
});

// ESC key closes
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    closePopup();
  }
});


// ================= CURSOR GLOW =================
const glow = document.getElementById("cursorGlow");

window.addEventListener("mousemove", e=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});


// ================= PARTICLES BACKGROUND =================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", ()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Particle{
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,200,200,${this.alpha})`;
    ctx.fill();
  }
}

let particles = [];

for(let i = 0; i < 220; i++){
  particles.push(new Particle());
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p=>{
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();