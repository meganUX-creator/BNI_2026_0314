document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const slides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('.side-nav li');

    const observerOptions = {
        root: container,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slides.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');

                const slideIndex = entry.target.id.split('-')[1];
                updateNav(slideIndex);
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-slide');
            const targetSlide = document.getElementById(`slide-${index}`);
            targetSlide.scrollIntoView({ behavior: 'smooth' });
        });
    });

    function updateNav(index) {
        navItems.forEach((item, i) => {
            if (i == index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        const activeContent = document.querySelector('.slide.active .content');
        if (activeContent) {
            activeContent.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});
