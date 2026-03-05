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
    let source =String(screen.src).slice(46,47);
    console.log(source);
    let i;
    Number(source)+1>3?i=1:i=Number(source)+1;
    screen.src=`../images/product-detail-0${i}.jpg`;
    
})

prev.addEventListener('click',()=>{
    let source =String(screen.src).slice(46,47);
    // console.log(source);
    let i;
    Number(source)-1<1?i=3:i=Number(source)-1;
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
let mydev=document.getElementsByClassName("body");

close.addEventListener('click',()=>{
    mydev[0].classList.add("close")
})

// let zoom = document.getElementById("zoom");
// let copy = screen;
// zoom.addEventListener('click',()=>{
//     copy.classList.add("zoomMode");
// })