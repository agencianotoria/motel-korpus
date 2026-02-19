const galleryData = {
    clima: [
        "/assets/imagens/galeria/clima/MOTEL KORPUS-4746.webp",
        "/assets/imagens/galeria/clima/MOTEL KORPUS-4749.webp",
        "/assets/imagens/galeria/clima/MOTEL KORPUS-4751.webp",
        "/assets/imagens/galeria/clima/MOTEL KORPUS-4754.webp",
        "/assets/imagens/galeria/clima/MOTEL KORPUS-4756.webp",
        "/assets/imagens/galeria/clima/MOTEL KORPUS-4761.webp",
        "/assets/imagens/galeria/clima/MOTEL KORPUS-4764.webp"
    ],
    prime: [
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-3.webp",
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-16.webp",
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-22.webp",
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-27.webp",
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-36.webp",
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-41.webp",
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-48.webp",
        "/assets/imagens/galeria/prime/MOTEL KORPUS-2-54.webp"
    ],
    acqua: [
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-3.webp",
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-16.webp",
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-22.webp",
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-27.webp",
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-36.webp",
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-41.webp",
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-48.webp",
        "/assets/imagens/galeria/acqua/MOTEL KORPUS-2-54.webp"
    ],
    arabe: [
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2-30.webp",
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2-32.webp",
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2-34.webp",
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2.webp",
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2-11.webp",
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2-19.webp",
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2-23.webp",
        "/assets/imagens/galeria/arabe/MOTEL KORPUS-2-25.webp"
    ],
    absolut: [
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2-30.webp",
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2-32.webp",
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2-34.webp",
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2.webp",
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2-11.webp",
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2-19.webp",
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2-23.webp",
        "/assets/imagens/galeria/absolut/MOTEL KORPUS-2-25.webp"
    ],
    korpus: [
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2-30.webp",
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2-32.webp",
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2-34.webp",
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2.webp",
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2-11.webp",
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2-19.webp",
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2-23.webp",
        "/assets/imagens/galeria/korpus/MOTEL KORPUS-2-25.webp"
    ]
};

const triggers = document.querySelectorAll('.gallery-trigger');
const modal = document.getElementById('gallery-modal');
const closeBtn = document.getElementById('close-gallery');
const nextBtn = document.getElementById('next-gallery');
const prevBtn = document.getElementById('prev-gallery');
const mainImage = document.getElementById('gallery-image');
const counterCurrent = document.getElementById('gallery-counter');
const counterTotal = document.getElementById('gallery-total');
const loader = document.getElementById('gallery-loader');

let currentSuite = '';
let currentIndex = 0;

function openGallery(suite) {
    currentSuite = suite;
    currentIndex = 0;
    
    counterTotal.textContent = galleryData[currentSuite].length;
    
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hidden');
    
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
    });

    loadImage(true); 
}

function closeGallery() {
    modal.classList.add('opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        mainImage.src = '';
    }, 300);
}

function loadImage(isInitialLoad = false) {
    mainImage.classList.add('opacity-0');
    
    if (!isInitialLoad) {
        loader.classList.remove('hidden');
    }
    
    counterCurrent.textContent = currentIndex + 1;

    const delay = isInitialLoad ? 0 : 300;

    setTimeout(() => {
        const img = new Image();
        img.src = galleryData[currentSuite][currentIndex];
        
        img.onload = () => {
            mainImage.src = img.src;
            if (!isInitialLoad) {
                loader.classList.add('hidden');
            }
            
            setTimeout(() => {
                mainImage.classList.remove('opacity-0');
            }, 50);
        };
    }, delay);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryData[currentSuite].length;
    loadImage(false);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryData[currentSuite].length) % galleryData[currentSuite].length;
    loadImage(false);
}

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const suite = trigger.getAttribute('data-suite');
        if (galleryData[suite]) {
            openGallery(suite);
        }
    });
});

closeBtn.addEventListener('click', closeGallery);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGallery();
});

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modal.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
        nextImage();
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
        prevImage();
    }
}