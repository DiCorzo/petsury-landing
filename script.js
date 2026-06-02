document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navNavigation = document.getElementById('navNavigation');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navNavigation.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (navNavigation.classList.contains('open')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navNavigation.classList.remove('open');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // ==========================================
    // 2. LÓGICA DEL CARRUSEL DE IMÁGENES
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        // Controlar los límites del carrusel para que sea infinito
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remover clases activas
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Añadir clase activa al elemento correspondiente
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Eventos de botones y navegación por puntos
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetTimer();
        });
    });

    // Temporizador para el cambio automático (5 segundos)
    function startTimer() {
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(carouselInterval);
        startTimer();
    }

    // Iniciar temporizador al cargar la página
    startTimer();

    // ==========================================
    // 3. DETECTOR DE ENLACE ACTIVO (SCROLL SPY)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Se resta un margen (160px) para activar el enlace un poco antes de llegar arriba
            if (window.pageYOffset >= (sectionTop - 160)) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    });
});