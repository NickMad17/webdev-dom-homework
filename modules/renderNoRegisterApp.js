import { login } from "./registration.js";
import { getNoRegisterAPI } from "./api.js";
import { commentators } from "./comentators.js";
import { addDisplayNone } from "./displayNone.js";
export function renderNoRegisaterApp () {
    const app = document.querySelector('.app');
    app.innerHTML = 
        `<div class="container">
            <ul class="comments" id="commentsId">
                <!--comments on js-->
            </ul>  
            <div class="louder">
                <img class="louder" src="./loud.gif" alt="louding">
            </div>
        </div>`;

    const louder = document.querySelector('.louder')
    getNoRegisterAPI(commentators).then(() => {
        addDisplayNone(louder);
        const container = document.querySelector('.container');
        container.innerHTML += `<p class='login-text'>Чтобы полноценно использовайть приложение<span class="login">Войдите</span></p>`
        const loginBtn = document.querySelector('.login');
        loginBtn.addEventListener('click', () => {
            login(false);
        })
    })




    

}

