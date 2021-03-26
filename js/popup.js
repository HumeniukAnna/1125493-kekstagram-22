import {isEscEvent} from './util.js';
// import {descriptionTextArea} from './form.js';

const popup = document.querySelector('.big-picture');

const showBigPicture = (pictureElement, photo) => {
  pictureElement.addEventListener('click', function (){
    popup.classList.remove('hidden');
    const preview = popup.querySelector('.big-picture__preview');

    preview.querySelector('.big-picture__img')
      .querySelector('img')
      .src = photo.url;

    const social = preview.querySelector('.big-picture__social');

    social.querySelector('.social__likes')
      .querySelector('.likes-count')
      .textContent = photo.likes;

    social.querySelector('.social__comment-count')
      .querySelector('.comments-count')
      .textContent = photo.comments.length;

    social.querySelector('.social__header')
      .querySelector('.social__caption')
      .textContent = photo.description;

    social.querySelector('.social__comment-count')
      .classList.add('hidden');
    social.querySelector('.comments-loader')
      .classList.add('hidden');

    photo.comments.forEach((comment) => {
      const comments = social.querySelector('.social__comments');
      const commentElement = comments.querySelector('.social__comment')
        .cloneNode(true);
      commentElement.querySelector('.social__picture')
        .src = comment.avatar;
      commentElement.querySelector('.social__picture')
        .alt = comment.name;
      commentElement.querySelector('.social__text')
        .textContent = comment.message;

      comments.appendChild(commentElement);
    })
    openUserModal();
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
};

export {showBigPicture} ;
