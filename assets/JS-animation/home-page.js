// Banner zoom effect with sticky pin until fully zoomed
(function ($) {
    var $win = $(window);
    var $bannerWrapper = $('.banner-wrapper');
    var $banner = $('.banner');
    var $img = $('.banner-img');
    var $header = $('.site-header');

    var START_SCALE = 0.4;
    var END_SCALE = 1.0;

    var latestScroll = 0;
    var ticking = false;

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function update() {
        var scrollTop = latestScroll;

        var wrapperTop = $bannerWrapper.offset().top;
        var bannerHeight = $banner.outerHeight();
        var totalScroll = bannerHeight * 3; // 3× viewport height

        var progress = (scrollTop - wrapperTop) / totalScroll;
        progress = Math.min(Math.max(progress, 0), 1);

        var eased = easeOutCubic(progress);
        var scale = START_SCALE + (END_SCALE - START_SCALE) * eased;

        $img.css('transform', 'translate(-50%, -50%) scale(' + scale + ')');

        if (scrollTop > 20) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }

        ticking = false;
    }

    $win.on('scroll', function () {
        latestScroll = $win.scrollTop();
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });

    $(function () {
        latestScroll = $win.scrollTop();
        update();
    });
})(jQuery);

//  Projects section animation on scroll
(function() {
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