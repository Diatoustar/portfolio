document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const slider = document.querySelector('.hobbies-slider');
    let current = 0;
    let autoSlideInterval = null;
    const AUTO_SLIDE_DELAY = 2000;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    function prevImage() {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
        resetAutoSlide();
    }

    function nextImage() {
        current = (current + 1) % images.length;
        showImage(current);
        resetAutoSlide();
    }

    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Accessibilité clavier : flèches gauche/droite
    slider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
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
            current = (current + 1) % images.length;
            showImage(current);
        }, AUTO_SLIDE_DELAY);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }

    // Initialisation
    showImage(current);
    autoSlide();
}); 