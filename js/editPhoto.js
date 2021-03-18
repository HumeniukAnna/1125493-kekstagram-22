//масштаб
const scaleControlSmaller = document
  .querySelector('.scale__control--smaller');
const scaleControlBigger = document
  .querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const config = {
  grayscale: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },

  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },

  invert: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },

  blur: {
    range: {
      min: 0,
      max: 3,//px
    },
    start:3,
    step: 0.1, //px
  },

  brightness: {
    range: {
      min: 1,
      max: 3,
    },
    start:3,
    step: 0.1,
  },
}
let scalePicture = function (number) {
  imgPreview.style.transform = `scale(${number/100})`;
};
//маштаб
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

//ползунок
// eslint-disable-next-line no-undef
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider
  .on('update', (values, handle) => {
    valueElement.value = values[handle];
  });

//эффект
let allEffects = document.querySelector('.img-upload__effects'); //найти родителя
let effect = document.querySelector('.img-upload__preview');
let modifiedPic = effect.querySelector('img');
let effectChangeHandler = function (evt) {
  if (evt.target.matches('input[type="radio"]')) {
    let effectValue = evt.target.value;
    let newEffect = 'effects__preview--' + effectValue;
    modifiedPic.className = (newEffect);
    sliderElement.noUiSlider.updateOptions(config['effectValue']);
  }
};

allEffects.addEventListener('change', effectChangeHandler);

//выбран оригинал - sliderElement.noUiSlider.destroy();
