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
