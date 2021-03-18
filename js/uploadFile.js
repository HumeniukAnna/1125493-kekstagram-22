import {closeElement, isEscEvent} from './util.js';

const input = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__overlay');
const cancel = document.querySelector('.img-upload__cancel')
const body = document.querySelector('body');

input.oninput = function () {
  form.classList.remove('hidden');
  body.classList.add('.modal-open');
}

closeElement(cancel, form);

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.querySelector('body')
      .classList.remove('modal-open');
    form.classList.add('hidden');
  }
})

//редактировать маcштаб

//эффект (слайдер)

