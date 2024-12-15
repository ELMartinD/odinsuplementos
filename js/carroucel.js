let currentIndex = 0;
let items = document.querySelectorAll('.carousel-item');

function nextSlide() {
    // Remover la clase de zoom-out y texto de la imagen anterior
    items[currentIndex].classList.remove('zoom-out');
    const currentText = items[currentIndex].querySelector('.text');
    currentText.style.opacity = 0;
    currentText.style.transform = 'translateY(50px)';

    // Avanzar a la siguiente imagen
    if (currentIndex < items.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    // Agregar la clase de zoom-out a la nueva imagen
    items[currentIndex].classList.add('zoom-out');
    updateCarousel();
    animateText();
}

function prevSlide() {
    // Remover la clase de zoom-out y texto de la imagen anterior
    items[currentIndex].classList.remove('zoom-out');
    const currentText = items[currentIndex].querySelector('.text');
    currentText.style.opacity = 0;
    currentText.style.transform = 'translateY(50px)';

    // Retroceder a la imagen anterior
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - 1;
    }

    // Agregar la clase de zoom-out a la nueva imagen
    items[currentIndex].classList.add('zoom-out');
    updateCarousel();
    animateText();
}

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function animateText() {
    const currentText = items[currentIndex].querySelector('.text');
    currentText.style.opacity = 1;
    currentText.style.transform = 'translateY(0)';
}

function verMas() {
    alert("Ver más clickeado!");
}

setInterval(nextSlide, 10000);  // Cambia de imagen cada 3 segundos
