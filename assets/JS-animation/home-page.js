// Banner section 
(function () {
  gsap.registerPlugin(ScrollTrigger);

  var $banner = document.querySelector('.banner-wrapper');
  var $img = document.querySelector('.banner-img');
  var $header = document.querySelector('.site-header');

  var START_SCALE = 0.4;
  var END_SCALE = 1.0;
  var OVERSHOOT_SCALE = 1.05; // subtle zoom-out flourish after the zoom-in

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep the centering transform intact — GSAP composes xPercent/yPercent + scale itself
  gsap.set($img, { xPercent: -50, yPercent: -50, scale: START_SCALE, transformOrigin: '50% 50%' });

  if (prefersReducedMotion) {
    gsap.set($img, { scale: END_SCALE });
  } else {
    var tl = gsap.timeline({ paused: true });

    tl.to($img, {
      scale: OVERSHOOT_SCALE,
      duration: 2.3,
      ease: 'power3.out'
    }).to($img, {
      scale: END_SCALE,
      duration: 0.9,
      ease: 'power2.inOut'
    }, '-=0.2');

    ScrollTrigger.create({
      trigger: $banner,
      start: 'top 90%',   // fires as soon as the banner is about to enter view
      once: true,          // never replays
      onEnter: function () {
        tl.play();
      }
    });
  }

  // Header "scrolled" state — independent of the banner animation, still scroll-driven
  ScrollTrigger.create({
    start: 'top -20',
    end: 99999,
    onUpdate: function (self) {
      $header.classList.toggle('scrolled', self.scroll() > 20);
    }
  });

  // Make sure ScrollTrigger checks current scroll position immediately,
  // so an already-in-view banner fires on load without needing a scroll event.
  ScrollTrigger.refresh();
})();

//  Projects section animation on scroll
(function () {
  // selectors we will animate (no HTML changes required)
  const selectors = [
    '.header-image',
    '.header-text',
    '.middle-left',
    '.middle-right',
    '.bottom-row',
    '.bottom-row > *',
    '.grid-item'
  ];

  // collect unique DOM elements
  const elements = Array.from(
    new Set(
      selectors.flatMap(sel => Array.from(document.querySelectorAll(sel)))
    )
  );

  // mark and prepare elements for animation, and set small stagger delays
  elements.forEach((el, idx) => {
    if (!el.classList.contains('js-anim-ready')) {
      el.classList.add('animate', 'js-anim-ready');
      // create a nice stagger but clamp to 600ms max
      const delay = Math.min(idx * 80, 600);
      el.style.transitionDelay = delay + 'ms';
    }
  });

  // fallback: if IntersectionObserver not supported -> reveal all on load
  if (!('IntersectionObserver' in window)) {
    window.addEventListener('load', () => elements.forEach(e => e.classList.add('in-view')));
    return;
  }

  // observer options
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target); // reveal once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.12
  });

  // observe each element
  elements.forEach(el => observer.observe(el));

  // Also ensure things visible at load get shown immediately
  window.addEventListener('load', () => {
    elements.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in-view');
    });
  });
})();