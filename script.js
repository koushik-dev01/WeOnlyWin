document.addEventListener("DOMContentLoaded", () => {
    // --- Animated Hamburger & Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Modern Profile Card Slider Logic ---
    const track = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const dotsContainer = document.getElementById('dots-container');
    let currentIndex = 0;
    let slideInterval;

    // Generate Dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        slides.forEach(slide => slide.classList.remove('active-slide'));

        dots[currentIndex].classList.add('active');
        slides[currentIndex].classList.add('active-slide');
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();


    // --- Video Intersection Observer (Play on Scroll) ---
    const video = document.getElementById('promo-video');
    let hasFinishedOnce = false;

    // When the video finishes playing completely, flag it so it stops auto-playing
    video.addEventListener('ended', () => {
        hasFinishedOnce = true;
    });

    // Set up the observer to watch when the video enters/leaves the screen
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the video is on screen and hasn't finished its one-time play yet
                if (!hasFinishedOnce) {
                    // Attempt to play the video
                    let playPromise = video.play();

                    // Catch browser errors (Browsers often block unmuted autoplay)
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Autoplay with sound blocked by browser. User must click play.");
                        });
                    }
                }
            } else {
                // If the video scrolls out of view, pause it
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.5 // Triggers when 50% of the video is visible on screen
    });

    // Start watching the video element
    if (video) {
        videoObserver.observe(video);
    }


    // --- Pre-fill Contact Form on Order Now click ---
    const orderBtns = document.querySelectorAll('a[href="#contact"]');
    const productSelect = document.getElementById('product');

    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            if (productName) {
                for (let i = 0; i < productSelect.options.length; i++) {
                    if (productSelect.options[i].value === productName) {
                        productSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });

    // --- Form Submission Handling ---
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Thank you, ${name}. Your order request has been received. We will contact you shortly to confirm payment and shipping.`);
        contactForm.reset();
    });
});