//Materialize stuff

// $(document).ready(function(){
// 	$('.tabs').tabs();
//   })

$(document).ready(function(){
    $('.collapsible').collapsible();
  });


// _________________JS__________________

//LOADING PAGE

let loading=document.querySelector(".loadingContainer");

window.addEventListener('load',function(){
  loading.parentNode.removeChild(loading);
});

//INTRO BUTTON

const introBtn= document.querySelector(".introBtn");
const landingPage= document.querySelector(".landingPage");

introBtn.addEventListener('click',()=>{
  landingPage.style.display="none";
  document.querySelector('body').style.overflow="visible";
});

introBtn.classList.add("introBtnShow");

//HAMBRGER MENU OPEN
const navBtn = document.getElementById("navbtn");
const navMen= document.querySelector(".listContainer");


navBtn.addEventListener('click',()=>{

  navBtn.classList.toggle("cross");
  navMen.classList.toggle("slide");
});

// _____________END OF JS______________

//__________________________GSAP________________________________

//into letters
gsap.to(".letter", { duration: 2, ease: "back", x: 2000,stagger: 0.3});

// _______________________END OF GSAP_____________________________

//_______________________OTHER_______________________-

// SMOOTH SCROLL
const scroll = new SmoothScroll('.nav a[href*="#"]', {
  speed: 800
});

//_______________________CONTACT_______________________-


document.querySelector(".card-toggle").addEventListener("click", function(){
	
	// Card toggle state 	
	document.querySelector(".card-toggle").classList.remove("active");
	document.querySelector(this).classList.add("active");
	
	var isAnimating = false;
	
	if( !isAnimating ){
		isAnimating = true;
		
		document.querySelector(".card").querySelector(".card-content").css("z-index",0);
		document.querySelector(".card").classList.remove("active");

		var that = document.querySelector(this);

		document.querySelector(this).siblings().css("z-index",1);

		setTimeout(function(){
			that.parent().classList.toggle("active").querySelector(".card-content").addEventListener("transitionend", function(){
				isAnimating = false;
			});	;
			
		},10);
	} else {
		return;
	}
});

document.querySelector("input,textarea").blur(function(){
	if( document.querySelector(this).value ){
		document.querySelector(this).parent().classList.add("filled");
	} else {
		document.querySelector(this).parent().classList.remove("filled");
	}
});

document.querySelector(".contact").addEventListener("click",function(){
	document.querySelector(".contact-form").classList.toggle("active");
});
document.querySelector(".contact-form input[type=submit], .contact-form .close").addEventListener("click",function(e){
	e.preventDefault();
	document.querySelector(".contact-form").classList.toggle("active")
});


//Materialize stuff




