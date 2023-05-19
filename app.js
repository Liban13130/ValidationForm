const validationIcons = document.querySelectorAll('.icon-check');
const validattionText = document.querySelectorAll('.error-msg');

const userInput = document.querySelector('.input-group:nth-child(1) input')

userInput.addEventListener('blur', userValidation) // C'est quand on enleve le focus de l'élément en question. L'input dans ce cas la.
userInput.addEventListener('input', userValidation) // Quand on ecrit dans l'input.


function showValidation({index, validation}){
    if(validation){
        validationIcons[index].style.display = "inline"
        validationIcons[index].src = "ressources/check.svg"
        if(validattionText[index]) validattionText[index].style.display = "none"
    } else{
        validationIcons[index].style.display = "inline"
        validationIcons[index].src = "ressources/error.svg"
        if(validattionText[index]) validattionText[index].style.display = "block"
    }
}

function userValidation(){
    if(userInput.value.length >= 3){
        showValidation({index: 0, validation: true})
    } else{
        showValidation({index: 0, validation: false})
    }
}

const mailInput = document.querySelector('.input-group:nth-child(2) input')

mailInput.addEventListener('blur', mailValidation) // C'est quand on enleve le focus de l'élément en question. L'input dans ce cas la.
mailInput.addEventListener('input', mailValidation) // Quand on ecrit dans l'input.

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mailValidation(){
    if(regexEmail.test(mailInput.value)){
        showValidation({index: 1, validation: true})
    }else{
        showValidation({index: 1, validation: false})
    }
}

const passwordInput = document.querySelector('.input-group:nth-child(3) input')

passwordInput.addEventListener('blur', passwordValidation) // C'est quand on enleve le focus de l'élément en question. L'input dans ce cas la.
passwordInput.addEventListener('input', passwordValidation) // Quand on ecrit dans l'input.


const passwordVerification = {
    length: false,
    number: false,
    symbol: false
}

const regexList = {
   symbol: /[^a-zA-Z0-9\s]/,
   number: /[0-9]/,
}

let passwordValue;

function passwordValidation(e){
    passwordValue = passwordInput.value
    let validationResult = 0
    for (const prop in passwordVerification) {

       if(prop === "length"){
        if(passwordValue.length < 6){
            passwordVerification.length = false
        }else{
            passwordVerification.length = true
            validationResult++
        }
        continue;
       }

       if(regexList[prop].test(passwordValue)){
        passwordVerification[prop] = true
        validationResult++
       }else{
        passwordVerification[prop] = false
       }
    }

    if(validationResult !== 3){
        showValidation({index: 2, validation: false})
    }else{
        showValidation({index: 2, validation: true})
    }
    passwordStrengh()
}

const lines = document.querySelectorAll('.lines div') //Appelle toutes les div dans la div lines

function passwordStrengh(){
    const passwordLength = passwordInput.value.length;

    if(!passwordLength){
        addLines(0)
    }else if(passwordLength > 12 && passwordVerification.symbol && passwordVerification.number){
        addLines(3)
    }else if(passwordLength > 9 && passwordVerification.symbol && passwordVerification.number){
        addLines(2)
    }else if(passwordLength > 6 && passwordVerification.symbol && passwordVerification.number){
        addLines(1)
    }
    function addLines(numberOfLines){
        lines.forEach((el, index)=>{
            if(index < numberOfLines){
                el.style.display = "block"
            }else{
                el.style.display = "none"
            }
        })
    }
    if(validationIcons[3].style.display = "inline"){
        confirmPassword()
    }
}


const confirmInput = document.querySelector('.input-group:nth-child(4) input')

 // C'est quand on enleve le focus de l'élément en question. L'input dans ce cas la.
confirmInput.addEventListener('input', confirmPassword) // Quand on ecrit dans l'input.

function confirmPassword(){
    const confirmedValue = confirmInput.value;
    
    if(!confirmedValue && !passwordValue){
        validationIcons[3].style.display = "none"
    }
    else if(confirmedValue !== passwordValue){
        showValidation({index: 3, validation: false})
    }
    else{
        showValidation({index: 3, validation: true})
    }
}








// const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

// function passwordValidation(){
//     if(passwordRegex.test(passwordInput.value)){
//         showValidation({index: 2, validation: true})
//     } else{
//         showValidation({index: 2, validation: false})
//     }
// }  Marche de cette façon aussi 