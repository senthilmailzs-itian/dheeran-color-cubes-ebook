/* ============================================
   Dheeran and Color Cubes — Interactive Ebook
   script.js
   ============================================ */

(function () {
  'use strict';

  /* ── Configuration ── */
  const CONFIG = {
    totalPages: 18, // cover + page1-16 + back
    autoplayInterval: 3000,
    swipeThreshold: 50,
    preloadAhead: 2,
    confettiCount: 150,
    confettiDuration: 4000,
    toastDuration: 2200,
  };

  /* ── Page Definitions ── */
  const PAGES = [
    { src: 'images/cover.png', alt: 'Cover — Dheeran and Color Cubes' },
    { src: 'images/page1.png', alt: 'Page 1' },
    { src: 'images/page2.png', alt: 'Page 2' },
    { src: 'images/page3.png', alt: 'Page 3' },
    { src: 'images/page4.png', alt: 'Page 4' },
    { src: 'images/page5.png', alt: 'Page 5' },
    { src: 'images/page6.png', alt: 'Page 6' },
    { src: 'images/page7.png', alt: 'Page 7' },
    { src: 'images/page8.png', alt: 'Page 8' },
    { src: 'images/page9.png', alt: 'Page 9' },
    { src: 'images/page10.png', alt: 'Page 10' },
    { src: 'images/page11.png', alt: 'Page 11' },
    { src: 'images/page12.png', alt: 'Page 12' },
    { src: 'images/page13.png', alt: 'Page 13' },
    { src: 'images/page14.png', alt: 'Page 14' },
    { src: 'images/page15.png', alt: 'Page 15' },
    { src: 'images/page16.png', alt: 'Page 16' },
    { src: 'images/back.png', alt: 'Back Cover' },
  ];

  /* ── Appreciation Messages (shown after each page turn) ── */
  const APPRECIATION_MESSAGES = [
    "Great start! 🌟",
    "Awesome! Keep reading! 📖",
    "You're doing great! ⭐",
    "Wonderful! What happens next? 🤩",
    "Super reader! 🦸",
    "Amazing! Keep going! 🚀",
    "Fantastic! 🎨",
    "Brilliant! You're halfway! 🌈",
    "Spectacular! 💫",
    "You're a star reader! ⭐",
    "Incredible! Almost there! 🏆",
    "So exciting! 🎉",
    "Marvelous! 🌺",
    "Keep turning! Magic awaits! ✨",
    "Outstanding! 🎯",
    "Almost done! You're brave! 💪",
    "Last page! You made it! 🥳",
  ];

  /* ── Final Page Celebration Message ── */
  const FINAL_MESSAGE = `🎉 Congratulations, Super Reader! 🎉\n\nYou finished the whole book!\nYou are amazing and brave\njust like Dheeran! 🌟\n\n⭐ Keep reading, keep dreaming! ⭐`;

  /* ── State ── */
  let currentPage = 0;
  let isAutoplay = false;
  let autoplayTimer = null;
  let isZoomed = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let swipeHintTimeout = null;
  let loadedImages = new Set();
  let confettiAnimationId = null;
  let toastTimer = null;

  /* ── DOM References ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const loadingScreen = $('#loading-screen');
  const pageWrapper = $('#page-wrapper');
  const pageIndicator = $('#page-indicator');
  const progressFill = $('#progress-fill');
  const btnPrev = $('#btn-prev');
  const btnNext = $('#btn-next');
  const btnAutoplay = $('#btn-autoplay');
  const readAgainContainer = $('#read-again-container');
  const readAgainBtn = $('#read-again-btn');
  const confettiCanvas = $('#confetti-canvas');
  const swipeHint = $('#swipe-hint');
  const fullscreenBtn = $('#fullscreen-btn');
  const appreciationToast = $('#appreciation-toast');
  const finalCelebration = $('#final-celebration');
  const finalMessageEl = $('#final-message');
  const confettiCtx = confettiCanvas.getContext('2d');

  /* ── Initialize ── */
  function init() {
    createBackgroundShapes();
    createPageElements();
    preloadImages(0);
    updateUI();
    bindEvents();
    showSwipeHint();
    resizeConfettiCanvas();

    // Hide loading screen after initial images are ready
    const coverImg = new Image();
    coverImg.onload = coverImg.onerror = () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 800);
    };
    coverImg.src = PAGES[0].src;
  }

  /* ── Background Floating Shapes ── */
  function createBackgroundShapes() {
    const container = $('#bg-shapes');
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#F472B6', '#60A5FA', '#34D399', '#FBBF24'];
    const shapeCount = window.innerWidth < 768 ? 12 : 20;

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      shape.classList.add('bg-shape', 'bg-shape--cube');
      const size = Math.random() * 30 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 10 + 8;
      const delay = Math.random() * -20;
      const rotation = Math.random() * 360;

      shape.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${x}%;
        top: ${y}%;
        transform: rotate(${rotation}deg);
        animation: ${Math.random() > 0.5 ? 'floatShape' : 'floatShapeSlow'} ${duration}s ease-in-out ${delay}s infinite;
        border-radius: ${Math.random() > 0.5 ? '8px' : '50%'};
      `;
      container.appendChild(shape);
    }
  }

  /* ── Page Element Creation ── */
  function createPageElements() {
    PAGES.forEach((page, index) => {
      const pageDiv = document.createElement('div');
      pageDiv.classList.add('page');
      pageDiv.id = `page-${index}`;
      pageDiv.dataset.index = index;

      // Add spinner
      const spinner = document.createElement('div');
      spinner.classList.add('page-spinner');
      pageDiv.appendChild(spinner);

      // Page position class
      if (index === 0) pageDiv.classList.add('active');
      else pageDiv.classList.add('next');

      pageDiv.addEventListener('click', handlePageTap);
      pageWrapper.appendChild(pageDiv);
    });
  }

  /* ── Lazy Loading ── */
  function preloadImages(startIndex) {
    for (let i = startIndex; i < Math.min(startIndex + CONFIG.preloadAhead + 1, PAGES.length); i++) {
      loadImage(i);
    }
  }

  function loadImage(index) {
    if (index < 0 || index >= PAGES.length || loadedImages.has(index)) return;

    const page = PAGES[index];
    const pageDiv = $(`#page-${index}`);
    const spinner = pageDiv.querySelector('.page-spinner');

    const img = new Image();
    img.alt = page.alt;
    img.draggable = false;

    // Try PNG first, then SVG fallback for placeholder pages
    img.onload = () => {
      loadedImages.add(index);
      pageDiv.insertBefore(img, spinner);
      if (spinner) spinner.classList.add('hidden');
    };

    img.onerror = () => {
      // Try SVG fallback
      const svgSrc = page.src.replace('.png', '.svg');
      const imgSvg = new Image();
      imgSvg.alt = page.alt;
      imgSvg.draggable = false;
      imgSvg.onload = () => {
        loadedImages.add(index);
        pageDiv.insertBefore(imgSvg, spinner);
        if (spinner) spinner.classList.add('hidden');
      };
      imgSvg.onerror = () => {
        // Generate a colorful placeholder
        loadedImages.add(index);
        const placeholder = createPlaceholder(index);
        pageDiv.insertBefore(placeholder, spinner);
        if (spinner) spinner.classList.add('hidden');
      };
      imgSvg.src = svgSrc;
    };

    img.src = page.src;
  }

  function createPlaceholder(index) {
    const colors = [
      ['#FF6B6B', '#FF8E8E'], ['#4ECDC4', '#6FE7DE'], ['#FFE66D', '#FFF09B'],
      ['#A78BFA', '#C4B5FD'], ['#F472B6', '#F9A8D4'], ['#60A5FA', '#93C5FD'],
      ['#34D399', '#6EE7B7'], ['#FBBF24', '#FCD34D'], ['#FB923C', '#FDBA74'],
      ['#E879F9', '#F0ABFC'], ['#38BDF8', '#7DD3FC'], ['#4ADE80', '#86EFAC'],
      ['#F87171', '#FCA5A5'], ['#818CF8', '#A5B4FC'], ['#2DD4BF', '#5EEAD4'],
      ['#FACC15', '#FDE047'], ['#FB7185', '#FDA4AF'], ['#A78BFA', '#C4B5FD'],
    ];

    const [c1, c2] = colors[index % colors.length];
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 600, 800);
    grad.addColorStop(0, c1 + '40');
    grad.addColorStop(1, c2 + '60');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 800);

    // Floating cubes
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 60 + 20;
      const x = Math.random() * 540;
      const y = Math.random() * 740;
      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      ctx.rotate(Math.random() * Math.PI);
      ctx.fillStyle = (Math.random() > 0.5 ? c1 : c2) + '80';
      ctx.shadowColor = c1 + '40';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      roundRect(ctx, -size / 2, -size / 2, size, size, size * 0.15);
      ctx.fill();
      ctx.restore();
    }

    // Label
    ctx.fillStyle = c1;
    ctx.font = 'bold 36px "Baloo 2", cursive';
    ctx.textAlign = 'center';
    const label = index === 0 ? '📖 Cover' : index === PAGES.length - 1 ? '📕 The End' : `📄 Page ${index}`;
    ctx.fillText(label, 300, 420);

    const img = new Image();
    img.src = canvas.toDataURL();
    img.alt = PAGES[index].alt;
    img.draggable = false;
    return img;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }

  /* ── Navigation ── */
  function goToPage(newPage, direction) {
    if (newPage < 0 || newPage >= CONFIG.totalPages || newPage === currentPage) return;

    const oldPageDiv = $(`#page-${currentPage}`);
    const newPageDiv = $(`#page-${newPage}`);

    // Remove zoom
    if (isZoomed) {
      oldPageDiv.classList.remove('zoomed');
      isZoomed = false;
    }

    // Determine animation direction
    const goingForward = direction === 'next' || (direction === undefined && newPage > currentPage);

    // Set transform-origin for book flip direction
    if (goingForward) {
      oldPageDiv.style.transformOrigin = 'left center';
      newPageDiv.style.transformOrigin = 'right center';
    } else {
      oldPageDiv.style.transformOrigin = 'right center';
      newPageDiv.style.transformOrigin = 'left center';
    }

    // Position new page off-screen
    newPageDiv.classList.remove('prev', 'next', 'active');
    newPageDiv.classList.add(goingForward ? 'next' : 'prev');

    // Force reflow
    void newPageDiv.offsetWidth;

    // Animate
    requestAnimationFrame(() => {
      oldPageDiv.classList.remove('active');
      oldPageDiv.classList.add(goingForward ? 'prev' : 'next');
      newPageDiv.classList.remove('prev', 'next');
      newPageDiv.classList.add('active');
    });

    const prevPage = currentPage;
    currentPage = newPage;
    preloadImages(currentPage);
    updateUI();

    // Show appreciation toast when moving forward (except from cover)
    if (goingForward && prevPage > 0 && currentPage < CONFIG.totalPages - 1) {
      const msgIndex = Math.min(prevPage - 1, APPRECIATION_MESSAGES.length - 1);
      showAppreciation(APPRECIATION_MESSAGES[msgIndex]);
    }

    // Last page experience
    if (currentPage === CONFIG.totalPages - 1) {
      triggerLastPageExperience();
    } else {
      readAgainContainer.classList.remove('visible');
      finalCelebration.classList.remove('visible');
    }
  }

  function nextPage() {
    if (currentPage < CONFIG.totalPages - 1) {
      goToPage(currentPage + 1, 'next');
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      goToPage(currentPage - 1, 'prev');
    }
  }

  function goToStart() {
    stopAutoplay();
    // Reset all pages
    $$('.page').forEach((p, i) => {
      p.classList.remove('active', 'prev', 'next', 'zoomed');
      p.style.transformOrigin = '';
      if (i === 0) p.classList.add('active');
      else p.classList.add('next');
    });
    currentPage = 0;
    isZoomed = false;
    readAgainContainer.classList.remove('visible');
    finalCelebration.classList.remove('visible');
    clearConfetti();
    updateUI();
  }

  /* ── UI Updates ── */
  function updateUI() {
    // Page indicator
    pageIndicator.textContent = `⭐ Page ${currentPage + 1} of ${CONFIG.totalPages} ⭐`;

    // Button states
    btnPrev.disabled = currentPage === 0;
    btnNext.disabled = currentPage === CONFIG.totalPages - 1;

    // Progress bar
    const progress = ((currentPage + 1) / CONFIG.totalPages) * 100;
    progressFill.style.width = `${progress}%`;
  }

  /* ── Appreciation Toast ── */
  function showAppreciation(message) {
    // Clear any existing toast
    clearTimeout(toastTimer);
    appreciationToast.classList.remove('show');

    // Force reflow to restart animation
    void appreciationToast.offsetWidth;

    appreciationToast.textContent = message;
    appreciationToast.classList.add('show');

    toastTimer = setTimeout(() => {
      appreciationToast.classList.remove('show');
    }, CONFIG.toastDuration);
  }

  /* ── Page Tap / Zoom ── */
  function handlePageTap(e) {
    // Ignore if swiping
    if (Math.abs(touchEndX - touchStartX) > 10) return;

    const pageDiv = e.currentTarget;
    if (isZoomed) {
      pageDiv.classList.remove('zoomed');
      isZoomed = false;
    } else {
      pageDiv.classList.add('zoomed');
      isZoomed = true;
    }
  }

  /* ── Autoplay ── */
  function toggleAutoplay() {
    if (isAutoplay) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function startAutoplay() {
    isAutoplay = true;
    btnAutoplay.classList.add('playing');
    btnAutoplay.innerHTML = '⏸ Pause';
    autoplayTimer = setInterval(() => {
      if (currentPage < CONFIG.totalPages - 1) {
        nextPage();
      } else {
        stopAutoplay();
      }
    }, CONFIG.autoplayInterval);
  }

  function stopAutoplay() {
    isAutoplay = false;
    clearInterval(autoplayTimer);
    autoplayTimer = null;
    btnAutoplay.classList.remove('playing');
    btnAutoplay.innerHTML = '▶ Play';
  }

  /* ── Touch / Swipe ── */
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }

  function handleSwipe() {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > CONFIG.swipeThreshold) {
      if (diffX > 0) {
        nextPage(); // Swipe left → next
      } else {
        prevPage(); // Swipe right → prev
      }
      hideSwipeHint();
    }
  }

  /* ── Swipe Hint ── */
  function showSwipeHint() {
    if ('ontouchstart' in window) {
      swipeHintTimeout = setTimeout(() => {
        swipeHint.classList.add('visible');
        setTimeout(() => {
          swipeHint.classList.remove('visible');
          swipeHint.classList.add('hidden');
        }, 4000);
      }, 2000);
    }
  }

  function hideSwipeHint() {
    clearTimeout(swipeHintTimeout);
    swipeHint.classList.remove('visible');
    swipeHint.classList.add('hidden');
  }

  /* ── Keyboard Navigation ── */
  function handleKeydown(e) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextPage();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        prevPage();
        break;
      case ' ':
        e.preventDefault();
        toggleAutoplay();
        break;
      case 'Home':
        e.preventDefault();
        goToStart();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  }

  /* ── Fullscreen ── */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      fullscreenBtn.innerHTML = '⊡';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = '⛶';
    }
  }

  /* ── Confetti ── */
  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  function triggerLastPageExperience() {
    readAgainContainer.classList.add('visible');

    // Show final celebration message
    finalMessageEl.innerHTML = FINAL_MESSAGE.replace(/\n/g, '<br>');
    finalCelebration.classList.add('visible');

    // Show special last-page toast
    showAppreciation("🏆 You finished the book! 🏆");

    launchConfetti();
  }

  function launchConfetti() {
    clearConfetti();

    const particles = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#F472B6', '#60A5FA', '#34D399', '#FBBF24', '#FB923C', '#E879F9'];

    for (let i = 0; i < CONFIG.confettiCount; i++) {
      particles.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        opacity: 1,
      });
    }

    const startTime = Date.now();

    function animateConfetti() {
      const elapsed = Date.now() - startTime;
      const fadeStart = CONFIG.confettiDuration * 0.7;

      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / (CONFIG.confettiDuration - fadeStart));
        }

        confettiCtx.save();
        confettiCtx.globalAlpha = p.opacity;
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = p.color;

        if (p.shape === 'rect') {
          confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          confettiCtx.beginPath();
          confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          confettiCtx.fill();
        }
        confettiCtx.restore();

        // Wrap around
        if (p.y > confettiCanvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * confettiCanvas.width;
        }
      });

      if (elapsed < CONFIG.confettiDuration) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
      } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }

    confettiAnimationId = requestAnimationFrame(animateConfetti);
  }

  function clearConfetti() {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
    }
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }

  /* ── Event Bindings ── */
  function bindEvents() {
    btnPrev.addEventListener('click', () => { prevPage(); stopAutoplay(); });
    btnNext.addEventListener('click', () => { nextPage(); stopAutoplay(); });
    btnAutoplay.addEventListener('click', toggleAutoplay);
    readAgainBtn.addEventListener('click', goToStart);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Touch events on page wrapper
    pageWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    pageWrapper.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Keyboard
    document.addEventListener('keydown', handleKeydown);

    // Resize
    window.addEventListener('resize', resizeConfettiCanvas);

    // Fullscreen change
    document.addEventListener('fullscreenchange', () => {
      fullscreenBtn.innerHTML = document.fullscreenElement ? '⊡' : '⛶';
    });
  }

  /* ── Start ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
