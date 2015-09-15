/*global jQuery, document, window, navigator, smoothScroll, WOW*/
/* ==========================================================================
Document Ready Function
========================================================================== */
jQuery(document).ready(function () {

    'use strict';

    var onMobile, windowHeight;


    /* ==========================================================================
    Modify Copied Text
    ========================================================================== */
    function addLink() {
        var body_element, selection, pagelink, copytext, newdiv;
        body_element = document.getElementsByTagName('body')[0];
        selection = window.getSelection();
        pagelink = " Read more at: <a href='" + document.location.href + "'>" + document.location.href + "</a>";
        copytext = selection + pagelink;
        newdiv = document.createElement('div');
        newdiv.style.position = 'absolute';
        newdiv.style.left = '-99999px';
        body_element.appendChild(newdiv);
        newdiv.innerHTML = copytext;
        selection.selectAllChildren(newdiv);
        window.setTimeout(function () {
            body_element.removeChild(newdiv);
        }, 0);
    }
    document.oncopy = addLink;


    /* ==========================================================================
    Placeholder
    ========================================================================== */
    jQuery('input, textarea').placeholder();


    /* ==========================================================================
    Data Spy
    ========================================================================== */
    jQuery('body').attr('data-spy', 'scroll').attr('data-target', '#nav-wrapper').attr('data-offset', '50');


    /* ==========================================================================
    on mobile?
    ========================================================================== */
	onMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }

	if (onMobile === true) {


        /* ==========================================================================
        Smooth Scroll
        ========================================================================== */
        smoothScroll.init({
            speed: 500,
            offset: 40,
            updateURL: false
        });


        /* ==========================================================================
        Sections Background
        ========================================================================== */
        jQuery('#video-section-wrapper').css({backgroundAttachment: 'scroll'});
        jQuery('#download-section').css({backgroundAttachment: 'scroll'});
        jQuery('#testimonials-section').css({backgroundAttachment: 'scroll'});


        /* ==========================================================================
        Play button
        ========================================================================== */
        jQuery('a.mobile-play').css({display: 'block'});
        jQuery('a.desktop-play').css({display: 'none'});


    } else {


        /* ==========================================================================
        Smooth Scroll
        ========================================================================== */
        smoothScroll.init({
            speed: 800,
            offset: 40,
            updateURL: false
        });


        /* ==========================================================================
        Mobile Play button
        ========================================================================== */
        jQuery('a.mobile-play').css({display: 'none'});


        /* ==========================================================================
        okvideo
        ========================================================================== */
        windowHeight = jQuery(window).height();
        jQuery('a.desktop-play').click(function (event) {
            event.preventDefault();
            jQuery(function () {
                jQuery('#video-section').okvideo({
                    hd: true,
                    volume: 0,
                    loop: true,
                    adproof: true,
                    autoplay: true,
                    annotations: false,
                    source: 'https://www.youtube.com/watch?v=odyPwv8Nyrc'
                });
            });
            jQuery('a.desktop-close').css({display: 'block'});
            jQuery('iframe#okplayer').css({display: 'block'});
            jQuery('#video-section').css({height: windowHeight});
            jQuery('#video-section-wrapper').css({marginLeft: '-100%', opacity: '0'});
            jQuery('html,body').animate({scrollTop: jQuery(this).offset().top - 122}, 800);
        });


        /* ==========================================================================
        Close button
        ========================================================================== */
        jQuery('a.desktop-close').click(function (event) {
            event.preventDefault();
            jQuery('#video-section').css({height: 'auto'});
            jQuery('iframe#okplayer').css({display: 'none'});
            jQuery('a.desktop-close').css({display: 'none'});
            jQuery('#video-section-wrapper').css({marginLeft: '0', opacity: '1'});
            jQuery('html,body').animate({scrollTop: jQuery('#video-section-wrapper').offset().top - windowHeight / 4 }, 800);
        });


    }


    jQuery('a.scrollto').click(function (event) {
        event.preventDefault();
        if (jQuery('.navbar-collapse').hasClass('in')) {
            jQuery('.navbar-collapse').removeClass('in').addClass('collapse');
        }
    });


    /* ==========================================================================
    Screenshots Slider
    ========================================================================== */
    jQuery('.owl-shots').owlCarousel({
        items: 4,
        lazyLoad: true,
        autoPlay: false,
        pagination: false,
        stopOnHover: true,
        navigation: false,
        itemsTablet: [568, 1],
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [768, 2],
        itemsMobile: [599, 1]
    });

    jQuery('a.shots-next').click(function () {
        jQuery('.owl-shots').trigger('owl.next');
    });
    jQuery('a.shots-prev').click(function () {
        jQuery('.owl-shots').trigger('owl.prev');
    });


    /* ==========================================================================
    Testimonials Slider
    ========================================================================== */
    jQuery('.owl-testimonials').owlCarousel({
        lazyLoad: true,
        autoPlay: false,
        singleItem: true,
        pagination: true,
        stopOnHover: true,
        navigation: false,
        transitionStyle: 'goDown'
    });


    /* ==========================================================================
    More Apps Slider
    ========================================================================== */
    jQuery('.owl-moreapps').owlCarousel({
        items: 6,
        lazyLoad: true,
        autoPlay: false,
        pagination: false,
        stopOnHover: true,
        navigation: false,
        itemsTablet: [568, 1],
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [768, 2]
    });

    jQuery('a.moreapps-next').click(function () {
        jQuery('.owl-moreapps').trigger('owl.next');
    });
    jQuery('a.moreapps-prev').click(function () {
        jQuery('.owl-moreapps').trigger('owl.prev');
    });


    /* ==========================================================================
    MailChimp
    ========================================================================== */
    function mailchimpCallback(response) {
        jQuery('form#newsletter-form .nesto-response').show();
        if (response.result === 'success') {
            jQuery('form#newsletter-form input').val('');
            jQuery('.nesto-response').html('Please check your e-mail to complete the subscription');
        } else if (response.result === 'error') {
            jQuery('.nesto-response').html('Please enter unsubscribed / valid e-mail address');
        }
    }
    jQuery('form#newsletter-form input').focus(function () {
        jQuery('form#newsletter-form .nesto-response').hide();
    });
    jQuery('#newsletter-form').ajaxChimp({
        callback: mailchimpCallback,
        url: 'http://nestolab.us8.list-manage1.com/subscribe/post?u=1bb0930eeb3f8c90f187eb8ac&id=52e0f44deb'
    });


}); // JavaScript Document




/* ==========================================================================
Window Resize
========================================================================== */
jQuery(window).resize(function () {

    'use strict';

    var onMobile;

    jQuery('[data-spy="scroll"]').each(function () {
        var $spy = jQuery(this).scrollspy('refresh');
    });

});




/* ==========================================================================
Window Load
========================================================================== */
jQuery(window).load(function () {

    'use strict';

    var onMobile, LoaderDelay, wow;

    /* ==========================================================================
    on mobile?
    ========================================================================== */
	onMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }

	if (onMobile === true) {
        jQuery('#nav-wrapper').addClass('tiny');
    }


    /* ==========================================================================
    Nivo LighBox
    ========================================================================== */
    jQuery('a.nivo-preview').nivoLightbox({
        effect: 'slideDown',
        afterShowLightbox: function (lightbox) {
            document.body.style.overflow = 'hidden';
        },
        beforeHideLightbox: function () {
            document.body.style.overflow = 'visible';
        }
    });


    /* ==============================================
    Loader
    =============================================== */
    LoaderDelay = 350;

    function hideLoader() {
        var loadingLoader = jQuery('#loader');
        loadingLoader.fadeOut();
    }
    hideLoader();

    /* ==========================================================================
    WOW Animation
    ========================================================================== */
    wow = new WOW({
        offset: 40,
        mobile: false
    });
    wow.init();

});




/* ==========================================================================
Window Scroll
========================================================================== */
jQuery(window).scroll(function () {

    'use strict';

    var onMobile;

    /* ==========================================================================
    on mobile?
    ========================================================================== */
	onMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }

	if (onMobile === false) {
        /* ==========================================================================
        Tiny Menu
        ========================================================================== */
        if (jQuery(document).scrollTop() >= 100) {
            jQuery('#nav-wrapper').addClass('tiny');
        } else {
            jQuery('#nav-wrapper').removeClass('tiny');
        }
    }

});