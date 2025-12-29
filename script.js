// 1. Scroll Fade-in Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// 2. Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        
        if(navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '2rem';
        }
    });
}

// 3. 3D Tilt Effect Logic (New Addition)
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Get the dimensions of the card
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation (max rotation 15deg)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; // Invert axis for natural feel
        const rotateY = ((x - centerX) / centerX) * 15;
        
        // Apply the transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Add a subtle glare/shine effect via box-shadow
        card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0, 242, 96, 0.1)`;
    });

    // Reset card when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.boxShadow = 'none';
    });
});