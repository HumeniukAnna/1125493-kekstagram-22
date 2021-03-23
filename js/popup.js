import {isEscEvent, closeElement} from './util.js';
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
    document.querySelector('body').classList.add('modal-open');



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
  });
};


const bigPictureCancel = popup.querySelector('.big-picture__preview')
  .querySelector('.big-picture__cancel');


closeElement(bigPictureCancel, popup);

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.querySelector('body')
      .classList.remove('modal-open');
    popup.classList.add('hidden');
  }
});

export {showBigPicture} ;
