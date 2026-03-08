
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
                    <button class="quick-btn">Quick Overview</button>
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


////////////////////details overlay//////////////////////////////

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

let addToCartBtn = document.querySelector('.add-to-cart-btn');
addToCartBtn.addEventListener('click', () => {
    pass

});





