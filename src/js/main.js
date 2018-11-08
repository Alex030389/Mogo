"use strict";
$(document).ready(function () {

    // preloader
    setInterval(function () {
        var p = $(".preloader");
        p.css("opacity", 0);
        setInterval(function () {
            p.remove();
        }, 1000);
    }, 3000);

    // scroll
    $("#menu").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 600);
    });

    // hamgurger;
    hamburger
    var hamburger = $(".hamburger");
    hamburger.click(function () {
        hamburger.toggleClass("is-active");
        // $(".menu").fadeToggle();
        $(".menu").toggleClass("menu_active");
        
        // disable scrolling when the menu is active
        if (hamburger.hasClass("is-active")) {
            
            var winScrollTop = $(window).scrollTop();
            $(window).bind("scroll", function () {
                $(window).scrollTop(winScrollTop);
            });
        } else {
            $(window).off("scroll");
        }
    })
    
    $(".menu__link").click(function() {
        $(window).off("scroll");
        hamburger.toggleClass("is-active");
        $(".menu").toggleClass("menu_active");
    })

    // tabs
    $('.banner-tab').each(function () {
        $(this).find('.banner-tab__link').each(function (i) {
            $(this).click(function () {
                $(this).addClass('banner-tab__link_active').siblings().removeClass('banner-tab__link_active')
                    .closest('.banner-inner').find('.banner-slogan').removeClass('banner-slogan_active').eq(i).addClass('banner-slogan_active');
            });
        });
    });

    $('.service2-item').each(function () {
        $(this).click(function () {
            $(this).addClass('service2-item_active').siblings().removeClass('service2-item_active');
        });
    });

    


    // scroll top
    $(document).scroll(function () {
        if ($(window).scrollTop() >= 3000) {
            $('.up').slideDown();
        } else {
            $('.up').slideUp();
        }
    });
    $('.up').click(function () {
        $('body,html').animate({
            scrollTop: '0'
        }, 600);
    });

    // map
    var map = $(".map__link");
    map.click(function () {
        if (map.text() == "open map") {
            map.text("close map");
        } else {
            map.text("open map");
        }
        $(".map__box").slideToggle("600");
    });


})