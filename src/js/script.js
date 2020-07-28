$(document).ready(function(){
    $('.carousel__inner').slick({
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png" alt="right"></button>',
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                dots: true
              }
            }
        ]
    });


    $('.catalog__tabs').on('click', 'div:not(.active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });


    function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('.button_main-form').on('click', function(){
      $('.overlay-consultation').fadeIn('slow');
    })

    $('.overlay__close').on('click', function(){
      $('.overlay-consultation').fadeOut('slow');
    })

    $('.overlay__close').on('click', function(){
        $('.overlay-order').fadeOut('slow');
    })

    $('.overlay__close').on('click', function(){
      $('.overlay-thanks').fadeOut('slow');
    })

    $('.button_mini').each(function(e){
        $(this).on('click', function(){
            $('.overlay-order .subtitle').text($('.catalog-item__subtitle').eq(e).text());
        })
        
    })
    $('.button_mini').on('click', function(){
        $('.overlay-order').fadeIn('slow');
    });

    $(window).scroll(function(){
      if($(this).scrollTop() > 1000){
        $('.pageup').fadeIn('slow')
      } else{
        $('.pageup').fadeOut('slow')
      }
    });

    $("a[href^='#']").click(function(){
      var _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    $('.consultation__wrapper form').validate({
      rules: {
        name: "required",
        email: {
          required: true,
        }, 
        phone: "required",
      },
      messages: {
        name: {
          required:"Пожалуйста, введите своё имя",
        },
        phone:{
          required:"Пожалуйста, введите свой номер телефона",
        },
        email: {
          required: "Пожалуйста, введите свою эл. почту",
          email: "E-mail адрес должен содержать @"
        },
      }
    });
    $('.overlay-consultation form').validate({
      rules: {
        name: "required",
        email: {
          required: true,
        }, 
        phone: "required",
      },
      messages: {
        name: {
          required:"Пожалуйста, введите своё имя",
        },
        phone:{
          required:"Пожалуйста, введите свой номер телефона",
        },
        email: {
          required: "Пожалуйста, введите свою эл. почту",
          email: "E-mail адрес должен содержать @"
        },
      }
    });
    $('.overlay-order form').validate({
      rules: {
        name: "required",
        email: {
          required: true,
        }, 
        phone: "required",
      },
      messages: {
        name: {
          required:"Пожалуйста, введите своё имя",
        },
        phone:{
          required:"Пожалуйста, введите свой номер телефона",
        },
        email: {
          required: "Пожалуйста, введите свою эл. почту",
          email: "E-mail адрес должен содержать @"
          
        },
      }
    });

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('.overlay-order, .overlay-consultation').fadeOut('fast');
            $('.overlay-thanks').fadeIn('slow');

            $('form').trigger('reset')
          })
        return false;
    });

    $("input[name=phone]").mask('+373 999-99-99');

    new WOW().init();
});