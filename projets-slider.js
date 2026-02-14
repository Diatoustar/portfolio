document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.projet-slide');
    const prevBtn = document.querySelector('.projets-slider .slider-btn.prev');
    const nextBtn = document.querySelector('.projets-slider .slider-btn.next');
    const slider = document.querySelector('.projets-slider');
    let current = 0;
    let autoSlideInterval = null;
    const AUTO_SLIDE_DELAY = 3000;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
        resetAutoSlide();
        attachVideoListeners();
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
        resetAutoSlide();
        attachVideoListeners();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Accessibilité clavier : flèches gauche/droite
    slider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Focus automatique sur le slider pour navigation clavier
    slider.addEventListener('focus', function() {
        slider.style.outline = '2px solid #C599B6';
    });
    slider.addEventListener('blur', function() {
        slider.style.outline = 'none';
    });

    function autoSlide() {
        autoSlideInterval = setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
            attachVideoListeners();
        }, AUTO_SLIDE_DELAY);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }

    // Pause auto-slide si une vidéo est en lecture
    function attachVideoListeners() {
        // Détacher d'abord tous les anciens listeners
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.onplay = null;
                video.onpause = null;
                video.onended = null;
            }
        });
        // Attacher sur la vidéo du slide actif
        const activeSlide = slides[current];
        const video = activeSlide.querySelector('video');
        if (video) {
            video.onplay = function() {
                clearInterval(autoSlideInterval);
            };
            video.onpause = function() {
                resetAutoSlide();
            };
            video.onended = function() {
                resetAutoSlide();
            };
        }
    }

    // Initialisation
    showSlide(current);
    autoSlide();
    attachVideoListeners();
}); 