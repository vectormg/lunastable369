const addresses=[
    '0x3ad789F3141970A834b807732e40eD1bEF67F587',
    '0xfd3c5b8be7783cd90169d2e4bc920833c14ab50f',
    '0x9e09632A26364FDD026bc3D1b92890D09Fe4d919',
    '0x571a2f2410fa7fbdca90b00538b539373d087514',
    '0x0Cf5b0c28C363312F2C72cBB3c0818022F04d92b'
];
let horses = [];


$(document).ready(function(){

    fillCarouselData();

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

async function getHorses(item){
    await $.get( "https://api.zed.run/api/v1/horses/get_user_horses?public_address="+item, function( data ) {
        $.each( data, function( key, value ) {
            let horse = {
                name:value.hash_info.name,
                bloodline:value.bloodline,
                genotype:value.genotype,
                number_of_races:value.number_of_races,
                win_rate:value.win_rate,
                career:value.career,
                img_url:value.img_url
            };
            horses.push(horse);
        });
    });

    await $.get( "https://api.zed.run/api/v1/horses/get_user_lending_marketplace_horses?public_address="+item+"&offset=0", function( data ) {
        $.each( data, function( key, value ) {
            let horse = {
                name:value.hash_info.name,
                bloodline:value.bloodline,
                genotype:value.genotype,
                number_of_races:value.number_of_races,
                win_rate:value.win_rate,
                career:value.career,
                img_url:value.img_url
            };
            horses.push(horse);
        });

    });

}

async function fillCarouselData(){
    for (let i = 0; i < 5; i++) {
        let data = await getHorses(addresses[i]);
    }
    console.log('===================')
    console.log(horses);
    for (let i = 0; i < 5; i++) {
        $('.hero-carousel').append('<div><div class="col-md-7" style="float:left;"><div class="hero-carousel-img"><img src="'+horses[i].img_url+'" alt="carousel-img"></div><!-- banner-offer --><div class="banner-offer"><h3 class="banner-title-lg">“Make An Offer”</h3><h3 class="banner-title-sm">Make An Offer</h3><div class="banner-offer-text"><span>SPRINTER</span><p>Born: 3/22/19 15:35 MST</p></div></div></div><div class="col-md-5" style="float:right;"><div class="breed-content-items"><div class="hero-breed"><div class="breed-header"><span><img src="assets/images/icon/locat.png" alt="icon-img"></span><p>Breed 2.0 • class I • 2105</p><span class="bread-circle"></span></div><div class="breed-body"><div class="breed-row"><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed1.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].genotype+'</h4><p>GENOTYPE</p></div></div><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed2.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].bloodline+'</h4><p>BLOODLINE</p></div></div></div><div class="breed-row"><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed3.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].number_of_races+'</h4><p>RACES</p></div></div><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed4.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].win_rate+'%</h4><p>WIN RATE</p></div></div><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed5.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].career.first+' ∙ '+horses[i].career.second+' ∙ '+horses[i].career.third+'</h4><p>CAREER</p></div></div></div><div class="view-btn"><a href="#"><img src="assets/images/icon/view-btn.png" alt="icon-img"><span>VIEW MORE STATS</span></a></div></div></div><!-- breed button --><div class="breed-group-btn"><div class="single-btn"><button><img src="assets/images/icon/bid.png" alt="icon-img"/> <p>bid</p></button><span>Can Breed In: <strong><br> 8 DAYS</strong></span></div><div class="single-btn active"><button><img src="assets/images/icon/breed.png" alt="icon-img"/> <p>breed</p></button><span>Can Breed In: <strong><br> 8 DAYS</strong></span></div></div><!-- Contact button --><div class="view-btn-contact"><a href="#">Contact</a></div><!-- partner checker --><div class="partner-checker"><p>You can check it out also in:</p><div class="partner-checker-items"><ul><li><a href="#"><img src="assets/images/banner/ZED-Run-Logo1.png" alt="icon-img"></a></li><li><a href="#"><img src="assets/images/banner/logo-ha-2.png" alt="icon-img"></a></li><li><a href="#"><img src="assets/images/banner/Union.png" alt="icon-img"></a></li></ul></div></div></div></div></div>');
    }

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
}


