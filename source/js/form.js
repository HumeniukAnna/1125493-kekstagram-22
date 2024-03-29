import {isEscEvent} from './util.js';

const MAX_DESCRIPTION_LENGTH = 140;
const descriptionTextArea = document.querySelector('.text__description');
const hashtagsInput = document.querySelector('.text__hashtags');

//проверяем комментарий
descriptionTextArea.addEventListener('input', () => {
  const valueLength = descriptionTextArea.value.length;
  if (valueLength > MAX_DESCRIPTION_LENGTH) {
    descriptionTextArea.setCustomValidity('Удалите лишние ' + (valueLength - MAX_DESCRIPTION_LENGTH) + ' симв.');
  } else {
    descriptionTextArea.setCustomValidity('');
  }
  descriptionTextArea.reportValidity();
});

//остановить всплытие обработчика

descriptionTextArea.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)){
    evt.stopPropagation();
  }
});

hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

// //проверка хештега
hashtagsInput.addEventListener('input', () => {
  const hashtags = hashtagsInput.value.split(/\s+/).filter(e => e);
  const hashtagMaxLength = 20;
  const hashtagsMaxAmount = 5;

  const checkUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  // один и тот же хэш-тег не может быть использован дважды
  hashtagsInput.setCustomValidity('');
  const uniqueHashtags = hashtags
    .map((elem) => elem.toUpperCase())
    .filter(checkUnique);
  if (hashtags.length > uniqueHashtags.length) {
    return hashtagsInput.setCustomValidity('hashtag cannot be used twice');
  }

  if (hashtags.length > hashtagsMaxAmount) {
    return hashtagsInput.setCustomValidity('no more than 5 hashtags');
  }
  hashtags.forEach(hashtag => {
    if (!hashtag.startsWith('#')) {
      return hashtagsInput.setCustomValidity('need #')
    }
    if (hashtag.length === 1) {
      return hashtagsInput.setCustomValidity('need more symbols');
    }
    if (hashtag.length > hashtagMaxLength) {
      return hashtagsInput.setCustomValidity('max length should be less then 20 symbols');
    }
    const regExp = /^#[a-zA-ZА-Яа-я0-9]+$/;
    const regexpHashtags = regExp.test(hashtag);

    if (!regexpHashtags) {
      return hashtagsInput.setCustomValidity('should be use only numbers and letters');
    }
  })

  descriptionTextArea.reportValidity();
});

const uploadForm = document.querySelector('.img-upload__form');

const setPicFormSubmit = (closeForm) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://22.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      closeForm();
      if (response.ok) {
        createSuccessMessage();
      } else {
        createErrorMessage();
      }
    })
      .catch(()=> {
        closeForm();
        createErrorMessage()
      })
  });
};

const createSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  const main = document.querySelector('main');
  main.appendChild(successMessage);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    main.removeChild(successMessage);
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.removeChild(successMessage);
    }
  });
};

const createErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const main = document.querySelector('main');
  main.appendChild(errorMessage);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    main.removeChild(errorMessage);
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.removeChild(errorMessage);
    }
  });
};

export {setPicFormSubmit, descriptionTextArea, hashtagsInput};
