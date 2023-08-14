import {getAPI, myName} from "./modules/api.js";
import { renderComments} from "./modules/renderComments.js";
import { renderClickBtn } from "./modules/renderClickBtn.js";
import { commentators } from "./modules/comentators.js";
import { login } from "./modules/registration.js";

function renderUpp (turnOff) {
    const app = document.querySelector('.app');
    if(turnOff){
    app.innerHTML = ` <div class="container">
    <ul class="comments" id="commentsId">
        <!--comments on js-->
    </ul>  
    <div class="louder">
        <img class="louder" src="./loud.gif" alt="louding">
    </div>
    <div class=" add-form display-none" id="form">
        <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
        id="nameTextId"
        disabled
        value="${myName}"
        />
        <textarea
                type="textarea"
                class="add-form-text"
                placeholder="Введите ваш коментарий"
                rows="4"
                id="commentTextId"
        ></textarea>
        <div class="add-form-row">
            <button class="add-form-button" id="btnId">Написать</button>
        </div>
</div>`;

getAPI(commentators);
    // const answComment = () => {
    //     const comments = document.querySelectorAll('.comment-text');
    //     // const btnElement = document.getElementById("btnId"); 
    //     comments.forEach((comment,index) => {
    //         comment.addEventListener('click', () => {
    //             const inputText = document.getElementById("commentTextId"); 
    //             formBg.classList.add('comment-new-bg');
    //             const commentator = commentators[index];
    //             inputText.placeholder = `Введите Ответ Пользователю ${commentator.author.name}`;
    //             isAnswer = commentator.text;    
    //             indexOld = index;
    //         })
    //     });
    // } 
    renderComments(commentators);
    renderClickBtn();
    } else {
        login(turnOff) 
    
    }
}

export default renderUpp