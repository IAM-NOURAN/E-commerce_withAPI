
////////////////////// slide show ///////////////////////
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


//////////////////// check login //////////////////////////////

function isLoggedIn(){
    let user = localStorage.getItem("loggedInUser");
    return user ? true : false;
}

document.addEventListener("click", function(e){

    let shopBtn = e.target.closest(".shop-link");
    let cartBtn = e.target.closest(".cart a, .cart-icon img")
    let shopNowBtn = e.target.closest(".shop-now-btn");
    let quickBtn = e.target.closest('.quick-btn, .quick-btn *');

    if(!isLoggedIn() && (shopBtn || cartBtn || shopNowBtn || quickBtn)){
        e.preventDefault();
        window.location.href = "../html/login.html"; 
 
    return;
}


});




/////////////////////// fake products API///////////////////////

let container = document.getElementById("products_container");

let xhr = new XMLHttpRequest();
xhr.onload = function(){
    if(this.status == 200){
        let products = JSON.parse(this.responseText);
        console.log(products);
        let limit = Math.min(products.length, 4);
        
        for(let i = 0; i < limit; i++){
            let p = products[i];
            let id = p.id;
            let productUrl = `../html/cart.html?id=${encodeURIComponent(id)}`;
            let product = document.createElement("div");
            product.classList.add("product");
            product.innerHTML = `
                <div class="product-img">
                    <img src="${p.photo1}" alt="${p.name}">
                    <button class="quick-btn" data-id="${p.id}">Quick Overview</button>
                </div>
                <div class="product-info">
                    <div class="text">
                        <h4>${p.name}</h4>
                        <p>$${p.price}</p>
                    </div>
                </div>
                <div class="cart-icon">
                    <a href="${productUrl}"><img src="..\\images\\home\\shopping-cart.png" alt="Add to Cart"></a>
                </div>
            `;
            container.appendChild(product);
        }
        
    }
    else{
        console.log("Failed to fetch products");
    }

};
xhr.open("GET","https://69ab3a51e051e9456fa39c75.mockapi.io/api/clothes/products",true);
xhr.send();


////////////////////details overlay && API//////////////////////////////

let detailsOverlay = document.getElementById('overlay');
detailsOverlay.addEventListener('click', (e) => {
    if (e.target === detailsOverlay) {
        detailsOverlay.style.display = 'none';
    }
});


/////////////////////////////details overlay functionality (open, close, increment, decrement, and image flipping)/////////////////////////////

let mywind = document.getElementById('overlay');
let close = document.getElementById("close");

// إغلاق النافذة
close.addEventListener('click', () => {
    mywind.style.display = 'none';
});

// (Increment and Decrement)
let inc = document.getElementById("btn-inc");
let dec = document.getElementById("btn-dec");
let num = document.getElementById("numinput");

inc.addEventListener('click', () => { num.stepUp(1); });
dec.addEventListener('click', () => { num.stepDown(1); });

document.addEventListener('click', function(e) {
    
    // 1. when clicking Quick Overview
    let detailsBtn = e.target.closest('.quick-btn');
    if (detailsBtn) {
        let productid = detailsBtn.getAttribute('data-id');
        if (!productid) return;

        mywind.style.display = 'inline'; 

//////////////////////////////////api call to get the details of the product and draw them in the overlay//////////////////////////////////////

        let xhrDetails = new XMLHttpRequest();
        xhrDetails.onload = function() {
            if(this.status == 200){
                let productDetails = JSON.parse(this.responseText);
                
                let detailsContainer = document.getElementById('photos');

                //////////add to cart button with the product id in the url//////////
                let addtocartBtn = document.getElementById('addtocart');
                addtocartBtn.innerHTML = `
                <a href="../html/cart.html?id=${encodeURIComponent(productDetails.id)}">
                <button id="add">ADD TO CART</button>
                </a>`;
                
                /////////////draw the photos in the overlay/////////////
                detailsContainer.innerHTML = `
                <div>
                    <div class="options active" data-index="1">
                        <img src="${productDetails.photo1}" alt="">
                    </div>
                    <div class="options" data-index="2">
                        <img src="${productDetails.photo2}" alt="">
                    </div>
                    <div class="options" data-index="3">
                        <img src="${productDetails.photo3}" alt="">
                    </div>
                </div>

                <div id="bigscreen">
                    <img src="${productDetails.photo1}" alt="" id="screen" data-current-index="1">
                    <button id="next"><i class="fa fa-chevron-right" aria-hidden="true" style="color: white; pointer-events: none;"></i></button>
                    <button id="prev"><i class="fa fa-chevron-left" aria-hidden="true" style="color: white; pointer-events: none;"></i></button>
                    <a id="zoom"><i class="fa fa-expand" aria-hidden="true"></i></a>
                </div>`;
                
                let screenObj = document.getElementById('screen');
                screenObj.photosArray = [productDetails.photo1, productDetails.photo2, productDetails.photo3];

            } else {
                console.log("Failed to fetch product details.");
            }
        };
        
        xhrDetails.open("GET", `https://69ab3a51e051e9456fa39c75.mockapi.io/api/clothes/products/${productid}`, true);
        xhrDetails.send();
    }

    let optionClick = e.target.closest('.options');
    if (optionClick) {
        let screen = document.getElementById("screen");
        let allOptions = document.querySelectorAll('.options');
        
        allOptions.forEach(op => op.classList.remove('active'));
        optionClick.classList.add('active');
        
        screen.src = optionClick.querySelector('img').src;
        // 
        screen.setAttribute('data-current-index', optionClick.getAttribute('data-index'));
    }

    // 3.  زر Next
    if (e.target.id === 'next') {
        let screen = document.getElementById("screen");
        let photos = screen.photosArray; // المصفوفة التي حفظناها مسبقاً
        let currentIndex = parseInt(screen.getAttribute('data-current-index'));
        
        let newIndex = currentIndex >= photos.length ? 1 : currentIndex + 1;
        
        screen.src = photos[newIndex - 1];
        screen.setAttribute('data-current-index', newIndex);
        updateActiveThumbnail(newIndex);
    }

    // 4.  زر Prev
    if (e.target.id === 'prev') {
        let screen = document.getElementById("screen");
        let photos = screen.photosArray;
        let currentIndex = parseInt(screen.getAttribute('data-current-index'));
        
        let newIndex = currentIndex <= 1 ? photos.length : currentIndex - 1;
        
        screen.src = photos[newIndex - 1];
        screen.setAttribute('data-current-index', newIndex);
        updateActiveThumbnail(newIndex);
    }
});

//  لتحديث تحديد الصورة المصغرة عند استخدام أسهم التقليب
function updateActiveThumbnail(index) {
    let allOptions = document.querySelectorAll('.options');
    allOptions.forEach(op => {
        op.classList.remove('active');
        if (parseInt(op.getAttribute('data-index')) === index) {
            op.classList.add('active');
        }
    });

}



///////////////////////////////////Nouran previous code for the overlay (before adding the API)////////////////////////////////////
/*
// Use event delegation for quick-btn
let mywind = document.getElementById('overlay');
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-btn')) {
        mywind.style.display = 'inline';
    }
});

//details
let options= document.getElementsByClassName("options");
let screen = document.getElementById("screen");
let next= document.getElementById("next");
let prev= document.getElementById("prev");


for(let op of options){
    op.addEventListener('click',(e)=>{
        screen.src=e.target.src;
        for(let op2 of options){
        op2.classList.remove("active") }
        op.classList.add("active")
        })
    }

next.addEventListener('click',()=>{
    let source = parseInt(screen.src.split('product-detail-')[1].split('.')[0]);
    let i= source+1>3? 1 :source+1;
    screen.src=`../images/product-detail-0${i}.jpg`;
    
})

prev.addEventListener('click',()=>{
    let source = parseInt(screen.src.split('product-detail-')[1].split('.')[0]);
    let i= source-1<1? 3 :source-1;
    screen.src=`../images/product-detail-0${i}.jpg`;
})

let inc = document.getElementById("btn-inc");
let dec = document.getElementById("btn-dec");
let num = document.getElementById("numinput");

inc.addEventListener('click',()=>{
    num.stepUp(1);
})

dec.addEventListener('click',()=>{
    num.stepDown(1);
})

let close =document.getElementById("close");
close.addEventListener('click',()=>{
    mywind.style.display='none';
})

// let zoom = document.getElementById("zoom");
// let copy = screen;
// zoom.addEventListener('click',()=>{
//     copy.classList.add("zoomMode");
// })

*/
