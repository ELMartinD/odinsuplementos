    const verMasButton = document.getElementById('ver-mas');

    function scrollDown() {
        const offersContainer = document.querySelector('#about');
        offersContainer.scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY; // Obtiene la posición del scroll vertical
        const windowHeight = window.innerHeight; // Altura de la ventana

        // Si el scroll supera el 50% de la ventana, oculta el botón
        if (scrollY > windowHeight / 2) {
            verMasButton.classList.add('hidden');
        } else {
            verMasButton.classList.remove('hidden');
        }
    });