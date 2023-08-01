const {log, error,warn} = console;
// ------------------
"use strict"
// Добавляем ДОМ элементы
const formBg = document.querySelector('.add-form'); 
let loud = false;
const URL_API = 'https://wedev-api.sky.pro/api/v1/:nikea/comments'

// рендерим форму отправки
const formRender =  () => {
    if(loud){
        if(!formBg.classList.contains('new-form')){
            formBg.classList.add('new-form');
        }
        formBg.innerHTML = `<img class="louder" src="./loud.gif" alt="louding">`
    } else {
        formBg.classList.remove('new-form');
        formBg.innerHTML = `<input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
        id="nameTextId"
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
        </div>`;
        renderClickBtn()
    }
}
// 
const cardElements = document.getElementById("commentsId");
const likeElement = document.getElementsByClassName("like-button");
const btnElement = document.getElementById("btnId");

let commentators = [];
let isAnswer = "";
// массив людей оставивших комменты
const getAPI = () => {
    loud = true;
    formRender();
    return fetch(
        URL_API,
        {
            method: "GET"
        })
        .then(data => data.json())
        .then(dataJson => {
            commentators = dataJson.comments;
            renderComments();
            return dataJson
        })
        .then(() => {
            loud = false;
            formRender();
        })
        
    }
getAPI()


const postAPI = (inputText,inputName) => {
    return fetch(
        URL_API,
    {
        method: "POST",
        body: JSON.stringify({
            text: inputText.value,
            name: inputName.value,
            forceError: true,
        })
    })
        .then(res => {
            if(res.status === 201 || res.status === 200){
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
            return getAPI();
        })
        .then(() => {
            return renderComments();
        })
        .catch((err) => {
            log(err);
            if(err === 400){
                addError('Имя и коментарий должны быть меньше трех символов')
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
                warn(err);
            }
        })
        
}



// const commentators = [
//     {
//         name: 'Глеб Фокин',
//         date: '12.02.22 12:18',
//         text: "Это будет первый комментарий на этой странице",
//         likes: 3,
//         isLiked: false,
//         isEdit: false,
//         isQuote: false,
//         animationClass: "",
//         isAnswers: "",
//         isReduction: false
        
//     },
//     {
//         name: 'Варвара Н.',
//         date: '13.02.22 19:22',
//         text: "Мне нравится как оформлена эта страница! ❤",
//         likes: 75,
//         isLiked: true,
//         isEdit: false,
//         isQuote: false,
//         animationClass: "",
//         isAnswers: "",
//         isReduction: false
//     }
// ]

// Вспомогательные функции

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

const addDate = (date) =>{
    date = new Date(date);
    let time = {
        hour: 'numeric',
        minute: 'numeric'
    };
    let year = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    }

    return  date.toLocaleString("ru", year) + " " + date.toLocaleString('ru', time);
}

const answComment = () => {
    const comments = document.querySelectorAll('.comment-text');
    
    // const btnElement = document.getElementById("btnId"); 
    comments.forEach((comment,index) => {
        comment.addEventListener('click', () => {
            const inputText = document.getElementById("commentTextId"); 
            formBg.classList.add('comment-new-bg');
            const commentator = commentators[index];
            inputText.placeholder = `Введите Ответ Пользователю ${commentator.author.name}`;
            isAnswer = commentator.text;    
            indexOld = index;
        })
    });
} 

// Функция добавления лайка
function addLike () {
    const like = document.querySelectorAll('.like-button');

    Array.from(likeElement).forEach((element,index) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            const commentator = commentators[index];
            if (commentator.isLiked === true) {
                like[index].classList.add('add-like');
                setTimeout(() => {
                    like[index].classList.remove('add-like');
                    commentator.isLiked = false;
                    commentator.likes -= 1;
                    renderComments();
                },400)
                
                
            } else {
                like[index].classList.add('add-like')
                setTimeout(() => {
                like[index].classList.remove('add-like')
                commentator.isLiked = true;
                commentator.likes += 1;
                renderComments()
                },400)
            }

        })
    })
}

// Функция редактирования комментария
const clickEventEditComment = () => {
    const redirectElements = document.querySelectorAll(".red");
    redirectElements.forEach((redirectElement, indexEl) => {
        redirectElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = redirectElement.dataset.index;
            const comment =  commentators[index];
            if (comment.isEdit) {
                const edit = document.querySelector('.add-edit');
                comment.text = edit.value;
                if (comment.text.length === 0) {
                    commentators.splice(index,1);
                }
                comment.isEdit = false;
            } else {
                comment.isEdit = true;
            }
            renderComments();
        })
    })
}


    const test = (index) =>{
        if (index === commentators[commentators.length - 2]) {
            return true;
        }
        return false;
    }


const getLikeClass = (element) => {
    return element ? "like-button -active-like" : "like-button";
}

// рендер комментариев

const renderComments = () => {
    const commentatorsHtml = commentators.map((commentator, index) => {
        return `<li id="#form" class="comment ">
      <div class="comment-header">
        <div>${commentator.author.name}</div>
        <div>${addDate(commentator.date)}</div>
      </div>
      <div class="comment-body">
            ${test(index) ? `<div class="c">${isAnswer}</div>`: ""}
          <div class="comment-text">${commentator.text}</div>
   
      <div class="comment-footer comment-footer_new">
       
          <span class="likes-counter">${commentator.likes}</span>
          <button class="${getLikeClass(commentator.isLiked)}"></button>
        </div>
      </div>
    </li>`;
    }).join("");
    cardElements.innerHTML = commentatorsHtml;
    // commentDel();
    addLike();
    // clickEventEditComment();
    // answComment();
    
}


renderComments();

const eventErrors = (element) => {
    return element
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
}

// Функция добавления нового комментария

function renderClickBtn () {

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

    postAPI(inputText,inputName);
    

    // commentators.push(
    //     {
    //         name: eventErrors(inputName.value),
    //         text: eventErrors(inputText.value),
    //         date: addDate(),
    //         likes: 0,
    //         animationClass: "comment_animation",
    //         isQuote: false,
    //         isAnswers: test(),
    //         isReduction: true
    //         }
    // )
    // btnCompete()

    

})
}



log("It works!");


