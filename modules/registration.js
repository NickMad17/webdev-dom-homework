import renderUpp from "../renderApp.js";
import {loginAPI, registerAPI} from "./api.js"
import { renderNoRegisaterApp } from "./renderNoRegisterApp.js";
function login (){

        // --------------------------------- Sign in -----------------------------------------
    const app = document.querySelector('.app');

    function eraseInput(input) {
        input.addEventListener('input', () => {
        input.classList.remove('error');
        })
    }

    app.innerHTML = `<div class="login-container">
        <h2 class="login-title">Авторизация</h2>
        <div class="login-form">
            <label for="username" class="login-label">Логин:</label>
            <input type="text" id="username" name="username" class="login-input" required>
            <label for="password" class="login-label">Пароль:</label>
            <input type="password" id="password" name="password" class="login-input" required>
            <button type="submit" class="login-button">Войти</button>
            <button type="submit" class="login-button submit-noregister">Войти без авторизации</button>
            <p class='login-text'>Если вы не зарегестрированны, то<span class="login">регестрируйтесть</span></p>
        </div>
    </div>
    `;

    const trueBtn = document.querySelector('.login-button');
    const logiNameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    trueBtn.addEventListener('click', () => {
        eraseInput(logiNameInput);
        eraseInput(passwordInput);
        loginAPI(logiNameInput,passwordInput)
            .then((flag) => {
                if(flag){
                    renderUpp(true);
                }
            });     
    })

    const noRegisterBtn = document.querySelector('.submit-noregister');
    noRegisterBtn.addEventListener('click', () => {
        renderNoRegisaterApp();
    })
    
    const regBtn = document.querySelector('.login');
    regBtn.addEventListener('click', () => {
        // --------------------------------- Sign up -----------------------------------------
        app.innerHTML = 
        `<div class="login-container">
            <h2 class="login-title">Регистрация</h2>
            <div class="login-form">
                <label for="username" class="login-label">Логин:</label>
                <input type="text" id="username" name="username" class="login-input" required>
                <label for="loginame" class="login-label">Имя</label>
                <input type="text" id="loginname" name="loginame" class="login-input" required>
                <label for="password" class="login-label">Пароль:</label>
                <input type="password" id="password" name="password" class="login-input" required>
                <button type="submit" class="login-button">Присоединиться</button>
                <p class='login-text'>=><span class="login"> войти </span><=</p>
                
            </div>
        </div>`;
    
    const trueBtn = document.querySelector('.login-button');
    const logiNameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('loginname');
    trueBtn.addEventListener('click', () => {
        eraseInput(logiNameInput);
        eraseInput(nameInput);
        eraseInput(passwordInput);
        registerAPI(logiNameInput,nameInput,passwordInput)
            .then((flag) => {
                if(flag){
                    renderUpp(true);
                }
            });     
    })

    const resBtn = document.querySelector('.login');
    resBtn.addEventListener('click', () => {
       login()
        })
    })
}



export {login}

