const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

const model = document.getElementById('emial-model');
const openBtn = document.querySelector('.main-btn');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click',  () => {
    model.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    model.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target === model){ 
        model.style.display = 'none';
    }
});

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

function showError(input, message){
    const formValidation = input.parentElement;
    formValidation.className = 'form-validation error';
    const errorMessage = formValidation.querySelector('p');
    errorMessage.innerText = message;
}

function showValid(input){
    const formValidation = input.parentElement;
    formValidation.className = 'form-validation valid';
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){

        if(input.value.trim() ===''){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showValid(input);
        }

    })
}

function checkLength(input, max, min){
    if(input.value.length < min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`);
    }else{
        showValid(input);
    }
}

function passwordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2,'Password do not match');
    }
}

function getFieldName(input){
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    checkRequired([name, email, password, passwordConfirm]);
    checkLength(name, 3, 8);
    checkLength(password, 8, 8);
    checkLength(passwordConfirm, 8, 8);
    passwordMatch(password, passwordConfirm);
})

//image galary

let galaryImages = document.querySelectorAll('.services-cell');
let gatLatestOpenImg;
let windowWidth = window.innerWidth;

galaryImages.forEach(function(image, index){
    image.onclick = function(){
        gatLatestOpenImg = index + 1;

        let container = document.body;
        let newImgWindow = document.createElement('div');
        container.appendChild(newImgWindow);
        newImgWindow.setAttribute('class', 'img-window');
        newImgWindow.setAttribute('onclick', 'closeImg()');

        let newImg = image.firstElementChild.cloneNode();
        newImgWindow.appendChild(newImg)
        newImg.classList.remove('services-cell_img');
        newImg.classList.add('popup-img');
        newImg.setAttribute('id', 'current-img');
    
        newImg.onload = function(){
            let newNextBtn = document.createElement('a');
            newNextBtn.innerHTML= '<i class="fas fa-chevron-right next"></i>';
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute('class', 'img-btn-next');
            newNextBtn.setAttribute('onclick', 'changeImg(1)');


            let newPrevBtn = document.createElement('a');
            newPrevBtn.innerHTML= '<i class="fas fa-chevron-left next"></i>';
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute('class', 'img-btn-prev');
            newPrevBtn.setAttribute('onclick', 'changeImg(0)');

        }
    
    }
})

function closeImg(){
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();
 
    
}

function changeImg(change){
    document.querySelector('#current-img').remove();
    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img')
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(change === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }else if(change === 0){
        calcNewImg = getLatestOpenedImg -1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }
    newImg.setAttribute('src','gallery/img-' + calcNewImg + '.jpg');
    newImg.setAttribute('class', 'popup-img');
    newImg.setAttribute('id', 'current-img');

    getLatestOpenedImg = calcNewImg;

}