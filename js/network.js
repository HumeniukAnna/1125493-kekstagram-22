import {setPicFormSubmit} from './form.js';
import {closeFormModal} from './uploadFile.js';


const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onFail(err);
    })
};

setPicFormSubmit(closeFormModal);

export {getData};
