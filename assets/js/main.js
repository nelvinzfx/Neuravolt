(function initPreloader() {
  const body = document.body;
  if (body && !body.classList.contains('preloading')) {
    body.classList.add('preloading');
  }

  window.__preloaderDone = false;

  const preloaderEl = document.getElementById('preloader');

  if (!preloaderEl) {
    body?.classList.remove('preloading');
    window.__preloaderDone = true;
    return;
  }

  let hasFinished = false;
  const finishPreloader = () => {
    if (hasFinished) return;
    hasFinished = true;
    preloaderEl.classList.add('fade-out');
    setTimeout(() => preloaderEl.remove(), 650);
    body?.classList.remove('preloading');

    if (!window.__preloaderDone) {
      window.__preloaderDone = true;
      window.dispatchEvent(new CustomEvent('preloader:done'));
    }
  };

  const handleLoad = () => {
    setTimeout(finishPreloader, 150);
  };

  if (document.readyState === 'complete') {
    handleLoad();
  } else {
    window.addEventListener('load', handleLoad, { once: true });
  }

  const fallback = setTimeout(finishPreloader, 5000);
  window.addEventListener('preloader:done', () => clearTimeout(fallback), { once: true });
})();

(function initNeuraVoltApp() {
  const safeExec = (fn) => {
    try {
      fn();
    } catch (error) {
      console.error('[NeuraVolt] UI module error:', error);
    }
  };

  document.addEventListener('alpine:init', () => {

    Alpine.data('testimonialCarousel', () => ({
      active: 0,
      autoplayInterval: null,
      isTransitioning: false,
      isPaused: false,
      isDragging: false,
      startX: 0,
      currentX: 0,
      dragOffset: 0,
      items: [
        {
          segment: 'Content Creator',
          title: 'PixelNorth Media',
          subtitle: 'Setup editing 4K & audio monitoring',
          quote: '"Laptop dan speaker referensi tiba dengan template project kami. Re-render footage 4K jadi 35% lebih cepat tanpa crash."',
          author: 'Intan',
          role: 'Lead Editor · Jakarta',
        },
        {
          segment: 'Smart Home Enthusiast',
          title: 'Sora Family',
          subtitle: 'Paket sensor keamanan & lampu Matter',
          quote: '"Tim NeuraVolt mapping tiap ruangan, lalu install sensor & hub dalam satu sore. Semua notifikasi sudah routing ke iPhone & Google Nest."',
          author: 'Kenji',
          role: 'Homeowner · Tangerang',
        },
        {
          segment: 'Corporate IT',
          title: 'Axis Metrics',
          subtitle: 'Workstation finance dengan imaging Windows',
          quote: '"Setiap unit diberi label aset dan join domain sebelum dikirim. Deployment 25 analis selesai sebelum siklus laporan bulanan."',
          author: 'Bagas',
          role: 'IT Infrastructure Lead · Surabaya',
        },
      ],
      init() {
        this.startAutoplay();
      },
      startAutoplay() {
        this.autoplayInterval = setInterval(() => {
          if (!this.isPaused && !this.isTransitioning && !this.isDragging) {
            this.next();
          }
        }, 8000);
      },
      stopAutoplay() {
        if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
          this.autoplayInterval = null;
        }
      },
      pauseAutoplay() {
        this.isPaused = true;
      },
      resumeAutoplay() {
        this.isPaused = false;
      },
      startDrag(event) {
        this.isDragging = true;
        this.startX = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
        this.currentX = this.startX;
      },
      onDrag(event) {
        if (!this.isDragging) return;
        event.preventDefault();
        this.currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
        this.dragOffset = this.currentX - this.startX;
      },
      endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;

        if (Math.abs(this.dragOffset) > 50) {
          if (this.dragOffset > 0) {
            this.prev();
          } else {
            this.next();
          }
        }

        this.dragOffset = 0;
      },
      setActive(index) {
        if (this.isTransitioning || index === this.active) return;
        this.isTransitioning = true;
        this.active = index;
        setTimeout(() => {
          this.isTransitioning = false;
        }, 1200);
      },
      next() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.active = (this.active + 1) % this.items.length;
        setTimeout(() => {
          this.isTransitioning = false;
        }, 1200);
      },
      prev() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.active = (this.active - 1 + this.items.length) % this.items.length;
        setTimeout(() => {
          this.isTransitioning = false;
        }, 1200);
      },
      destroy() {
        this.stopAutoplay();
      },
    }));

    Alpine.data('orderSimulator', () => ({
      packageList: [
        {
          key: 'creator',
          tag: 'Creator',
          name: 'Creator Mobile Suite',
          price: 18500000,
          timeline: 'Siap kirim 2 hari',
          desc: 'Laptop OLED 14", dock Thunderbolt, dan SSD eksternal untuk workflow editing.',
          includes: ['Laptop i7/32GB/1TB', 'Dock TB4 + 90W adaptor', 'SSD NVMe 2TB'],
          support: 'Termasuk instalasi Adobe + preset custom',
          recommendation: 'Ideal untuk editor & motion designer mobile',
        },
        {
          key: 'smart',
          tag: 'Smart Home',
          name: 'Neura Home Starter',
          price: 6500000,
          timeline: 'Siap kirim 1 hari',
          desc: 'Paket lampu, sensor, dan hub Matter untuk mengotomasi ruangan utama.',
          includes: ['4 lampu pintar Matter', 'Sensor pintu+gerak', 'Smart hub + adaptor'],
          support: 'Pendampingan set-up via video call 45 menit',
          recommendation: 'Pas untuk apartemen atau toko ritel kecil',
        },
        {
          key: 'audio',
          tag: 'Audio',
          name: 'Work Pod Audio Pack',
          price: 9200000,
          timeline: 'Siap kirim 3 hari',
          desc: 'Speaker monitor near-field, interface USB-C, dan headphone ANC.',
          includes: ['Pair monitor 5"', 'Audio interface 2 in/2 out', 'Headphone ANC + case'],
          support: 'Kalibrasi ruangan & routing kabel rapi',
          recommendation: 'Cocok untuk podcaster dan ruang meeting hybrid',
        },
      ],
      addonList: [
        { key: 'warranty', label: 'Perpanjangan Garansi 1 Tahun', price: 1150000, desc: 'Tambahan perlindungan resmi + service onsite.' },
        { key: 'onsite', label: 'Onsite Setup Jabodetabek', price: 850000, desc: 'Teknisi datang untuk instalasi & penataan kabel.' },
        { key: 'calib', label: 'Kalibrasi Warna/Audio Pro', price: 650000, desc: 'Profil monitor & tuning speaker sesuai ruangan.' },
      ],
      selectedPackage: 'creator',
      selectedAddons: [],
      campaigns: 1,
      formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
      },
      setPackage(key) {
        this.selectedPackage = key;
      },
      get package() {
        return this.packageList.find((item) => item.key === this.selectedPackage) ?? this.packageList[0];
      },
      get addonTotal() {
        return this.selectedAddons.reduce((sum, key) => {
          const addon = this.addonList.find((item) => item.key === key);
          return sum + (addon ? addon.price : 0);
        }, 0);
      },
      get selectedAddonDetails() {
        return this.addonList.filter((item) => this.selectedAddons.includes(item.key));
      },
      get campaignCost() {
        return this.package.price * Math.max(this.campaigns, 0);
      },
      get total() {
        return this.campaignCost + this.addonTotal;
      },
      get impactNote() {
        if (this.campaigns >= 4) {
          return 'Pesanan proyek > 4 unit kami jadwalkan dengan tim instalasi khusus agar lebih hemat ongkir.';
        }
        return `${this.package.recommendation} • Estimasi kirim ${this.package.timeline.toLowerCase()}.`;
      },
    }));

    Alpine.data('galleryModal', () => ({
      items: [
        {
          title: 'Fluxbook 14 OLED',
          category: 'Laptop',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
          desc: 'Laptop 14" dengan layar OLED 120Hz dan port Thunderbolt yang sudah diinstal software kreatif.',
        },
        {
          title: 'Pulse ANC Headphone',
          category: 'Audio',
          image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
          desc: 'Headphone noise cancelling dengan mode multi-point dan dukungan spatial audio.',
        },
        {
          title: 'Nebula Smart Speaker',
          category: 'Smart Home',
          image: 'https://images.unsplash.com/photo-1484704849700-4f3f18b9c4c4?auto=format&fit=crop&w=900&q=80',
          desc: 'Speaker pintar dengan dukungan Matter dan kualitas suara 360° untuk ruang keluarga.',
        },
        {
          title: 'Luminous Monitor 27"',
          category: 'Display',
          image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=900&q=80',
          desc: 'Monitor 27 inci mini-LED yang sudah dikalibrasi sRGB dan DCI-P3 dengan laporan Delta E.',
        },
        {
          title: 'Aether Mechanical Keyboard',
          category: 'Accessories',
          image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80',
          desc: 'Keyboard hot-swap dengan switch tactile silent dan keycaps PBT double shot.',
        },
        {
          title: 'HaloCam Security Kit',
          category: 'IoT',
          image: 'https://images.unsplash.com/photo-1484704849700-74c91c39c8d3?auto=format&fit=crop&w=900&q=80',
          desc: 'Paket kamera keamanan 2K dengan penyimpanan lokal dan integrasi cloud otomatis.',
        },
      ],
      show: false,
      selected: {},
      openModal(item) {
        this.selected = item;
        this.show = true;
        this.$nextTick(() => {
          if (this.$refs.modalContent) {
            this.$refs.modalContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.$refs.modalContent.focus({ preventScroll: true });
          }
        });
      },
      closeModal() {
        this.show = false;
      },
    }));

    Alpine.data('catalogOrder', () => ({
      packages: [
        {
          name: 'Voltbook Air Bundle',
          tag: 'Laptop',
          timeline: 'Siap kirim 2 hari',
          desc: 'Ultrabook 14" + dock Thunderbolt dan instalasi software kerja siap pakai.',
          price: 'Rp18,5 jt',
          features: ['OLED 120Hz + i7/32GB', 'Dock TB4 + charger travel', 'Garansi resmi + setup akun'],
        },
        {
          name: 'Smart Living Starter',
          tag: 'Smart Home',
          timeline: 'Siap kirim 1 hari',
          desc: 'Lampu pintar, sensor gerak, dan smart hub yang langsung kompatibel Matter.',
          price: 'Rp6,5 jt',
          features: ['4 lampu pintar', 'Sensor gerak + pintu', 'Hub Matter + panduan setup'],
        },
        {
          name: 'Pro Audio Pod',
          tag: 'Audio',
          timeline: 'Siap kirim 3 hari',
          desc: 'Speaker monitor 5", interface USB-C, dan headphone ANC untuk ruang podcast.',
          price: 'Rp9,2 jt',
          features: ['Monitor 5" sepasang', 'Audio interface 2x2', 'Headphone ANC + case hard'],
        },
      ],
      modalOpen: false,
      submitted: false,
      selected: {},
      form: {
        name: '',
        email: '',
        phone: '',
        notes: '',
      },
      order(item) {
        this.selected = item;
        this.modalOpen = true;
        this.submitted = false;
        this.$nextTick(() => {
          if (this.$refs.orderModal) {
            this.$refs.orderModal.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.$refs.orderModal.focus({ preventScroll: true });
          }
        });
      },
      close() {
        this.modalOpen = false;
      },
      submit() {
        this.submitted = true;
        setTimeout(() => {
          this.close();
        }, 2500);
        this.form = { name: '', email: '', phone: '', notes: '' };
      },
    }));

    Alpine.data('contactForm', () => ({
      email: '',
      message: '',
      submit() {
        this.message = 'Terima kasih! Price list & jadwal demo akan kami kirim segera.';
        this.email = '';
        setTimeout(() => {
          this.message = '';
        }, 3200);
      },
    }));
  });

  document.addEventListener('DOMContentLoaded', () => {
    safeExec(() => {
      const revealElements = document.querySelectorAll('[data-animate]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.25,
      });
      revealElements.forEach((el) => observer.observe(el));
    });

    safeExec(() => {
      if (window.gsap) {
        gsap.from('.hero-highlight', {
          duration: 1.2,
          y: 30,
          opacity: 0,
          ease: 'power3.out',
        });

        gsap.to('.orb-floating', {
          duration: 8,
          y: 30,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    safeExec(initHeroTyping);
  });

  const startCounterAnimation = () => {
    setTimeout(() => {
      const animateValue = (id, start, end, duration, prefix = '', suffix = '') => {
        const el = document.getElementById(id);
        if (!el) return;

        const range = end - start;
        const safeRange = Math.max(1, Math.abs(range));
        const increment = end > start ? 1 : -1;
        const stepTime = Math.max(10, Math.floor(duration / safeRange));
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          el.textContent = `${prefix}${current}${suffix}`;
          if (current === end) {
            clearInterval(timer);
          }
        }, stepTime);
      };

      animateValue('counter-1', 0, 12, 1400);
      animateValue('counter-2', 0, 4200, 900);
      animateValue('counter-3', 0, 98, 1600);
    }, 300);
  };

  if (window.__preloaderDone) {
    startCounterAnimation();
  } else {
    window.addEventListener('preloader:done', startCounterAnimation, { once: true });
  }

  function initHeroTyping() {
    const heroEl = document.querySelector('[data-hero-typing]');
    if (!heroEl) return;

    const fallbackSpan = heroEl.querySelector('[data-hero-fallback]');
    const outputSpan = heroEl.querySelector('[data-hero-output]');
    const cursorEl = heroEl.querySelector('.typing-cursor');

    const prefix = heroEl.getAttribute('data-prefix') ?? '';
    const highlight = heroEl.getAttribute('data-highlight') ?? '';
    const suffix = heroEl.getAttribute('data-suffix') ?? '';
    const highlightClass = heroEl.getAttribute('data-highlight-class') ?? 'hero-gradient';
    const typingSpeed = Number(heroEl.getAttribute('data-typing-speed')) || 45;
    const totalLength = prefix.length + highlight.length + suffix.length;

    if (!outputSpan || totalLength === 0) return;

    let typedPrefix = outputSpan.querySelector('[data-typed-prefix]');
    let typedHighlight = outputSpan.querySelector('[data-typed-highlight]');
    let typedSuffix = outputSpan.querySelector('[data-typed-suffix]');

    if (!typedPrefix || !typedHighlight || !typedSuffix) {
      outputSpan.innerHTML = '';
      typedPrefix = document.createElement('span');
      typedPrefix.dataset.typedPrefix = '';
      typedHighlight = document.createElement('span');
      typedHighlight.dataset.typedHighlight = '';
      typedHighlight.className = highlightClass;
      typedSuffix = document.createElement('span');
      typedSuffix.dataset.typedSuffix = '';
      outputSpan.append(typedPrefix, typedHighlight, typedSuffix);
    }

    let typedLength = 0;
    let intervalId = null;

    const applySegments = (length) => {
      const safeLength = Math.max(0, Math.min(length, totalLength));
      let remaining = safeLength;

      const prefixTyped = prefix.slice(0, Math.min(remaining, prefix.length));
      remaining = Math.max(remaining - prefix.length, 0);

      const highlightTyped = highlight.slice(0, Math.min(remaining, highlight.length));
      remaining = Math.max(remaining - highlight.length, 0);

      const suffixTyped = suffix.slice(0, Math.min(remaining, suffix.length));

      typedPrefix.textContent = prefixTyped;
      typedHighlight.textContent = highlightTyped;
      typedSuffix.textContent = suffixTyped;
    };

    const toggleCursor = (visible) => {
      if (!cursorEl) return;
      cursorEl.style.opacity = visible ? '1' : '0';
    };

    const startTyping = () => {
      typedLength = 0;
      applySegments(typedLength);
      toggleCursor(true);
      if (fallbackSpan) {
        fallbackSpan.style.opacity = '0';
        fallbackSpan.style.display = 'none';
      }
      outputSpan.style.opacity = '1';

      intervalId = setInterval(() => {
        typedLength += 1;
        applySegments(typedLength);
        if (typedLength >= totalLength) {
          clearInterval(intervalId);
          applySegments(totalLength);
          toggleCursor(false);
        }
      }, typingSpeed);
    };

    applySegments(totalLength);
    toggleCursor(false);
    outputSpan.style.opacity = '0';
    if (fallbackSpan) {
      fallbackSpan.style.opacity = '1';
      fallbackSpan.style.display = 'inline';
    }

    if (window.__preloaderDone) {
      startTyping();
    } else {
      window.addEventListener('preloader:done', startTyping, { once: true });
    }
  }
})();
