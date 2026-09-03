/* ═══════════════════════════════════════════
   main.js — Pak Din Nasi Dalcha
   Shared scripts for all pages
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Navbar scroll effect ──────────────── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    /* ── Hamburger menu toggle ─────────────── */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
        // Close menu when any nav link is tapped
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('open'));
        });
    }

    /* ── Background video crossfade (plays each video to its full length) ── */
    const bgVideos = document.querySelectorAll('.site-bg-video');

    if (bgVideos.length > 1) {
        let bgIndex = 0;

        function switchToNextBg() {
            bgVideos[bgIndex].classList.remove('active');
            bgIndex = (bgIndex + 1) % bgVideos.length;
            bgVideos[bgIndex].classList.add('active');
            bgVideos[bgIndex].currentTime = 0;
            bgVideos[bgIndex].play().catch(() => {});
        }

        bgVideos.forEach(video => {
            video.addEventListener('ended', switchToNextBg);
        });

        // Make sure only the first video is actually playing at start
        bgVideos.forEach((video, i) => {
            if (i === bgIndex) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });

        // Resume the currently-active video if the tab was hidden and comes back
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                bgVideos[bgIndex].play().catch(() => {});
            }
        });
    }

    /* ── Scroll reveal ─────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => observer.observe(el));
    }
/* ── Video initialization Pak Din Dalca Home Page ─────────────────────── */
window.addEventListener('DOMContentLoaded', function () {
    const wrap = document.getElementById('aboutMedia');
    const poster = document.getElementById('aboutPoster');
    const btn = document.getElementById('aboutPlayBtn');

    const video = document.createElement('video');
    video.className = 'about-image-main';
    video.src = "Pak_Din_Dalcha.mp4";
    video.muted = true;        // required for autoplay in most browsers
    video.autoplay = true;
    video.loop = true;         // optional: keeps it playing on repeat
    video.playsInline = true;
    video.controls = true;     // optional: lets user pause/unmute manually

    poster.remove();
    if (btn) btn.remove();
    wrap.appendChild(video);
});

/* ── Video initialization Pak Din Dalca Menu Page ─────────────────────── */
    // Fallback: guarantee every .reveal element becomes visible,
    // in case main.js's scroll-based detection misses a card
    // (e.g. after its height changes from adding a photo).
    document.addEventListener('DOMContentLoaded', function () {
        var revealEls = document.querySelectorAll('.reveal');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(function (el) { io.observe(el); });

        // Hard fallback: if anything is still hidden after 1.5s, show it anyway
        setTimeout(function () {
            revealEls.forEach(function (el) {
                el.classList.add('visible');
            });
        }, 1500);
    });
    
document.getElementById('scrollTopBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

    /* ── Active nav link on scroll ─────────── */
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks  = document.querySelectorAll('#navMenu a');
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let currentSection = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 120) currentSection = s.id;
            });
            navLinks.forEach(a => {
                const href = a.getAttribute('href');
                a.classList.toggle(
                    'active',
                    href === '#' + currentSection || (currentSection === '' && href === '#')
                );
            });
        });
    }

});