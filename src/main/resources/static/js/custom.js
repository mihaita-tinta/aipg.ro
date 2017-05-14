$(document).ready(function() {
    "use strict";


    /*menu*/

    /*Menu for desktop*/
    $("#nav-trigger").on("click", function() {
        $("#top-menu").toggleClass("active"), $("#top-menu .menu-items").removeClass("active"), $("#top-menu .menu-items").delay(50).queue(function() {
            $(this).addClass("active").clearQueue()
        })
    }), $(".has-submenu").hover(function() {
        $(this).toggleClass("active")
    })

    //  Intializing Navigation Effect
    $('ul.main-nav li').on('mouseenter', function() {
        $(this).children('ul.navi-level-2').addClass("open-navi-2 animated fadeInUp");
    });
    $('ul.main-nav li').on('mouseleave', function() {
        $(this).children('ul.navi-level-2').removeClass("open-navi-2 animated fadeInUp");
    });


    /*Mobile menu Initialize*/
    $("#mobile-menu").mobileMenu({
        MenuWidth: 250,
        SlideSpeed: 300,
        WindowsMaxWidth: 780,
        PagePush: true,
        FromLeft: false,
        Overlay: true,
        CollapseMenu: true,
        ClassName: "mobile-menu"
    });


    /* Main Slider*/
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })


    /* Testimonials Slider*/
    $('.testimonial-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })


    /*Portfolio*/

    // Instantiate MixItUp
    $('.portfolio-items').mixItUp({
        animation: {
            duration: 300
        }
    });

    //Counter
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });


    // Google Maps
    var googleMap = function() {
        if ($().gmap3) {
            $("#map-canvas").gmap3({
                map: {
                    options: {
                        zoom: 4,
                        mapTypeId: 'charry_style',
                        mapTypeControlOptions: {
                            mapTypeIds: ['charry_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        },
                        scrollwheel: false
                    }
                },
                getlatlng: {
                    address: "Unitech Signature Tower-II, Tower-B, Sector-15, Part-II, Village Silokhera, Gurugram, Haryana 122001",
                    callback: function(results) {
                        if (!results) return;
                        $(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                        $(this).gmap3({
                            marker: {
                                latLng: results[0].geometry.location,
                                options: {
                                    icon: 'http://www.designcrazzy.com/demo/flying-bird/images/map-marker.png'
                                }
                            }
                        });
                    }
                },
                styledmaptype: {
                    id: "charry_style",
                    options: {
                        name: "Charry Map"
                    },
                    styles: [{
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{
                                    "color": "#edf0f4"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },

                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },

                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                    "color": "#f7f7f7"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },

                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                    "color": "#f7f7f7"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },

                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#f7f7f7"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },

                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#f7f7f7"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },

                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },

                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },

                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [{
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },

                        {
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                    "saturation": 46
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },

                        {
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },

                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 45
                                }
                            ]
                        },

                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 35
                                }
                            ]
                        },

                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 65
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        }
                    ]
                },
            });
        }
    };

    googleMap();

    /*function initialize() {
        var myLatlng = new google.maps.LatLng(51.5068837, -0.1286353, 16); // here you can specify your location
        var styles = [{
            "featureType": "landscape",
            "stylers": [{ "saturation": -100 }, { "lightness": 65 },
                { "visibility": "on" }
            ]
        }, {
            "featureType": "poi",
            "stylers": [{ "saturation": -100 }, { "lightness": 51 },
                { "visibility": "simplified" }
            ]
        }, {
            "featureType": "road.highway",
            "stylers": [{ "saturation": -100 },
                { "visibility": "simplified" }
            ]
        }, {
            "featureType": "road.arterial",
            "stylers": [{ "saturation": -100 }, { "lightness": 30 },
                { "visibility": "on" }
            ]
        }, {
            "featureType": "road.local",
            "stylers": [{ "saturation": -100 }, { "lightness": 40 },
                { "visibility": "on" }
            ]
        }, {
            "featureType": "transit",
            "stylers": [{ "saturation": -100 },
                { "visibility": "simplified" }
            ]
        }, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }]
        }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#438482" }, { "lightness": -25 }, { "saturation": -97 }] }]

        var mapOptions = {
            zoom: 16,
            center: myLatlng,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }



        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.setOptions({ styles: styles });

        //marker image
        var image = 'http://www.designcrazzy.com/demo/flying-bird/images/map-marker.png';

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Flying Bird',
            icon: image
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);

    }*/



    //google.maps.event.addDomListener(window, 'load', initialize);




    // Google Maps end


    // Site animations
    function onScrollInit(items, trigger) {
        $(items).css('opacity', 0);
        items.each(function() {
            var osElement = $(this),
                osAnimationClass = osElement.attr('data-os-animation'),
                osAnimationDelay = osElement.attr('data-os-animation-delay');

            osElement.css({
                '-webkit-animation-delay': osAnimationDelay,
                '-moz-animation-delay': osAnimationDelay,
                'animation-delay': osAnimationDelay
            });

            var osTrigger = (trigger) ? trigger : osElement;

            osTrigger.waypoint(function() {
                osElement.addClass('animated').addClass(osAnimationClass);
            }, {
                triggerOnce: true,
                offset: '90%'
            });
        });
    }

    onScrollInit($('.os-animation'));

}(jQuery));
// End Scripts