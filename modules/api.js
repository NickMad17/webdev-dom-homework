import * as api from "./apiVars.js";
import { addDisplayNone, remuveDisplayNone } from "./displayNone.js";
import { saveUserToLocalStorage, getUserTokenLocalStorage, getUserNameLocalStorage } from "./localStorage.js";
import { renderComments, renderNoRegisterComments } from "./renderComments.js";
const {log, warn} = console;

let ADMIN_TOKEN = 'asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'

let myToken = getUserTokenLocalStorage();

const readingToken = (newToken) =>{
    myToken = newToken;
}

let myName = getUserNameLocalStorage();

const readingName = (newName) =>{
    myName = newName;
}

const getAPI = (commentators) => {
    const form = document.querySelector('.add-form');
    const louder = document.querySelector('.louder');
    remuveDisplayNone(louder);
    addDisplayNone(form);
    return fetch(
        api.URL_API,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        })
        .then(data => data.json())
        .then(dataJson => {
            commentators = dataJson.comments;
            if(ADMIN_TOKEN == myToken){                
                `<i class="bx bx-x del" data-index="0"></i>`
            }
            renderComments(commentators);
            return dataJson
        })
        .then(() => {
            remuveDisplayNone(form);
            addDisplayNone(louder);
        })
}


const postAPI = (inputName,inputText,commentators) => {
    const form = document.querySelector('.add-form');
    const louder = document.querySelector('.louder');
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
        headers: {
            Authorization: `Bearer ${myToken}`
        },
        body: JSON.stringify({
            name: inputName.value,
            text: inputText.value,
            forceError: true
        })
    })
        .then(res => {
            if(res.status === 201 || res.status === 200){
                remuveDisplayNone(form);
                addDisplayNone(louder);
                return res;
            } else if(res.status === 500){
                return Promise.reject(500);
            } else if(res.status === 400){
                
                return Promise.reject(400);
            } else {
                return Promise.reject('Неизвестная ошибка');
            }
        })
        .then(() => {
            return getAPI(commentators);
        })
        .then(() => {

            inputText.value = "";
        })
        .catch((err) => {
            if(err === 400){
                remuveDisplayNone(form);
                addDisplayNone(louder);
                addError('Коментарий должен быть не меньше трех символов');
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
                remuveDisplayNone(form);
                addDisplayNone(louder);
                addError('Кажется что-то пошло не так')
                warn(err,'Неизвестная ошибка');
                inputName.classList.add('error');
                inputText.classList.add('error');
            }
        })
        
}

const postAddLike = (id) => {
    return fetch(
        `${api.URL_API}/${id}/toggle-like`,
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${myToken}`
        }
    })
}

const getNoRegisterAPI = (commentators) => {
    return fetch(
        api.URL_API,
        {
            method: "GET"
        })
        .then(data => data.json())
        .then(dataJson => {
            commentators = dataJson.comments;
            renderNoRegisterComments(commentators);
            return dataJson
        })
}

const loginAPI = (loginName, password) => {
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
        api.URL_Autorization,
        {
            method: "POST",
            body: JSON.stringify({
                login: loginName.value,
                password: password.value
            })
        })
        .then(data => {
            if(data.status !== 201 && data.status !== 200){
                return new Promise.reject(data.status);
            }
            return data.json()
        })
        .then(data => {
            const {user} = data;
            saveUserToLocalStorage([user.token, user.name, 'true']);
            return [user.token, user.name];
        })
        .then((user) => {
            readingToken(user[0]);
            readingName(user[1]);
        })
        .then(() => true)
        .catch(() => {
            loginName.classList.add('error');
            password.classList.add('error');
            addError('Такого пользователя нет');
            return false;
        })
}

const registerAPI = (loginName, name, password) => {
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
        api.URL_Registration,
        {
            method: "POST",
            body: JSON.stringify({
                login: loginName.value,
                name: name.value,
                password: password.value,
            })
        })
        .then(data => {
            log(loginName, name, password);
            if(data.status !== 201 && data.status !== 200){
                return new Promise.reject(data.status);
            }
            return data.json()
        })
        .then(data => {
            log(loginName, name, password);
            const {user} = data;
            saveUserToLocalStorage([user.token, user.name, 'true']);
            return [user.token, user.name];
        })
        .then((user) => {
            readingToken(user[0]);
            readingName(user[1]);
        })
        .then(() => true)
        .catch(() => {
            loginName.classList.add('error');
            password.classList.add('error');
            name.classList.add('error');
            addError('Такой пользователь уже существует');
            return false
        })
        
}

export {getAPI, postAPI, getNoRegisterAPI, postAddLike, loginAPI ,registerAPI, myName} 