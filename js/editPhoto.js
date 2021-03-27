//масштаб
import {descriptionTextArea,hashtagsInput} from './form.js';

const scaleControlSmaller = document
  .querySelector('.scale__control--smaller');
const scaleControlBigger = document
  .querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const config = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },

  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    name:  'grayscale',
  },

  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    name: 'sepia',
  },

  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    name: 'invert',
  },

  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start:3,
    step: 0.1,
    name: 'blur',
  },

  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start:3,
    step: 0.1,
    name: 'brightness',
  },
}
let scalePicture = function (number) {
  imgPreview.style.transform = `scale(${number/100})`;
};

//масштаб
scaleControlSmaller.addEventListener('click', () => {
  let scaleControlValue = parseInt(scaleControl.value);
  if (scaleControlValue > 25) {
    scaleControl.value = scaleControlValue - 25 + '%';
  } else {
    scaleControl.value = '25%';
  }
  scalePicture(parseInt(scaleControl.value));
});

scaleControlBigger.addEventListener('click', () => {
  let scaleControlValue = parseInt(scaleControl.value);
  if (scaleControlValue < 100) {
    scaleControl.value = scaleControlValue + 25 + '%';
  } else {
    scaleControl.value = '100%';
  }
  scalePicture(parseInt(scaleControl.value));
});

let effectActive = config.none;

let allEffects = document.querySelector('.img-upload__effects'); //найти родителя
let effect = document.querySelector('.img-upload__preview');
let modifiedPic = effect.querySelector('img');
//ползунок
// eslint-disable-next-line no-undef
noUiSlider.create(sliderElement, Object.assign({
  connect: 'lower',
},effectActive));

sliderElement.noUiSlider
  .on('update', (values, handle) => {
    valueElement.value = values[handle];
    if (effectActive.name) {
      if(effectActive.name === 'blur') {
        modifiedPic.style.filter = effectActive.name + `(${values[handle] + 'px'})`;
      } else if (effectActive.name === 'invert') {
        modifiedPic.style.filter = effectActive.name + `(${values[handle] + '%'})`;
      } else {
        modifiedPic.style.filter = effectActive.name + `(${values[handle]})`;
      }
    }
    else  {
      modifiedPic.style.filter = 'none';
    }
  });

//эффект

let effectChangeHandler = function (evt) {
  if (evt.target.matches('input[type="radio"]')) {
    let effectValue = evt.target.value;
    document.querySelector('.effect-level')
      .classList.toggle('hidden', effectValue === 'none');
    let newEffect = 'effects__preview--' + effectValue;
    modifiedPic.className = (newEffect);
    effectActive = config[effectValue];
    sliderElement.noUiSlider.updateOptions(config[effectValue]);
  }
};
allEffects.addEventListener('change', effectChangeHandler);

//сбросить форму
let picUploadLine = document.querySelector('.img-upload__overlay')

const clearForm = () => {
  scaleControl.value = '100%';
  modifiedPic.style.filter = 'none';
  picUploadLine.classList.remove('.hidden');
  descriptionTextArea.value = ' ';
  hashtagsInput.value = ' ';
};

export {clearForm};
