document.addEventListener('DOMContentLoaded', () => {

    const mobileMenu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menuLinks = document.querySelectorAll('.menu-link');
    const menuItems = document.querySelectorAll('.menu-item');
    const navbar = document.getElementById('navbar');
    const closeMenuWrapper = document.getElementById('close-menu-wrapper');

    // Função que calcula a largura exata da barra de rolagem do utilizador
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function openMenu() {
        const scrollbarWidth = getScrollbarWidth();

        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (navbar) navbar.style.paddingRight = `${scrollbarWidth}px`;
        if (closeMenuWrapper) closeMenuWrapper.style.paddingRight = `calc(1.5rem + ${scrollbarWidth}px)`;

        mobileMenu.classList.remove('invisible', 'opacity-0');
        mobileMenu.classList.add('visible', 'opacity-100');

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            menuItems.forEach(item => {
                item.classList.remove('opacity-0', 'translate-y-8');
                item.classList.add('opacity-100', 'translate-y-0');
            });
        }, 50);
    }

    function closeMenu() {
        menuItems.forEach(item => {
            item.classList.remove('opacity-100', 'translate-y-0');
            item.classList.add('opacity-0', 'translate-y-8');
        });

        setTimeout(() => {
            mobileMenu.classList.remove('visible', 'opacity-100');
            mobileMenu.classList.add('invisible', 'opacity-0');

            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            if (navbar) navbar.style.paddingRight = '';
            if (closeMenuWrapper) closeMenuWrapper.style.paddingRight = '';
        }, 500);
    }

    // Eventos de clique
    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Fecha o menu suavemente ao clicar num link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Header: Muda para 80px
            navbar.classList.add('h-[60px]', 'bg-brand-dark/95', 'shadow-2xl');
            navbar.classList.remove('h-[80px]');

            // X Wrapper: Acompanha para 80px garantindo alinhamento
            if (closeMenuWrapper) {
                closeMenuWrapper.classList.add('h-[60px]');
                closeMenuWrapper.classList.remove('h-[80px]');
            }
        } else {
            // Header: Volta para 100px
            navbar.classList.remove('h-[60px]', 'bg-brand-dark/95', 'shadow-2xl');
            navbar.classList.add('h-[80px]');

            // X Wrapper: Acompanha para 100px
            if (closeMenuWrapper) {
                closeMenuWrapper.classList.remove('h-[60px]');
                closeMenuWrapper.classList.add('h-[80px]');
            }
        }
    });

    // --- 3. ANIMAÇÃO DE ENTRADA AO FAZER SCROLL (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });

    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

});