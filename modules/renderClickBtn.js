import { addDisplayNone, remuveDisplayNone } from "./displayNone.js";
import { postAPI } from "./api.js";
export function renderClickBtn () {
    const inputName = document.getElementById("nameTextId");
    const inputText = document.getElementById("commentTextId");
    const btnElement = document.getElementById("btnId");

    function btnErrAdd () {
        btnElement.classList.add("btn-error");
        setTimeout(() =>{
            btnElement.classList.remove("btn-error");
        },500)
    }

    function eraseInput(input) {
        input.addEventListener('input', () => {
        input.classList.remove('error');
        })
    }

    eraseInput(inputName);
    eraseInput(inputText);

    btnElement.addEventListener( 'click', () => {
    inputText.classList.remove("error");
    inputName.classList.remove("error");

    if (inputText.value.length === 0 && inputName.value.length === 0) {
        inputName.classList.add("error");
        inputText.classList.add("error");
        btnErrAdd()
        return;
    }

    if (inputName.value.length === 0) {
        inputName.classList.add("error");
        btnErrAdd();
        return;
    }

    if (inputText.value.length === 0) {
        inputText.classList.add("error");
        btnErrAdd()
        return;
    }
    // formBg.classList.remove('comment-new-bg');
    // inputText.placeholder = 'Введите ваш коментарий'
    const form = document.querySelector('.add-form');
    const louder = document.querySelector('.louder');
    addDisplayNone(form);
    remuveDisplayNone(louder);
    postAPI(inputName,inputText);
})
}