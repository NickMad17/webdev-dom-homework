import { addDate } from "./addDate.js";
import { addLike } from "./addLike.js";

const cardElements = document.getElementById("commentsId");

function renderComments (commentators) {
  const test = (index) =>{
        if (index === commentators[commentators.length - 2]) {
            return true;
        }
        return false;
    }
    const getLikeClass = (element) => {
        return element ? "like-button -active-like" : "like-button";
    }

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
    addLike(commentators, renderComments);   
    // clickEventEditComment();
    // answComment();
    
}

export {renderComments}