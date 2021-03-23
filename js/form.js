const descriptionTextArea = document.querySelector('.text__description');
const MAX_DESCRIPTION_LENGTH = 140;
const hashtagsInput = document.querySelector('.text__hashtags');

//проверяем комментарий
descriptionTextArea.addEventListener('input',() => {
  const valueLength = descriptionTextArea.value.length;
  console.log(valueLength,valueLength > MAX_DESCRIPTION_LENGTH);
  if (valueLength > MAX_DESCRIPTION_LENGTH) {
    descriptionTextArea.setCustomValidity('Удалите лишние ' + (valueLength - MAX_DESCRIPTION_LENGTH) +' симв.');
  } else {
    descriptionTextArea.setCustomValidity('');
  }
  descriptionTextArea.reportValidity();
});

descriptionTextArea.addEventListener('invalid', () => {
  if (descriptionTextArea.validity.tooLong) {
    descriptionTextArea.setCustomValidity('Комментарий не должен превышать 140 символов');
  } else {
    descriptionTextArea.setCustomValidity('');
  }
  //проверять на клик отправки формы?
  descriptionTextArea.reportValidity();
});

// //остановить всплытие обработчика
// descriptionTextArea.addEventListener('keydown', () => {
//   evt.stopPropagation();
// })
//
// //проверка хештега
// const hashtagInput=hashtagInput.value;
// const hashtagArray = hashtagsInput.split;
// //цикл и forEach?
//setCustomValidity('')

