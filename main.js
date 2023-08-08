import {getAPI, postAPI} from "./modules/api.js";
import { renderComments} from "./modules/renderComments.js";
import { renderClickBtn } from "./modules/renderClickBtn.js";
const {log, warn} = console;
// ------------------
"use strict"
// Добавляем ДОМ элементы
// рендерим форму отправки

// 



let commentators = []; 
// let isAnswer = "";

renderClickBtn(commentators);


// массив людей оставивших комменты


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

// Функция добавления лайка




// Функция редактирования комментария
// const clickEventEditComment = () => {
//     const redirectElements = document.querySelectorAll(".red");
//     redirectElements.forEach((redirectElement, indexEl) => {
//         redirectElement.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const index = redirectElement.dataset.index;
//             const comment =  commentators[index];
//             if (comment.isEdit) {
//                 const edit = document.querySelector('.add-edit');
//                 comment.text = edit.value;
//                 if (comment.text.length === 0) {
//                     commentators.splice(index,1);
//                 }
//                 comment.isEdit = false;
//             } else {
//                 comment.isEdit = true;
//             }
//             renderComments();
//         })
//     })
// }


    

// рендер комментариев




renderComments(commentators);


const eventErrors = (element) => {
    return element
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
}

// Функция добавления нового комментария








log("It works!");


