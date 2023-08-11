
const likeElement = document.getElementsByClassName("like-button");

export function addLike (commentators, renderComments) {
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
                    renderComments(commentators);
                },400)
                
                
            } else {
                like[index].classList.add('add-like')
                setTimeout(() => {
                like[index].classList.remove('add-like')
                commentator.isLiked = true;
                commentator.likes += 1;
                renderComments(commentators)
                },400)
            }

        })
    })
}