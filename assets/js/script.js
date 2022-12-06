$(document).ready(function(){
   // Hero carousel
   $('.hero-carousel').owlCarousel({
      loop:true,
      autoplay:true,
      items:1,
      nav:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      // navText : ["src=''","<i class='fa fa-chevron-right'></i>"],
   });

   // newcomers-carousel
   $('.newcomers-carousel').owlCarousel({
      loop:true,
      autoplay:false,
      items:3,
      margin:30,
      nav:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsive:{
        0:{
            items:1,
        },
        767:{
           items:2,
       },
        1000:{
            items:3,
        }
      }
   });

   // contact-owlCarousel
   $('.contact-owlCarousel').owlCarousel({
      loop:true,
      autoplay:false,
      margin:20,
      nav:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsive:{
         0:{
             items:1,
             nav:true
         },
         575:{
            items:2,
            nav:false
        },
         768:{
             items:3,
             nav:false
         },
         1000:{
             items:5,
             nav:true,
             loop:false
         }
     }
   });

   // mas-postCarousel
   $('.mas-postCarousel').owlCarousel({
      loop:false,
      autoplay:false,
      margin:20,
      nav:false,
      autoplayTimeout:5000,
      autoplayHoverPause:true,
      responsive:{
         0:{
             items:1.4,
         },
         575:{
            items:2,
        },
         768:{
             items:3,
         },
         1000:{
             items:3,
         }
     }
   });

   // Nav Toggle
    $('#toggleNav-icon').click(function(){
        $(this).toggleClass('open');
        $('.header-nav nav ul').slideToggle();
    });
});


