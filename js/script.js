document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // 1. PROGRESS BAR ANIMATION (Menggunakan IntersectionObserver)
    // ===========================================
    
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');

    // Fungsi untuk memulai animasi
    function animateProgressBars(entries, observer) {
        entries.forEach(entry => {
            // Cek apakah section skills sudah terlihat (isIntersecting)
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const target = bar.getAttribute('data-target');
                    // Atur lebar sesuai data-target. Transisi CSS akan membuat animasi.
                    bar.style.width = target + '%';
                });
                // Hentikan pengamatan setelah animasi dimulai
                observer.unobserve(entry.target);
            }
        });
    }

    // Opsi Intersection Observer
    const skillObserverOptions = {
        root: null, // Viewport
        threshold: 0.5 // Memicu ketika 50% section terlihat
    };

    // Inisialisasi Intersection Observer
    const skillObserver = new IntersectionObserver(animateProgressBars, skillObserverOptions);

    // Mulai mengamati section skills
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }


    // ===========================================
    // 2. SCROLL SPY (Highlighting Navigasi Aktif)
    // ===========================================
    
    const sections = document.querySelectorAll('.section-padding');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Fungsi untuk menandai link aktif
    function highlightActiveLink(entries, observer) {
        entries.forEach(entry => {
            // Jika section aktif (visible)
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Hapus kelas 'active' dari semua link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Tambahkan kelas 'active' pada link yang sesuai dengan sectionId
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Opsi Intersection Observer untuk Scroll Spy
    const spyObserverOptions = {
        root: null,
        // Margin atas dan bawah (rootMargin) untuk mengatur zona aktif
        rootMargin: '-30% 0px -50% 0px', 
        threshold: 0 // Tidak perlu threshold tinggi karena kita pakai rootMargin
    };

    // Inisialisasi dan mulai pengamatan
    const spyObserver = new IntersectionObserver(highlightActiveLink, spyObserverOptions);
    sections.forEach(section => {
        spyObserver.observe(section);
    });

// ... (Lanjutan dari kode Scroll Spy & Smooth Scroll) ...

    // ===========================================
    // 4. DARK/LIGHT MODE TOGGLE (dengan localStorage)
    // ===========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Fungsi utama untuk mengatur mode
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.textContent = '🌙'; // Ikon Bulan (Mode Terang Aktif)
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            themeToggle.textContent = '🌞'; // Ikon Matahari (Mode Gelap Aktif)
            localStorage.setItem('theme', 'dark');
        }
    }

    // A. Cek Preferensi yang Tersimpan (atau preferensi sistem) saat memuat halaman
    const savedTheme = localStorage.getItem('theme');
    
    // Cek Media Query untuk deteksi preferensi sistem (Best Practice)
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        // Jika preferensi tersimpan di localStorage, gunakan itu
        applyTheme(savedTheme);
    } else if (!prefersDark) {
        // Jika tidak ada preferensi dan sistem tidak memilih gelap, gunakan terang sebagai default
        applyTheme('light'); 
    } else {
        // Default ke dark (seperti yang sudah diatur di CSS)
        applyTheme('dark');
    }


    // B. Tangani Klik Tombol
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            // Toggle ke tema yang berlawanan
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

});