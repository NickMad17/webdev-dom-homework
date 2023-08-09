import * as api from "./apiVars.js";
import { addDisplayNone, remuveDisplayNone } from "./displayNone.js";
import { renderComments } from "./renderComments.js";
const {log, warn} = console;

const getAPI = (commentators) => {
    remuveDisplayNone(api.louder);
    addDisplayNone(api.form);
    return fetch(
        api.URL_API,
        {
            method: "GET"
        })
        .then(data => data.json())
        .then(dataJson => {
            commentators = dataJson.comments;
            renderComments(commentators);
            return dataJson
        })
        .then(() => {
            remuveDisplayNone(api.form);
            addDisplayNone(api.louder);
        })
}

const postAPI = (inputName,inputText,commentators) => {

    function addError(text){
        const errorForm = document.querySelector('.err-container');
        const delErr = document.querySelector('.del');
        const textEl = document.querySelector('.error__text')
        errorForm.classList.add('error-active');
        textEl.textContent = text;
        delErr.addEventListener('click', (e) => {
        errorForm.classList.remove('error-active');
        })
    }

    return fetch(
    api.URL_API,
    {
        method: "POST",
        body: JSON.stringify({
            text: inputText.value,
            name: inputName.value,

        })
    })
        .then(res => {
            if(res.status === 201 || res.status === 200){
                remuveDisplayNone(api.form);
                addDisplayNone(api.louder);
                return res;
            } else if(res.status === 500){
                remuveDisplayNone(api.form);
                addDisplayNone(api.louder);
                return Promise.reject(500);
            } else if(res.status === 400){
                remuveDisplayNone(api.form);
                addDisplayNone(api.louder);
                return Promise.reject(400);
            } else {
                remuveDisplayNone(api.form);
                addDisplayNone(api.louder);
                return Promise.reject('Неизвестная ошибка');
            }
        })
        .then(() => {
            return getAPI(commentators);
        })
        .then(() => {
            inputName.value = "";
            inputText.value = "";
        })
        .catch((err) => {
            if(err === 400){
                addError('Имя и коментарий должны быть не меньше трех символов')
                if(inputName.value.length < 3 && inputText.value.length < 3){
                    inputName.classList.add('error');
                    inputText.classList.add('error');
                } else if (inputText.value.length < 3){
                    inputText.classList.add('error');
                } else {
                    inputName.classList.add('error');
                }
                warn(err, "Ошибка ввода");
            } else if(err === 500){
                postAPI(inputName,inputText);
                warn(err, "Ошибка сервера")
            }   else{
                addError('Кажется что-то пошло не так')
                warn(err,'Неизвестная ошибка');
                inputName.classList.add('error');
                inputText.classList.add('error');
            }
        })
        
}

export {getAPI, postAPI} 