import {isEscEvent} from './util.js';
import {clearForm} from './edit-photo.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const form = document.querySelector('.img-upload__overlay');
const cancel = document.querySelector('.img-upload__cancel');
const preview = document.querySelector('.img-upload__preview')
  .getElementsByTagName('img')[0];

fileChooser.oninput = () => {
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
  //сбросить введенные значения
  clearForm();
};

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});


export {closeFormModal};
