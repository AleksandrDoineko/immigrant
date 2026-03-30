/**
 * 1. TUMŠĀ REŽĪMA FUNKCIJA AR ATMIŅU
 */
const darkToggle = document.getElementById("darkToggle");
const body = document.body;

// Pārbaudām, vai lietotājs jau iepriekš ir lietojis tumšo režīmu
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Saules ikona
}

darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    // Saglabājam izvēli un mainām ikonu
    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "light");
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

/**
 * 2. FAKTU ĢENERATORS AR RAKSTĪŠANAS EFEKTU
 */
const fakti = [
    "Kaķi var lēkt 6 reizes augstāk par savu augumu.",
    "Kaķiem ir vairāk nekā 100 dažādu skaņu.",
    "Kaķi murrā arī tad, kad ir satraukti.",
    "Kaķi redz ļoti labi pat visdziļākajā krēslā.",
    "Kaķi var skriet ar ātrumu līdz pat 48 km/h.",
    "Kaķa deguna nospiedums ir unikāls, līdzīgi kā cilvēka pirkstu nospiedumi.",
    "Gandrīz 70% savas dzīves kaķi pavada guļot."
];

const factBtn = document.getElementById("factBtn");
const factBox = document.getElementById("factBox");

function typeWriter(text, element) {
    let i = 0;
    element.innerHTML = ""; // Notīrām veco tekstu
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 30); // Rakstīšanas ātrums (ms)
        }
    }
    type();
}

factBtn.addEventListener("click", () => {
    const randomFact = fakti[Math.floor(Math.random() * fakti.length)];
    typeWriter(randomFact, factBox);
});

/**
 * 3. RANDOM KAĶU BILDE (NO ĪSTA INTERNETA API)
 */
const catBtn = document.getElementById("catBtn");
const catImg = document.getElementById("randomCat");

// Funkcija, kas paņem jaunu bildi no servera
async function fetchNewCat() {
    try {
        catBtn.disabled = true; // Izslēdzam pogu, kamēr lādējas
        catBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Meklēju...';
        
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        
        const newUrl = data[0].url;
        
        // Pagaidām, kamēr bilde tiešām ielādējas pārlūkā
        const tempImg = new Image();
        tempImg.src = newUrl;
        tempImg.onload = () => {
            catImg.style.opacity = 0; // Maiga pāreja
            setTimeout(() => {
                catImg.src = newUrl;
                catImg.style.opacity = 1;
                catBtn.disabled = false;
                catBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Cits kaķis';
            }, 300);
        };
        
    } catch (error) {
        console.error("Kļūda:", error);
        factBox.innerText = "Ak nē! Kaķi aizbēga. Pārbaudi internetu.";
        catBtn.disabled = false;
    }
}

catBtn.addEventListener("click", fetchNewCat);

// Ielādējam pirmo bildi uzreiz, kad lapa atveras
window.onload = () => {
    // Pievienojam nelielu efektu bildes parādīšanai
    catImg.style.transition = "opacity 0.5s ease";
};