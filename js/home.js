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

// fake products API
let container = document.getElementById("products_container");

let xhr = new XMLHttpRequest();
xhr.onload = function(){
    if(this.status == 200){
        let products = JSON.parse(this.responseText);
        console.log(products);
        let limit = Math.min(products.length, 4);
        
        for(let i = 0; i < limit; i++){
            let p = products[i];
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
                    <img src="..\\images\\home\\shopping-cart.png" alt="">
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
