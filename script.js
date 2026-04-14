/* ============================================
   Dheeran and Color Cubes — Interactive Ebook
   script.js
   ============================================ */

(function () {
  'use strict';

  /* ── Configuration ── */
  const CONFIG = {
    totalPages: 18, // cover + page1-16 + back
    autoplayInterval: 12000, // increased time per slide during autoplay
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

  /* ── Story Data for Multi-Language Speech ── */
  const STORY_DATA = {
    en: {
      pages: [
        "Dheeran and the Magic Color Cubes.", // 0: Cover
        "Dheeran enjoyed being in nature. Everything around him looked fresh and beautiful.", // 1: Page 1
        "One day... something felt strange. The colors looked different.", // 2: Page 2
        "The world around Dheeran felt quiet and grey. Even in his notebook... the colors were gone.", // 3: Page 3
        "Dheeran looked around. Where did the colors go?", // 4: Page 4
        "He started walking, looking everywhere. He wanted to find the reason.", // 5: Page 5
        "Then he found a small building. It looked different from everything else.", // 6: Page 6
        "The door was slightly open. A soft light came from inside.", // 7: Page 7
        "Dheeran stepped inside slowly. He looked around the old workshop. There were pots, books, and jars everywhere.", // 8: Page 8
        "He saw glowing cubes in the room. Each cube had a color inside it.", // 9: Page 9
        "The cubes were connected to a machine. It looked like they controlled colors.", // 10: Page 10
        "The cubes began to glow brighter. The light grew stronger and stronger.", // 11: Page 11
        "BOOM! Colors burst everywhere! The room filled with bright light.", // 12: Page 12
        "The world became colorful again. Dheeran smiled happily.", // 13: Page 13
        "Connect the dots in order from 1 to 10 to fill the entire grid!", // 14: Page 14
        "Color Dheeran and his Color Cubes! Use your favorite colors and make them come alive!", // 15: Page 15
        "My story fun page. How much did you like this story? Draw your favorite moment from the story! Thank you for reading.", // 16: Page 16
        "A Magical Color Adventure! The world’s colors are fading... Only Dheeran can bring them back! Join Dheeran on an epic adventure to discover the secret behind the missing colors. With courage, kindness, and a little bit of magic, he must solve puzzles, face challenges, and unlock the power of colors to save the day! Find the magic, solve the puzzle, restore colors! A fun and heartwarming children’s story. A magical journey of colors and courage. Perfect for young readers and dreamers. Let’s bring the colors back together! The End." // 17: Back cover
      ],
      celebration: `🎉 Congratulations, Super Reader! 🎉\n\nYou finished the whole book!\nYou are amazing and brave\njust like Dheeran! 🌟\n\n⭐ Keep reading, keep dreaming! ⭐`
    },
    hi: {
      pages: [
        "धीरन और जादुई रंगीन क्यूब्स।", // 0
        "धीरन को प्रकृति में रहना अच्छा लगता था। उसके चारों ओर सब कुछ ताज़ा और सुंदर लग रहा था।", // 1
        "एक दिन... कुछ अजीब लगा। रंग अलग दिख रहे थे।", // 2
        "धीरन के आसपास की दुनिया शांत और धूसर महसूस हो रही थी। यहाँ तक कि उसकी नोटबुक में भी... रंग चले गए थे।", // 3
        "धीरन ने चारों ओर देखा। रंग कहाँ चले गए?", // 4
        "उसने हर तरफ देखते हुए चलना शुरू किया। वह कारण ढूँढना चाहता था।", // 5
        "तभी उसे एक छोटी सी इमारत मिली। यह बाकी सब चीजों से अलग लग रही थी।", // 6
        "दरवाजा थोड़ा खुला था। अंदर से हल्की रोशनी आ रही थी।", // 7
        "धीरन धीरे-धीरे अंदर गया। उसने पुरानी कार्यशाला के चारों ओर देखा। हर जगह बर्तन, किताबें और जार थे।", // 8
        "उसने कमरे में चमकते हुए क्यूब्स देखे। हर क्यूब के अंदर एक रंग था।", // 9
        "क्यूब्स एक मशीन से जुड़े थे। ऐसा लग रहा था कि वे रंगों को नियंत्रित करते हैं।", // 10
        "क्यूब्स और भी तेजी से चमकने लगे। रोशनी और भी तेज होती गई।", // 11
        "धमाका! हर तरफ रंग बिखर गए! कमरा तेज़ रोशनी से भर गया।", // 12
        "दुनिया फिर से रंगीन हो गई। धीरन खुशी से मुस्कुराया।", // 13
        "पूरे ग्रिड को भरने के लिए 1 से 10 तक के बिंदुओं को क्रम से जोड़ें!", // 14
        "धीरन और उसके रंगीन क्यूब्स में रंग भरें! अपने पसंदीदा रंगों का उपयोग करें और उन्हें जीवंत बनाएं!", // 15
        "मेरी कहानी का मज़ेदार पन्ना। आपको यह कहानी कितनी पसंद आई? कहानी से अपना पसंदीदा पल बनाएं! पढ़ने के लिए धन्यवाद।", // 16
        "एक जादुई रंगीन साहसिक कार्य! दुनिया के रंग फीके पड़ रहे हैं... केवल धीरन ही उन्हें वापस ला सकता है! खोए हुए रंगों के पीछे के रहस्य को खोजने के लिए एक महाकाव्य साहसिक कार्य पर धीरन के साथ जुड़ें। साहस, दया और थोड़े से जादू के साथ, उसे पहेलियों को हल करना होगा, चुनौतियों का सामना करना होगा और दिन बचाने के लिए रंगों की शक्ति को अनलॉक करना होगा! जादू खोजें, पहेली सुलझाएं, रंग बहाल करें! एक मज़ेदार और दिल को छू लेने वाली बच्चों की कहानी। रंगों और साहस की एक जादुई यात्रा। युवा पाठकों और सपनों के लिए बिल्कुल सही। आइए रंगों को फिर से साथ लाएं! समाप्त।" // 17
      ],
      celebration: `🎉 बधाई हो, सुपर रीडर! 🎉\n\nआपने पूरी किताब खत्म कर ली है!\nआप धीरन की तरह ही\nअद्भुत और साहसी हैं! 🌟\n\n⭐ पढ़ते रहें, सपने देखते रहें! ⭐`
    },
    ta: {
      pages: [
        "தீரன் மற்றும் மேஜிக் கலர் கியூப்ஸ்.", // 0: Cover
        "தீரனுக்கு இயற்கையில இருக்குறது ரொம்ப பிடிக்கும். அவன் சுத்தி எல்லாமே ரொம்ப ஃப்ரெஷா, அழகா இருந்துச்சு.", // 1: Page 1
        "ஒரு நாள்... ஏதோ விசித்திரமா தெரிஞ்சுது. கலர்ஸ் எல்லாம் வித்தியாசமா இருந்துச்சு.", // 2: Page 2
        "தீரனைச் சுத்தி இருக்குற உலகம் ரொம்ப சைலன்ட்டாவும், சாம்பல் நிறமாவும் மாறிடுச்சு. அவனோட நோட்டுப்புத்தகத்துல கூட... கலர்ஸ் எல்லாம் காணாம போயிடுச்சு.", // 3: Page 3
        "தீரன் சுத்தி முத்தி பார்த்தான். கலர்ஸ் எல்லாம் எங்கே போச்சு?", // 4: Page 4
        "அவன் எல்லா இடத்துலயும் தேடிக்கிட்டே நடக்க ஆரம்பிச்சான். இதுக்கு என்ன காரணம்னு தெரிஞ்சுக்க அவன் ஆசைப்பட்டான்.", // 5: Page 5
        "அப்போ அவனுக்கு ஒரு சின்ன பில்டிங் தெரிஞ்சுது. அது மத்த எல்லாத்தையும் விட வித்தியாசமா இருந்துச்சு.", // 6: Page 6
        "கதவு லேசா திறந்துருந்துச்சு. உள்ளே இருந்து ஒரு மென்மையான வெளிச்சம் வந்துச்சு.", // 7: Page 7
        "தீரன் மெதுவா உள்ளே போனான். அந்த பழைய வொர்க்ஷாப் (workshop) சுத்தி பார்த்தான். எங்கே பார்த்தாலும் பானைங்க, புக்குங்க, ஜாடிகளா இருந்துச்சு.", // 8: Page 8
        "அவன் அந்த ரூம்ல மின்னிக்கிட்டு இருந்த கியூப்ஸை (cubes) பார்த்தான். ஒவ்வொரு கியூப்குள்ளயும் ஒரு கலர் இருந்துச்சு.", // 9: Page 9
        "அந்த கியூப்ஸ் எல்லாம் ஒரு மெஷினோட (machine) கனெக்ட் ஆகியிருந்துச்சு. அதுதான் எல்லா கலர்ஸையும் கண்ட்ரோல் பண்ற மாதிரி தெரிஞ்சுது.", // 10: Page 10
        "அந்த கலர் கியூப்ஸ் இன்னும் பிரகாசமா மின்ன ஆரம்பிச்சது. வெளிச்சம் மேன்மேலும் அதிகமாயிட்டே போச்சு.", // 11: Page 11
        "பூம்! கலர்ஸ் எல்லாம் எல்லா இடத்துலயும் சிதறுச்சு! அந்த ரூம் ஃபுல்லா பிரகாசமான வெளிச்சம் நிறைஞ்சுது.", // 12: Page 12
        "உலகம் மறுபடியும் கலர்ஃபுல்லா மாறிடுச்சு. தீரன் ரொம்ப சந்தோஷமா சிரிச்சான்.", // 13: Page 13
        "இந்த கிரிட் (grid) ஃபுல்லா ஃபில் (fill) பண்ண, 1-லிருந்து 10 வரை இருக்குற புள்ளிங்களை வரிசையா கனெக்ட் பண்ணுங்க!", // 14: Page 14
        "தீரன் மற்றும் அவனோட கலர் கியூப்ஸ்க்கு கலர் பண்ணுங்க! உங்களுக்கு பிடிச்ச கலர்ஸை யூஸ் பண்ணி அதுங்களுக்கு உயிர் கொடுங்க!", // 15: Page 15
        "என்னோட கதையோட ஃபன் (fun) பேஜ். இந்த கதை உங்களுக்கு எவ்வளவு பிடிச்சிருந்துச்சு? இந்த கதையில உங்களுக்கு பிடிச்ச ஒரு சீனை வரைஞ்சு காட்டுங்க! படிச்சதுக்கு ரொம்ப தேங்க்ஸ்.", // 16: Page 16
        "ஒரு மேஜிக்கலான கலர் அட்வென்ச்சர்! உலகின் கலர்ஸ் எல்லாம் குறைஞ்சுட்டே போகுது... தீரனால மட்டும்தான் அதைத் திரும்ப கொண்டு வர முடியும்! தொலைஞ்சு போன கலர்ஸோட ரகசியத்தைக் கண்டுபிடிக்க தீரனோட இந்த சாகசத்துல நீங்களும் சேர்ந்துக்கோங்க. தைரியம், அன்பு அப்புறம் கொஞ்சம் மேஜிக்கோட அவனோட இந்த பயணத்துல புதிர்களை விடுவிச்சு, சவால்களை எதிர்கொண்டு, கலர்ஸோட சக்தியை மீட்டெடுக்கணும்! மேஜிக்கை கண்டுபிடிங்க, புதிரை விடுவிங்க, கலர்ஸை திரும்ப கொண்டு வாங்க! ஒரு அழகான குழந்தைகளுக்கான கதை. தைரியம் மற்றும் கலர்ஸ் நிறைந்த ஒரு மாயாஜால பயணம். எப்போவும் கனவு கண்டுட்டு இருக்குற குட்டி பசங்களுக்காக. திரும்பவும் கலர்ஸை ஒண்ணா கொண்டு வருவோம்! முற்றிற்று." // 17: Back cover
      ],
      celebration: `🎉 வாழ்த்துக்கள், சூப்பர் ரீடர்! 🎉\n\nநீங்க முழு புக்கையும் படிச்சு முடிச்சுட்டீங்க!\nநீங்களும் தீரன் மாதிரியே ரொம்ப\nஅற்புதமானவர் மற்றும் தைரியமானவர்! 🌟\n\n⭐ தொடர்ந்து படிங்க, கனவு காணுங்க! ⭐`
    }
  };

  /* ── State ── */
  let currentPage = 0;
  let currentLanguage = 'en';
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

  /* ── Speech State ── */
  let synth = window.speechSynthesis;
  let currentUtterance = null;

  /* ── DOM References ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const loadingScreen = $('#loading-screen');
  const pageWrapper = $('#book-container');
  const pageIndicator = $('#page-indicator');
  const languageSelect = $('#language-select');
  const progressScrubber = $('#progress-scrubber');
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
  const readAloudBtn = $('#read-aloud-btn');
  const whatsappBtn = $('#whatsapp-btn');

  /* ── Initialize ── */
  function init() {
    createBackgroundShapes();
    createPageElements();

    // Initialize scrubber
    if (progressScrubber) {
      progressScrubber.max = CONFIG.totalPages - 1;
    }

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

    stopSpeaking(); // Stop any reading when turning page

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
      if (isAutoplay) {
        // Will be triggered by timeout or we can just trigger it here. 
        // We trigger it explicitly to make sure.
        setTimeout(() => speakPage(currentPage, true), 800);
      }
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

    // Progress Scrubber Sync
    if (progressScrubber) {
      progressScrubber.value = currentPage;
      updateScrubberBackground();
    }
  }

  function updateScrubberBackground() {
    if (!progressScrubber) return;
    const min = parseInt(progressScrubber.min) || 0;
    const max = parseInt(progressScrubber.max) || 1;
    const val = parseInt(progressScrubber.value) || 0;
    const percent = ((val - min) / (max - min)) * 100;
    progressScrubber.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percent}%, rgba(124, 58, 237, 0.12) ${percent}%, rgba(124, 58, 237, 0.12) 100%)`;
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

  /* ── Read Aloud (Text-to-Speech) ── */
  function stopSpeaking() {
    if (!synth) return;
    if (synth.speaking) {
      synth.cancel();
    }
    if (readAloudBtn) {
      readAloudBtn.classList.remove('playing');
    }
  }

  function toggleSpeech() {
    if (!synth) return;
    if (synth.speaking) {
      stopSpeaking();
    } else {
      speakPage(currentPage, false);
    }
  }

  function speakPage(index, fromAutoplay = false) {
    stopSpeaking();

    const langData = STORY_DATA[currentLanguage] || STORY_DATA.en;
    const textToSpeak = langData.pages[index];

    if (!textToSpeak) {
      if (fromAutoplay && isAutoplay) {
        autoplayTimer = setTimeout(() => { nextPage(); }, 2000);
      }
      return;
    }

    currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
    if (currentLanguage === 'hi') currentUtterance.lang = 'hi-IN';
    else if (currentLanguage === 'ta') currentUtterance.lang = 'ta-IN';
    else currentUtterance.lang = 'en-IN';

    // Find a matching voice
    let voices = synth.getVoices();

    // Retry if voices aren't loaded yet
    if (voices.length === 0) {
      setTimeout(() => speakPage(index, fromAutoplay), 200);
      return;
    }

    let preferredVoice = null;

    if (currentLanguage === 'hi') {
      preferredVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural')) && (v.lang.includes('hi') || v.name.toLowerCase().includes('hindi')))
        || voices.find(v => v.lang.toLowerCase().replace('_', '-').includes('hi') || v.name.toLowerCase().includes('hindi'));
    } else if (currentLanguage === 'ta') {
      preferredVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural')) && (v.lang.includes('ta') || v.name.toLowerCase().includes('tamil')))
        || voices.find(v => v.name.includes('தமிழ்'))
        || voices.find(v => v.lang.toLowerCase().replace('_', '-').includes('ta') || v.name.toLowerCase().includes('tamil') || v.name.toLowerCase().includes('valluvar'));
    } else {
      preferredVoice = voices.find(v => v.lang === 'en-IN' || (v.lang === 'en' && v.name.includes('India')))
        || voices.find(v => v.name.includes('Google') || v.name.includes('Natural'));
    }

    if (preferredVoice) {
      currentUtterance.voice = preferredVoice;
    } else if (currentLanguage !== 'en') {
      // User is trying to listen in a language their system doesn't support
      showAppreciation(`⚠️ ${currentLanguage.toUpperCase()} voice pack not found! Please check your system settings.`);
    }

    currentUtterance.pitch = 1.05;
    currentUtterance.rate = 0.85;

    currentUtterance.onstart = () => {
      if (readAloudBtn) {
        readAloudBtn.classList.add('playing');
      }
      // If autoplay is active and we just started speaking, clear the default timer 
      // so it waits until speech finishes to advance.
      if (fromAutoplay && autoplayTimer) {
        clearTimeout(autoplayTimer);
      }
    };

    currentUtterance.onend = () => {
      if (readAloudBtn) {
        readAloudBtn.classList.remove('playing');
      }
      // Resume autoplay navigation once audio finishes reading
      if (fromAutoplay && isAutoplay) {
        autoplayTimer = setTimeout(() => {
          if (currentPage < CONFIG.totalPages - 1) {
            nextPage();
          } else {
            stopAutoplay();
          }
        }, 1500); // Wait 1.5s after finishing the speech before turning page
      }
    };

    currentUtterance.onerror = () => {
      if (readAloudBtn) {
        readAloudBtn.classList.remove('playing');
      }
      if (fromAutoplay && isAutoplay) {
        autoplayTimer = setTimeout(() => { nextPage(); }, 2000);
      }
    };

    synth.speak(currentUtterance);
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
    speakPage(currentPage, true);
  }

  function stopAutoplay() {
    isAutoplay = false;
    clearTimeout(autoplayTimer);
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
    const langData = STORY_DATA[currentLanguage] || STORY_DATA.en;
    finalMessageEl.innerText = langData.celebration;
    finalCelebration.classList.add('visible');

    // Show special last-page toast
    showAppreciation("🏆 You finished the book! 🏆");

    launchConfetti();

    // Auto-close celebration after some time (like toasts)
    setTimeout(() => {
      finalCelebration.classList.remove('visible');
    }, 5000);
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

    if (readAloudBtn) {
      readAloudBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent zoom trigger
        toggleSpeech();
      });
    }

    if (languageSelect) {
      languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        stopSpeaking();
        // If autoplaying, restart to catch the new language
        if (isAutoplay) {
          stopAutoplay();
          startAutoplay();
        }
      });
    }

    if (progressScrubber) {
      // Real-time navigation while dragging
      progressScrubber.addEventListener('input', (e) => {
        const targetPage = parseInt(e.target.value);
        if (targetPage !== currentPage) {
          goToPage(targetPage, targetPage > currentPage ? 'next' : 'prev');
          updateScrubberBackground();
        }
      });

      // Stop speech or autoplay when user starts manual scrubbing
      progressScrubber.addEventListener('mousedown', () => {
        stopAutoplay();
        stopSpeaking();
      });
      progressScrubber.addEventListener('touchstart', () => {
        stopAutoplay();
        stopSpeaking();
      });
    }

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', (e) => {
        // Since it's an <a> and we have a target="_blank", it works naturally, 
        // but adding an event just in case or for logging/analytics later.
      });
    }

    // Force load voices in some browsers
    if (speechSynthesis && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => synth.getVoices();
    }

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
