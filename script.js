// ===============================
// DOM Elements
// ===============================

const loading = document.getElementById("loading");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");
const counter = document.getElementById("relationshipCounter");
const alwaysBtn = document.getElementById("alwaysBtn");
const ending = document.getElementById("ending");
const hearts = document.querySelector(".hearts");
const secret = document.getElementById("secretMessage");
const closeSecret = document.getElementById("closeSecret");
const names = document.querySelector(".names");

// ===============================
// Loading Screen
// ===============================

loading.addEventListener("click", () => {

    loading.style.opacity = "0";

    setTimeout(() => {

        loading.style.display = "none";

    },1000);

});

// ===============================
// Music
// ===============================

startBtn.addEventListener("click",()=>{

    music.play();

    document.querySelector(".memory").scrollIntoView({

        behavior:"smooth"

    });

});

// ===============================
// Relationship Counter
// ===============================

const anniversary = new Date("July 15, 2021 00:00:00");

function updateCounter(){

    const today = new Date();

    const diff = today - anniversary;

    const days = Math.floor(diff / (1000*60*60*24));

    const years = Math.floor(days/365);

    const remaining = days % 365;

    counter.innerHTML = `
        ❤️ ${years} Years <br>
        ❤️ ${remaining} Days <br>
        ❤️ And Counting...
    `;

}

updateCounter();

setInterval(updateCounter,60000);

// ===============================
// Floating Hearts
// ===============================

function createHeart(){

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(20+Math.random()*30)+"px";

    heart.style.animationDuration=(5+Math.random()*6)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },12000);

}

setInterval(createHeart,500);

// ===============================
// Reveal Animation
// ===============================

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0px)";

}

});

},{threshold:.2});

document.querySelectorAll("section").forEach(section=>{

section.style.opacity=0;

section.style.transform="translateY(80px)";
section.style.transition="1s";

observer.observe(section);

});

// ===============================
// Scroll Gallery Animation
// ===============================

const images=document.querySelectorAll(".gallery img");

images.forEach((img,index)=>{

img.style.transition="0.8s";
img.style.transitionDelay=index*0.08+"s";

observer.observe(img);

});

// ===============================
// Always Button
// ===============================

alwaysBtn.addEventListener("click",()=>{

launchConfetti();

ending.scrollIntoView({

behavior:"smooth"

});

});

// ===============================
// Confetti
// ===============================

const canvas=document.getElementById("confetti");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let confetti=[];

function random(min,max){

return Math.random()*(max-min)+min;

}

function launchConfetti(){

confetti=[];

for(let i=0;i<220;i++){

confetti.push({

x:random(0,canvas.width),

y:random(-canvas.height,0),

r:random(3,8),

dx:random(-3,3),

dy:random(2,6),

rot:random(0,360)

});

}

animateConfetti();

}
// ===============================
// Confetti Animation
// ===============================

function animateConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((c, i) => {

        ctx.save();

        ctx.translate(c.x, c.y);

        ctx.rotate(c.rot);

        ctx.fillStyle = `hsl(${Math.random()*360},80%,65%)`;

        ctx.fillRect(-c.r/2, -c.r/2, c.r, c.r*2);

        ctx.restore();

        c.x += c.dx;
        c.y += c.dy;
        c.rot += 0.08;

        if(c.y > canvas.height + 20){

            confetti.splice(i,1);

        }

    });

    if(confetti.length){

        requestAnimationFrame(animateConfetti);

    }else{

        ctx.clearRect(0,0,canvas.width,canvas.height);

    }

}

// ===============================
// Secret Easter Egg
// ===============================

let taps = 0;

names.addEventListener("click",()=>{

    taps++;

    if(taps >= 5){

        secret.style.display="flex";

        taps=0;

    }

});

closeSecret.addEventListener("click",()=>{

    secret.style.display="none";

});

// ===============================
// Image Lightbox
// ===============================

const galleryImages=document.querySelectorAll(".gallery img");

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        const overlay=document.createElement("div");

        overlay.style.position="fixed";
        overlay.style.left="0";
        overlay.style.top="0";
        overlay.style.width="100%";
        overlay.style.height="100%";
        overlay.style.background="rgba(0,0,0,.9)";
        overlay.style.display="flex";
        overlay.style.justifyContent="center";
        overlay.style.alignItems="center";
        overlay.style.zIndex="9999";

        const big=document.createElement("img");

        big.src=img.src;

        big.style.maxWidth="90%";
        big.style.maxHeight="90%";
        big.style.borderRadius="20px";
        big.style.boxShadow="0 20px 60px rgba(0,0,0,.5)";

        overlay.appendChild(big);

        overlay.onclick=()=>overlay.remove();

        document.body.appendChild(overlay);

    });

});

// ===============================
// Rose Petals
// ===============================

function createPetal(){

    const petal=document.createElement("div");

    petal.innerHTML="🌸";

    petal.style.position="fixed";
    petal.style.left=Math.random()*100+"vw";
    petal.style.top="-50px";
    petal.style.fontSize=(18+Math.random()*18)+"px";
    petal.style.pointerEvents="none";
    petal.style.zIndex="99";

    document.body.appendChild(petal);

    let y=-50;
    let x=parseFloat(petal.style.left);

    const fall=setInterval(()=>{

        y+=2;
        x+=Math.sin(y/30);

        petal.style.top=y+"px";
        petal.style.left=x+"px";

        if(y>window.innerHeight+50){

            clearInterval(fall);

            petal.remove();

        }

    },16);

}

const letter=document.getElementById("letter");

const petalObserver=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            for(let i=0;i<40;i++){

                setTimeout(createPetal,i*200);

            }

            petalObserver.disconnect();

        }

    });

});

petalObserver.observe(letter);

// ===============================
// Typewriter Effect
// ===============================

document.querySelectorAll(".caption h2").forEach(text=>{

    const original=text.innerText;

    text.innerText="";

    const typeObserver=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                let i=0;

                const typing=setInterval(()=>{

                    text.innerText+=original.charAt(i);

                    i++;

                    if(i>=original.length){

                        clearInterval(typing);

                    }

                },35);

                typeObserver.disconnect();

            }

        });

    });

    typeObserver.observe(text);

});

// ===============================
// Resize
// ===============================

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

});

// ===============================
// Small Surprise
// ===============================

window.addEventListener("click",(e)=>{

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.style.position="fixed";
    heart.style.left=e.clientX+"px";
    heart.style.top=e.clientY+"px";
    heart.style.pointerEvents="none";
    heart.style.fontSize="20px";
    heart.style.transition="1s";
    heart.style.zIndex="999";

    document.body.appendChild(heart);

    requestAnimationFrame(()=>{

        heart.style.transform="translateY(-70px) scale(1.8)";
        heart.style.opacity="0";

    });

    setTimeout(()=>heart.remove(),1000);

});

// ===============================
// Final Console Message
// ===============================

console.log("%c❤️ To My Favourite Person ❤️","font-size:28px;color:#ff5fa2;font-weight:bold;");
console.log("Made with love by Tarang ❤️");
