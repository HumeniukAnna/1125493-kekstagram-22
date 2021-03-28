import {setPicFormSubmit} from './form.js';
import {closeFormModal} from './uploadFile.js';
import {showAlert} from './util.js';

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onFail(err);
      showAlert('Произошла ошибка.');
    })
};

setPicFormSubmit(closeFormModal);

export {getData};
