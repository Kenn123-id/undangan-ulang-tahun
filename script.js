/* ==========================================================================
   CONFIG: BAGIAN INI SANGAT MUDAH DIUBAH UNTUK KLIEN BARU
   ========================================================================== */
   const CONFIG = {
    guestNameFallback: "Valued Guest", // Nama default jika tidak ada parameter URL
    eventDate: "Oct 25, 2026 18:30:00", // Format valid untuk JS Date
    enableConfetti: true,
    whatsappNumber: "6281234567890", // Ganti no WA (tanpa + atau 0 di depan, pakai kode negara)
};

/* ==========================================================================
   1. GET GUEST NAME FROM URL PARAMETER (Misal: ?to=Budi+Santoso)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    const guestElement = document.getElementById('guest-name');
    
    if (guestName && guestElement) {
        // Membersihkan input untuk keamanan sederhana
        const sanitizedName = guestName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        guestElement.innerHTML = sanitizedName;
    } else if (guestElement) {
        guestElement.innerHTML = CONFIG.guestNameFallback;
    }
    document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    const heroButtons = document.querySelectorAll('.hero-buttons .hero-btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            heroButtons.forEach(x => x.classList.remove('clicked'));
            btn.classList.add('clicked');
        });
    });
    // (Opsional) smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
});

window.addEventListener('load', () => {
  // const preloader = document.getElementById('preloader');
  // if (preloader) {
  //     preloader.style.display = 'none';
  //     preloader.style.opacity = '0';
  //     preloader.remove();
  // }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 50,
      duration: 900,
      easing: 'ease-out-cubic',
    });
  }
});

/* ==========================================================================
   3. WELCOME SCREEN, MUSIC & CONFETTI
   ========================================================================== */
const btnOpen = document.getElementById('btn-open');
const welcomeCover = document.getElementById('welcome-cover');
const audio = document.getElementById('bgm');
const musicBtn = document.getElementById('music-control');
let isPlaying = false;

btnOpen.addEventListener('click', () => {
    welcomeCover.classList.add('open');
    document.body.style.overflowY = 'auto'; // Mengaktifkan scroll kembali
    
    playAudio();

    // Trigger Confetti jika diaktifkan di CONFIG
    if(CONFIG.enableConfetti && typeof confetti === "function"){
        setTimeout(() => {
        welcomeCover.style.display = 'none';
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#d4af37', '#ffffff', '#111111']
            });
        }, 1100); // Delay sedikit setelah cover terbuka
    }
});

function playAudio() {
    audio.play();
    isPlaying = true;
    musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    musicBtn.classList.add('playing');
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
    musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    musicBtn.classList.remove('playing');
}

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

/* ==========================================================================
   4. STICKY NAVBAR & MOBILE MENU
   ========================================================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

// Tutup menu mobile saat link diklik
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

/* ==========================================================================
   5. COUNTDOWN TIMER
   ========================================================================== */
const countdownDate = new Date(CONFIG.eventDate).getTime();

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMinutes = document.getElementById('cd-minutes');
const cdSeconds = document.getElementById('cd-seconds');

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.countdown-wrapper').innerHTML = "<h3>The Celebration Has Started!</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format dengan angka 0 di depan jika di bawah 10
    cdDays.innerText = days < 10 ? '0' + days : days;
    cdHours.innerText = hours < 10 ? '0' + hours : hours;
    cdMinutes.innerText = minutes < 10 ? '0' + minutes : minutes;
    cdSeconds.innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);

/* ==========================================================================
   6. GALLERY LIGHTBOX
   ========================================================================== */
const galleryItems = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = item.src;
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});

/* ==========================================================================
   7. COPY TO CLIPBOARD (DIGITAL GIFT)
   ========================================================================== */
const copyBtns = document.querySelectorAll('.btn-copy');
const toast = document.getElementById('toast');

copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast("Copied to clipboard!");
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showToast("Failed to copy!");
        });
    });
});

function showToast(message) {
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ==========================================================================
   8. RSVP & WISHES FORM HANDLING (DEMO LOCALSTORAGE)
   ========================================================================== */
// RSVP Form
const rsvpForm = document.getElementById('rsvp-form');
const rsvpAttendance = document.getElementById('rsvp-attendance');
const guestCountGroup = document.getElementById('guest-count-group');
const rsvpSuccess = document.getElementById('rsvp-success');

// Sembunyikan pilihan jumlah tamu jika tidak hadir
rsvpAttendance.addEventListener('change', (e) => {
    if(e.target.value === 'no') {
        guestCountGroup.classList.add('hidden');
    } else {
        guestCountGroup.classList.remove('hidden');
    }
});

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Di sini Anda bisa menghubungkan ke Google Sheets / Formspree / API Backend
    // Untuk demo template, kita tampilkan alert sukses saja
    rsvpForm.style.display = 'none';
    rsvpSuccess.classList.remove('hidden');
});

// Wishes Form & LocalStorage Logic
const wishesForm = document.getElementById('wishes-form');
const wishesList = document.getElementById('wishes-list');
const WISHES_STORAGE_KEY = 'premium_bday_wishes';

function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY)) || [];
    wishesList.innerHTML = '';
    
    // Tampilkan data Dummy jika kosong
    if(wishes.length === 0) {
        wishesList.innerHTML = `
            <div class="wish-item">
                <h4>Sarah & John</h4>
                <p>Happy birthday Evelyn! May your 17th year be as bright and beautiful as you are. Enjoy your special night!</p>
            </div>
            <div class="wish-item">
                <h4>Michael Chen</h4>
                <p>Happy sweet seventeen! Can't wait to celebrate with you.</p>
            </div>
        `;
        return;
    }

    // Tampilkan data dari localstorage (terbaru di atas)
    wishes.reverse().forEach(wish => {
        const wishEl = document.createElement('div');
        wishEl.classList.add('wish-item');
        // Sanitasi dasar
        const safeName = wish.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeMsg = wish.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        wishEl.innerHTML = `
            <h4>${safeName}</h4>
            <p>${safeMsg}</p>
        `;
        wishesList.appendChild(wishEl);
    });
}

wishesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('wish-name').value;
    const message = document.getElementById('wish-message').value;

    const wishes = JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY)) || [];
    wishes.push({ name, message, date: new Date().toISOString() });
    
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
    
    // Reset Form & Reload list
    wishesForm.reset();
    loadWishes();
    showToast("Your wish has been posted!");
});

// Init load wishes
loadWishes();

/* ==========================================================================
   9. FAQ ACCORDION LOGIC
   ========================================================================== */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        // Tutup yang lain
        accordionItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            }
        });

        // Toggle item yang diklik
        item.classList.toggle('active');
        const content = item.querySelector('.accordion-content');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null;
        }
    });
});