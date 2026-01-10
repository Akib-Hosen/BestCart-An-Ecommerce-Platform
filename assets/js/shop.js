
// CONFIGURATION & STATE
let currentSlide = 0;
let autoTimer = null;
let bannerImages = [];



// 1. BANNER SLIDER LOGIC
function fetchBanners() {
    fetch('../../api/api.php?action=get_sliders')
        .then(response => response.json())
        .then(data => {
            bannerImages = data;
            if (bannerImages.length > 0) {
                renderBanners();
            }
        })
        .catch(error => console.error('Error loading banners:', error));
}

function renderBanners() {
    const slider = document.getElementById("slider");
    if (slider && bannerImages.length > 0) {
        slider.src = `../../uploads/${bannerImages[0].image}`;
        startAutoSlide();
    }
}

function showSlide(index) {
    const slider = document.getElementById("slider");
    if (!slider || bannerImages.length === 0) return;

    if (index < 0) index = bannerImages.length - 1;
    if (index >= bannerImages.length) index = 0;

    currentSlide = index;
    slider.src = `../../uploads/${bannerImages[currentSlide].image}`;
}

function nextSlide() { 
    showSlide(currentSlide + 1); 
}
function prevSlide() { 
    showSlide(currentSlide - 1); 
}

function startAutoSlide() {
    stopAutoSlide();
    autoTimer = setInterval(nextSlide, 3500); 
}

function stopAutoSlide() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
}



// 4. INITIALIZATION

document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial Data Fetch
    fetchBanners();

    // 2. Slider Controls
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

});