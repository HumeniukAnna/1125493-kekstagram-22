import {isEscEvent} from './util.js';
// import {descriptionTextArea} from './form.js';

const popup = document.querySelector('.big-picture');
const allComments = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment').cloneNode(true);
const moreCommentsButton = document.querySelector('.comments-loader');
let commentsCounter = 0;

const renderComments = (comments) => {
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture')
      .src = comment.avatar;
    commentElement.querySelector('.social__picture')
      .alt = comment.name;
    commentElement.querySelector('.social__text')
      .textContent = comment.message;
    allComments.appendChild(commentElement);
  })
};

const clearComments = () => {
  document.querySelectorAll('.social__comment')
    .forEach(el => el.remove());
};

const showBigPicture = (pictureElement, photo) => {
  pictureElement.addEventListener('click', function () {
    popup.classList.remove('hidden');
    const preview = popup.querySelector('.big-picture__preview');

    preview.querySelector('.big-picture__img')
      .querySelector('img')
      .src = photo.url;

    document.querySelector('.social__likes')
      .querySelector('.likes-count')
      .textContent = photo.likes;

    document.querySelector('.social__comment-count')
      .querySelector('.comments-count')
      .textContent = photo.comments.length;

    document.querySelector('.social__header')
      .querySelector('.social__caption')
      .textContent = photo.description;
    moreCommentsButton.classList.remove('hidden');

    clearComments();
    renderComments(photo.comments.slice(0, 5));
    commentsCounter = Math.min(5, photo.comments.length);
    changeCurrentCommentCount();
    verifyCommentsCounter(photo);
    openUserModal();
  });

  moreCommentsButton.addEventListener('click', () => {
    console.log(commentsCounter);
    renderComments(photo.comments.slice(commentsCounter, commentsCounter + 5));
    commentsCounter = Math.min(commentsCounter + 5, photo.comments.length);
    changeCurrentCommentCount();
    verifyCommentsCounter(photo);
  });
};

const verifyCommentsCounter = (photo) => {
  if (commentsCounter === photo.comments.length) {
    moreCommentsButton.classList.add('hidden');
  }
};



const bigPictureCancel = document.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', () => {
  closeUserModal();
})

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  popup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = () => {
  popup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const changeCurrentCommentCount = () => {
  document.querySelector('.social__comment-count')
    .textContent = commentsCounter + ' из ';
};


export {showBigPicture} ;
