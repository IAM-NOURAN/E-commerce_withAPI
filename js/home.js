let slides = document.querySelectorAll(".slide");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
let index = 0;

function showSlide(i){

    slides.forEach(slide => {slide.classList.remove("active");});
    slides[i].classList.add("active");

}

nextBtn.onclick = function(){

    index++;

    if(index >= slides.length){
        index = 0;
    }

    showSlide(index);

}

prevBtn.onclick = function(){

    index--;

    if(index < 0){
        index = slides.length - 1;
    }

    showSlide(index);

}

setInterval(function(){

    index++;

    if(index >= slides.length){
        index = 0;
    }

    showSlide(index);

},4000); 