import {isEscEvent} from './util.js';

const input = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__overlay');
const cancel = document.querySelector('.img-upload__cancel')

input.oninput = function () {
  openFormModal();
};

cancel.addEventListener('click', () => {
  closeFormModal();
})

const onFormEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFormModal();
  }
};

const openFormModal = () => {
  form.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
};

const closeFormModal = () => {
  form.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  document.querySelector('.img-upload__preview').style ='trasform: scale(1);
};

export {closeFormModal};
