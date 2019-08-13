import svg4everybody from 'svg4everybody';
// import $ from 'jquery';
import 'ion-rangeslider';
// import 'magnific-popup';
// import slick from 'slick-carousel';
// import "jquery-mask-plugin";
// import bound from 'bounds.js';

(function ($) {

    svg4everybody();

    let styles = [
        'padding: 2px 9px',
        'background: #82B93C',
        'color: #fff',
        'display: inline-block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2)',
        'box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.2) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 1.56',
        'text-align: left',
        'font-size: 16px',
        'font-weight: 400'
    ].join(';');

    console.log('%c developed by igor gorlov gorlov https://webjeb.ru', styles);

    $(function() {

        /*
            Phone Mask
        */

        $('.form__field_phone input').mask("+7(999)999-99-99", {
            placeholder: "+7(___)___-__-__"
        });


        /*
            Licenses carousel
        */


        var $licensesList = $('.licenses__list');

        if( $licensesList.length > 0 ) {
            $licensesList.slick({
                mobileFirst: true,
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 4,
                speed: 300,
                adaptiveHeight: true,
                // centerMode: true,
                centerPadding: '90px',
                // prevArrow: '<button class="popular-cars__arrow popular-cars__arrow_prev"><svg class="popular-cars__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
                // nextArrow: '<button class="popular-cars__arrow popular-cars__arrow_next"><svg class="popular-cars__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

                responsive: [{
                    breakpoint: 577,
                    settings: {
                        centerMode: true,
                        centerPadding: '90px',
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        centerMode: true,
                        centerPadding: '104px',
                        slidesToShow: 4,
                    }
                }]
            });
        }


        /*
            Clients carousel
        */


        var $clientsList = $('.clients__list');

        if( $clientsList.length > 0 ) {
            $clientsList.slick({
                mobileFirst: true,
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 2,
                speed: 300,
                adaptiveHeight: true,
                centerMode: true,
                centerPadding: '30px',
                // prevArrow: '<button class="popular-cars__arrow popular-cars__arrow_prev"><svg class="popular-cars__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
                // nextArrow: '<button class="popular-cars__arrow popular-cars__arrow_next"><svg class="popular-cars__arrow-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',

                responsive: [{
                    breakpoint: 577,
                    settings: {
                        centerMode: true,
                        centerPadding: '100px',
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        centerMode: true,
                        centerPadding: '100px',
                        slidesToShow: 4,
                    }
                }]
            });
        }


        /*
            Magnific popup
        */


        $('.licenses__link').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });


        /*
            Calcs
        */


        var $range = $(".js-range-slider"),
            $inputFrom = $(".form__input_range"),
            $result = $('.calc__result-price'),
            instance,
            min = 20000,
            max = 5000000,
            from = 0,
            fromPretty = '',
            to = 0;

        $range.ionRangeSlider({
            type: "single",
            min: min,
            max: max,
            from: 20000,
            to: 5000000,
            prefix: ' руб',

            onStart: updateInputs,
            onChange: updateInputs,

            step: 5000,
            prettify_enabled: true,
            prettify_separator: " ",
            values_separator: " - ",
            force_edges: true


        });

        instance = $range.data("ionRangeSlider");

        function updateInputs (data) {
            from = data.from;
            fromPretty = data.from_pretty;
            to = data.to;

            $inputFrom.prop("value", data.from_pretty + " руб");
            // console.log(data);

            if ( $(".calc .form__checkbox").is( $(".calc .form__checkbox:checked") ) ) {

                // console.log('checked');
                $('.calc__result-price').html(Math.round((from * 0.3) / 100));


            } else {

                // console.log('not checked');
                $('.calc__result-price').html(Math.round((from * 0.6) / 100));

            }


        }

        $inputFrom.on("input", function () {
            var val = $(this).prop("value");

            val = val.replace(/\D/g,'');

            console.log(val)

            // $(this).html( val + 'руб');

            // validate
            if (val < min) {
                val = min;
            } else if (val > to) {
                val = to;
            }

            instance.update({
                from: val
            });


            if ( $(".calc .form__checkbox").is( $(".calc .form__checkbox:checked") ) ) {

                // console.log('checked');
                $('.calc__result-price').html(Math.round((val * 0.3) / 100));


            } else {


                // console.log('not checked 1');

                $('.calc__result-price').html(Math.round((val * 0.6) / 100));

            }

        });


        $(".calc .form__checkbox").change(function() {
            var val = $inputFrom.prop("value");

            val = val.replace(/\D/g,'');            

            instance.update({
                from: val
            });
            if(this.checked) {

                $('.calc__result-price').html(Math.round((val * 0.3) / 100 ) );


            } else {
                // instance.update({
                //     from: val
                // });

                $('.calc__result-price').html(Math.round((val * 0.6) / 100));
            }
        });


        let $optRadio = $(".options__w_first .form__radio");


        $optRadio.click(function() {

            if( $('.options__w_first .form__radio:checked').prop("value") == 1 ) {

                $('.options__w_first .options__price').html( '1 500' + '<span> руб</span>' );
                $('.options__w_first .options__deliv-val').html( '200' + '<span> руб</span>' );
                $('.options__w_first .options__deliv-val').removeClass('options__deliv-val_free');
                $('.options__w_first .options__time-val').html( '20' + '<span> минут</span>' );


            } else if( $('.options__w_first .form__radio:checked').prop("value") == 2 ) {

                $('.options__w_first .options__price').html( '3 000' + '<span> руб</span>' );
                $('.options__w_first .options__deliv-val').text( 'бесплатно' );
                $('.options__w_first .options__deliv-val').addClass('options__deliv-val_free');
                $('.options__w_first .options__time-val').html( '40' + '<span> минут</span>' );


            } else if( $('.options__w_first .form__radio:checked').prop("value") == 3 ) {

                $('.options__w_first .options__price').html( '4 000' + '<span> руб</span>' );
                $('.options__w_first .options__deliv-val').text( 'бесплатно' ).addClass('options__deliv-val_free');
                $('.options__w_first .options__time-val').html( '1' + '<span> час</span>' );


            } else if( $('.options__w_first .form__radio:checked').prop("value") == 4 ) {

                $('.options__w_first .options__price').html( '5 000' + '<span> руб</span>' );
                $('.options__w_first .options__deliv-val').text( 'бесплатно' ).addClass('options__deliv-val_free');
                $('.options__w_first .options__time-val').html( '1,5' + '<span> часа</span>' );

            }



        });



        let $optSecondRadio = $(".options__w_second .form__radio");


        $optSecondRadio.click(function() {

            if( $('.options__w_second .form__radio:checked').prop("value") == 1 ) {

                $('.options__w_second .options__price').html( '2 500' + '<span> руб</span>' );
                $('.options__w_second .options__deliv-val').html( '200' + '<span> руб</span>' );
                $('.options__w_second .options__deliv-val').removeClass('options__deliv-val_free');
                $('.options__w_second .options__time-val').html( '1' + '<span> день</span>' );

                if ( $('.form__row_deliv .form__radio:checked').prop("value") == 'mkad' ) {

                    $('.options__w_second .options__price').html( '3 500' + '<span> руб</span>' );

                } else if ( $('.form__row_deliv .form__radio:checked').prop("value") === 'offmkad' ) {

                    $('.options__w_second .options__price').html( '4 000' + '<span> руб</span>' );
                }



            } else if( $('.options__w_second .form__radio:checked').prop("value") == 2  ) {

                $('.options__w_second .options__price').html( '5 000' + '<span> руб</span>' );
                $('.options__w_second .options__deliv-val').text( 'бесплатно' );
                $('.options__w_second .options__deliv-val').addClass('options__deliv-val_free');

                $('.options__w_second .options__time-val').html( '1' + '<span> день</span>' );

                if ( $('.form__row_deliv .form__radio:checked').prop("value") == 'mkad' ) {

                    $('.options__w_second .options__price').html( '6 000' + '<span> руб</span>' );

                } else if ( $('.form__row_deliv .form__radio:checked').prop("value") == 'offmkad' ) {

                    $('.options__w_second .options__price').html( '6 500' + '<span> руб</span>' );
                }


            } else if( $('.options__w_second .form__radio:checked').prop("value") == 3  ) {

                $('.options__w_second .options__price').html( '7 000' + '<span> руб</span>' );
                $('.options__w_second .options__deliv-val').text( 'бесплатно' ).addClass('options__deliv-val_free');

                $('.options__w_second .options__time-val').html( '2' + '<span> день</span>' );


                if ( $('.form__row_deliv .form__radio:checked').prop("value") == 'mkad' ) {

                    $('.options__w_second .options__price').html( '8 000' + '<span> руб</span>' );

                } else if ( $('.form__row_deliv .form__radio:checked').prop("value") == 'offmkad' ) {

                    $('.options__w_second .options__price').html( '8 500' + '<span> руб</span>' );
                }


            } else if( $('.options__w_second .form__radio:checked').prop("value") == 4 || $('.options__w_second .form__radio:checked').prop("value") == 'mkad' ) {

                $('.options__w_second .options__price').html( '8 500' + '<span> руб</span>' );

                $('.options__w_second .options__deliv-val').text( 'бесплатно' ).addClass('options__deliv-val_free');

                $('.options__w_second .options__time-val').html( '2' + '<span> день</span>' );


                if ( $('.form__row_deliv .form__radio:checked').prop("value") == 'mkad' ) {

                    $('.options__w_second .options__price').html( '9 500' + '<span> руб</span>' );

                } else if ( $('.form__row_deliv .form__radio:checked').prop("value") == 'offmkad' ) {

                    $('.options__w_second .options__price').html( '10 000' + '<span> руб</span>' );
                }


            }



        });


        /*
            Maps
        */


        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map("map-1", {
                center: [55.798915, 37.410592],
                zoom: 17
            }, {
                searchControlProvider: 'yandex#search'
            });

            
            var myPlacemark = new ymaps.Placemark(
                [55.798915, 37.410592], {
                    balloonContent: 'г. Москва, ул. Твардовского, 18, к. 2'
                }      
            );
 
            // Добавление метки на карту
            myMap.geoObjects.add(myPlacemark);

        }


        ymaps.ready(init2);

        function init2() {
            var myMap = new ymaps.Map("map-2", {
                center: [55.802316, 37.529073],
                zoom: 17
            }, {
                searchControlProvider: 'yandex#search'
            });

            
            var myPlacemark = new ymaps.Placemark(
                [55.802316, 37.529073], {
                    balloonContent: 'г. Москва, Ленинградский проспект, д. 64 МАДИ, Лаборатория «Кафедры автомобилей»'
                }      
            );
 
            // Добавление метки на карту
            myMap.geoObjects.add(myPlacemark);

        }


        ymaps.ready(init3);

        function init3() {
            var myMap = new ymaps.Map("map-3", {
                center: [55.798915, 37.410592],
                zoom: 17
            }, {
                searchControlProvider: 'yandex#search'
            });

            
            var myPlacemark = new ymaps.Placemark(
                [55.798915, 37.410592], {
                    balloonContent: 'г. Москва, ул. Твардовского, 18, к. 2'
                }      
            );
 
            // Добавление метки на карту
            myMap.geoObjects.add(myPlacemark);

        }



        /*
            Popups

        */


        


    });

})(jQuery);
