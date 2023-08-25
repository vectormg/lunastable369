const addresses=[
    '0x3ad789F3141970A834b807732e40eD1bEF67F587',
    '0xfd3c5b8be7783cd90169d2e4bc920833c14ab50f',
    '0x9e09632A26364FDD026bc3D1b92890D09Fe4d919',
    '0x571a2f2410fa7fbdca90b00538b539373d087514',
    '0x0Cf5b0c28C363312F2C72cBB3c0818022F04d92b'
];
const channelId='UCW8b6k-ylFIvMJy6LUxq4aQ';
const blogId='7017020234727177532';
const apiKey='AIzaSyAGDktiIBEq5PP_4fG-lqqr2ByQuphcufs';
let horses = [];


$(document).ready(function(){

    fillCarouselData();
	fillYoutubeData();
	fillBlogData();
    

    

   

   // Nav Toggle
    $('#toggleNav-icon').click(function(){
        $(this).toggleClass('open');
        $('.header-nav nav ul').slideToggle();
    });
	
	$("#send-message-button").click(function(){
         window.location.href = "mailto:lunastable369@gmail.com?subject="+document.getElementById('name').value+" - "+document.getElementById('select-topic').value+"&body="+document.getElementById('contact-message').value;
    });
	
	$("#send-message-button-breeding").click(function(){
         window.location.href = "mailto:lunastable369@gmail.com?subject="+document.getElementById('name').value+" - "+document.getElementById('mail').value+" - "+document.getElementById('select-topic').value+"&body="+document.getElementById('contact-message').value;
    });
	
});

async function getHorses(item){
	let offset = 0;
	let length = 0;
	do {
	  await $.get( "https://api.zed.run/api/v1/horses/get_user_horses?public_address="+item+"&offset="+offset, function( data ) {
		console.log(data);
        fillHorsesArray(data);
		length = data.length;
		offset += length;
		});
	} while (length === 10 ); 
    

    await $.get( "https://api.zed.run/api/v1/horses/get_user_lending_marketplace_horses?public_address="+item+"&offset=0", function( data ) {
        fillHorsesArray(data);
    });

}

function fillHorsesArray(data){
    $.each( data, function( key, value ) {
        
        let dateArray = value.tx_date.split('-');
        
        let horse = {
            id:value.horse_id,
            name:value.hash_info.name,
            bloodline:value.bloodline,
            genotype:value.genotype,
            number_of_races:value.number_of_races,
            win_rate:value.win_rate,
            career:value.career,
            img_url:value.img_url,
            tx_date:dateArray[2].split('T')[0]+'/'+dateArray[1]+'/'+dateArray[0]+' '+dateArray[2].split('T')[1].slice(0,-1),
            horse_type:value.horse_type,
            orderByBirth:dateArray[0]+''+dateArray[1]+''+dateArray[2].split('T')[0],
			color:value.hash_info.hex_code,
			breedType:value.breed_type,
			class:value.class
        };
        horses.push(horse);
    });
}

async function fillCarouselData(){
    for (let i = 0; i < 5; i++) {
        let data = await getHorses(addresses[i]);
    }
    for (let i = 0; i < 5; i++) {
        $('.hero-carousel').append('<div><div class="col-md-7" style="float:left;"><div class="hero-carousel-img"><img src="'+horses[i].img_url+'" alt="carousel-img"></div><!-- banner-offer --><div class="banner-offer"><h3 class="banner-title-lg">“'+horses[i].name+'”</h3><h3 class="banner-title-sm">'+horses[i].name+'</h3><div class="banner-offer-text"><span>'+horses[i].horse_type+'</span><p>Born: '+horses[i].tx_date+'</p></div></div></div><div class="col-md-5" style="float:right;"><div class="breed-content-items"><div class="hero-breed"><div class="breed-header"><span><img src="assets/images/icon/locat.png" alt="icon-img"></span><p>Breed '+horses[i].breedType+' • class '+horses[i].class+'</p><span class="bread-circle" style="background: #'+horses[i].color+';"></span></div><div class="breed-body"><div class="breed-row"><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed1.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].genotype+'</h4><p>GENOTYPE</p></div></div><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed2.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].bloodline+'</h4><p>BLOODLINE</p></div></div></div><div class="breed-row"><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed3.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].number_of_races+'</h4><p>RACES</p></div></div><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed4.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].win_rate+'%</h4><p>WIN RATE</p></div></div><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed5.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].career.first+' ∙ '+horses[i].career.second+' ∙ '+horses[i].career.third+'</h4><p>CAREER</p></div></div></div><div class="view-btn"><a href="https://zed.run/racehorse/'+horses[i].id+'"><img src="assets/images/icon/view-btn.png" alt="icon-img"><span>VIEW MORE STATS</span></a></div></div></div><!-- breed button --><div class="breed-group-btn"><div class="single-btn"><button><img src="assets/images/icon/bid.png" alt="icon-img"/> <p>bid</p></button></div><div class="single-btn active"><button onclick="location.href=\'https://zed.run/'+horses[i].id+'/select-mate\';"><img src="assets/images/icon/breed.png" alt="icon-img"/> <p>breed</p></button></div></div><!-- Contact button --><div class="view-btn-contact"><a href="contact.html">Contact</a></div><!-- partner checker --><div class="partner-checker"><p>You can check it out also in:</p><div class="partner-checker-items"><ul><li><a href="https://zed.run/racehorse/'+horses[i].id+'"><img src="assets/images/banner/ZED-Run-Logo1.png" alt="icon-img"></a></li><li><a href="https://www.hawku.com/details/zed_run/zed_horse/'+horses[i].id+'"><img src="assets/images/banner/logo-ha-2.png" alt="icon-img"></a></li><li><a href="https://knowyourhorses.com/horses/'+horses[i].id+'"><img src="assets/images/banner/Union.png" alt="icon-img"></a></li></ul></div></div></div></div></div>');
    }

    horses.sort(GetSortOrder('orderByBirth'));
    console.log(horses);

    for (let i = 0; i < 10; i++) {
        $('.newcomers-carousel').append('<div class="newcomers-single-item"><div class="newcomers-image"><img src="'+horses[i].img_url+'" alt=""></div><div class="newcomers-title"><h4>'+horses[i].name+'</h4><p>Born: '+horses[i].tx_date+'</p></div><div class="hero-breed"><div class="breed-header"><span><img src="assets/images/icon/locat.png" alt="icon-img"></span><p>Breed '+horses[i].breedType+' • class '+horses[i].class+'</p><span class="bread-circle circle-one" style="background: #'+horses[i].color+';"></span></div><div class="breed-body"><div class="breed-row"><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed1.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].genotype+'</h4><p>GENOTYPE</p></div></div><div class="breed-items"><div class="breed-single-icon"><img src="assets/images/icon/breed2.png" alt="ico-img"></div><div class="breed-single-text"><h4>'+horses[i].bloodline+'</h4><p>BLOODLINE</p></div></div></div><div class="view-btn"><a href="https://zed.run/racehorse/'+horses[i].id+'"><img src="assets/images/icon/Union.png" alt="icon-img"><span>VIEW MORE STATS</span></a></div></div></div></div>');
    }
	
	fillHorsesItemsAll(15);

    fillContactCarouselData();

    // Hero carousel
   $('.hero-carousel').owlCarousel({
        loop:true,
        autoplay:true,
        items:1,
        nav:true,
        autoplayTimeout:7000,
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
        autoplayTimeout:7000,
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

async function fillContactCarouselData(){
    horses.sort(GetSortOrder('orderByBirth'));

    for (let i = 0; i < 10; i++) {
        $('.contact-owlCarousel').append('<div class="newcomers-single-item"><div class="newcomers-image"><img src="'+horses[i].img_url+'" alt=""></div><div class="newcomers-title"><h4>'+horses[i].name+'</h4><p>Born: '+horses[i].tx_date+'</p></div><div class="hero-breed"><div class="breed-header"><span><img src="assets/images/icon/locat.png" alt="icon-img"></span><p>class '+horses[i].class+'</p><span class="bread-circle circle-two" style="background: #'+horses[i].color+';"></span></div></div></div>');
    }

    // contact-owlCarousel
   $('.contact-owlCarousel').owlCarousel({
    loop:true,
    autoplay:false,
    margin:20,
    nav:true,
    autoplayTimeout:7000,
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
    
}

async function fillHorsesItemsAll(size){
	$('.horses_items_all').empty();
    for (let i = 0; i < size; i++) {
        $('.horses_items_all').append('<div class="newcomers-single-item horses_singleitem" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="'+horses[i].id+'"><div class="newcomers-image horsesnewcomers_image"><img src="'+horses[i].img_url+'" alt=""></div><div class="newcomers-title"><h4>'+horses[i].name+'</h4><p>'+horses[i].breedType+' • Class '+horses[i].class+'</p></div><div class="hero-breed"><div class="breed-header"><span><img src="assets/images/icon/locat.png" alt="icon-img"></span><p>Class '+horses[i].class+'</p><span class="bread-circle circle-one" style="background: #'+horses[i].color+';"></span></div></div></div>');
    }
    
}

async function fillHorsesItemsAllNewHorses(size, newHorses){
	$('.horses_items_all').empty();
    for (let i = 0; i < size; i++) {
        $('.horses_items_all').append('<div class="newcomers-single-item horses_singleitem" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="'+horses[i].id+'"><div class="newcomers-image horsesnewcomers_image"><img src="'+newHorses[i].img_url+'" alt=""></div><div class="newcomers-title"><h4>'+newHorses[i].name+'</h4><p>'+newHorses[i].breedType+' • Class '+newHorses[i].class+'</p></div><div class="hero-breed"><div class="breed-header"><span><img src="assets/images/icon/locat.png" alt="icon-img"></span><p>Class '+newHorses[i].class+'</p><span class="bread-circle circle-one" style="background: #'+newHorses[i].color+';"></span></div></div></div>');
    }
}

$('#exampleModal').on('show.bs.modal', function(e) {

    //get data-id attribute of the clicked element
    let horseId = $(e.relatedTarget).data('id');

	let horse = horses.find(obj => {
	  return obj.id === horseId
	})
	console.log('---'+horse.id);
	$('#horses-modal-img').attr('src', horse.img_url);
	$('#horses-modal-name').text('“'+horse.name+'”');
	$('#horses-modal-name-sm').text(horse.name);
	$('#horses-modal-born').text(horse.tx_date);
	$('#horses-modal-genotype').text(horse.genotype);
	$('#horses-modal-bloodline').text(horse.bloodline);
	$('#horses-modal-races').text(horse.number_of_races);
	$('#horses-modal-winrate').text(horse.win_rate);
	$('#horses-modal-career').text(horse.career.first+' ∙ '+horse.career.second+' ∙ '+horse.career.third);
	$('#horses-modal-zed-anchor').attr('href', 'https://zed.run/racehorse/'+horse.id)
	$('#horses-modal-hawku-anchor').attr('href', 'https://www.hawku.com/details/zed_run/zed_horse/'+horse.id)
	$('#horses-modal-know-anchor').attr('href', 'https://knowyourhorses.com/horses/'+horse.id)
	$('#horses-modal-viewmorestats').attr('href', 'https://zed.run/racehorse/'+horse.id)
	
		
	document.getElementById("horses-modal-breedbutton").onclick = function () {
        location.href = "https://zed.run/"+horse.id+"/select-mate";
    };
	document.getElementById("horses-modal-bidbutton").onclick = function () {
        location.href = "https://zed.run/"+horse.id+"/select-mate";
    };
	
});

async function fillYoutubeData(){
    await $.get( "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+channelId+"&maxResults=10&order=date&type=video&key="+apiKey, function( data ) {
		let firstItem=true;
		$.each( data.items, function( key, item ) {
			if(key<6){
				console.log(item);
				
				let dateArray = item.snippet.publishTime.split('-');
				
				if(firstItem){
					//document.getElementById("race-principal").getElementsByTagName('img')[0].src=item.snippet.thumbnails.high.url;
					document.getElementById("race-principal").getElementsByTagName('iframe')[0].src="https://www.youtube.com/embed/"+item.id.videoId
					document.getElementById("race-principal-title").getElementsByTagName('h3')[0].innerHTML="<a href=\"https://www.youtube.com/watch?v="+item.id.videoId+"\" target=\"_blank\">"+item.snippet.title+"</a>";
					document.getElementById("race-principal-text").innerText=item.snippet.description;
					
					firstItem=false;
				}else{
					document.getElementById("race-site-items").innerHTML += "<div class=\"race-site-single\"><div class=\"race-image\"><a href=\"https://www.youtube.com/watch?v="+item.id.videoId+"\" target=\"_blank\"><img src=\""+item.snippet.thumbnails.medium.url+"\" alt=\"img\"></a></div><div class=\"race-text\"><h4><a href=\"https://www.youtube.com/watch?v="+item.id.videoId+"\" target=\"_blank\">"+item.snippet.title+"</a></h4><p>"+item.snippet.channelTitle+"</p><p>"+dateArray[2].split('T')[0]+'/'+dateArray[1]+'/'+dateArray[0]+"</p></div></div>"
					
				}
			}
			
			
		});
    });
}

async function fillBlogData(){
	
    await $.get( "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts?key="+apiKey, function( data ) {
		
		let firstItem=true;
		$.each( data.items, function( key, item ) {
			if(key<4){
				var regex = (/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/i);

				let str = item.content;
				let imgurl;
				if(new RegExp(regex).test(str)){
					imgurl = regex.exec(str)[1];
					
					console.log(imgurl);
					
					
				}
				
				if(firstItem){
					document.getElementById("ultimas-bottom-title").getElementsByTagName('p')[0].innerHTML=item.content;
					document.getElementById("ultimas-bottom-title").getElementsByTagName('h4')[0].innerHTML="<a href=\""+item.url+"\" target=\"_blank\">"+item.title+"</a>";
					
					firstItem=false;
				}else{
					document.getElementById("mas-post-item").innerHTML+="<div class=\"mas-single-item\"><img src=\""+imgurl+"\"><a href=\""+item.url+"\" target=\"_blank\"><p>"+item.title+"</p></a></div>"
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
    });
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}

function GetSortOrderAsc(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}

function viewAllHorses(){
	fillHorsesItemsAll(horses.length);
}

function horsesSort(){
	horses.sort(GetSortOrderAsc(document.getElementById('select-topic-sort').value));
	fillHorsesItemsAll(horses.length);
}

function horsesFilter(elementId){
	let filteredHorses = horses.filter(function(item){
			let filterValue = document.getElementById(elementId).value;
			if(filterValue === "1" || filterValue === "2" || filterValue === "3"){
				if(item.class==filterValue){
					return item;
				  }
			}
			if(filterValue === 'Nakamoto' || filterValue === 'Szabo' || filterValue === 'Finny' || filterValue === 'Buterin'){
				if(item.bloodline.toUpperCase()==filterValue.toUpperCase()){
					return item;
				  }
			}
			if(filterValue === 'Genesis' || filterValue === 'Legendary' || filterValue === 'Exclusive' || filterValue === 'Elite' || filterValue === 'Cross' || filterValue === 'Pacer'){
				if(item.breedType.toUpperCase()==filterValue.toUpperCase()){
					return item;
				  }
			}
			if(filterValue === 'Colt' || filterValue === 'Stallion' || filterValue === 'Filly' || filterValue === 'Mare'){
				if(item.horse_type.toUpperCase()==filterValue.toUpperCase()){
					return item;
				  }
			}
			
	});
	fillHorsesItemsAllNewHorses(filteredHorses.length, filteredHorses);
}

