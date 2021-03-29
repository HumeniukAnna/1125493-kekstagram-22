import {isEscEvent} from './util.js';
// import {descriptionTextArea} from './form.js';

const popup = document.querySelector('.big-picture');
const allComments = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment').cloneNode(true);
const moreCommentsButton = document.querySelector('.comments-loader');
const commentsCountContainer = document.querySelector('.social__comment-count')
const currentCommentsContainer = commentsCountContainer.firstChild;
const allCommentsContainer = commentsCountContainer.firstElementChild;

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

let activePhoto;
let commentsCounter;
const addComments = () => {
  renderComments(activePhoto.comments.slice(commentsCounter, commentsCounter + 5));
  commentsCounter = Math.min(commentsCounter + 5, activePhoto.comments.length);

  moreCommentsButton.classList.toggle('hidden', commentsCounter >= activePhoto.comments.length);
  currentCommentsContainer.textContent = commentsCounter + ' из ';
}

const showBigPicture = (pictureElement, photo) => {
  pictureElement.addEventListener('click', function () {
    activePhoto = photo;
    commentsCounter = 0;

    popup.classList.remove('hidden');
    const preview = popup.querySelector('.big-picture__preview');

    preview.querySelector('.big-picture__img')
      .querySelector('img')
      .src = photo.url;

    document.querySelector('.social__likes')
      .querySelector('.likes-count')
      .textContent = photo.likes;

    allCommentsContainer.textContent = photo.comments.length;

    document.querySelector('.social__header')
      .querySelector('.social__caption')
      .textContent = photo.description;

    clearComments();
    addComments();
    openUserModal();

    moreCommentsButton.addEventListener('click', addComments);
  });
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
  moreCommentsButton.removeEventListener('click', addComments);
};

export {showBigPicture} ;
