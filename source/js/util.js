const generateRandomNumber = (from, to) => {
  if (from < 0 || to < 0) {
    throw new Error('Invalid parameters: should be positive or zero');
  }
  if (to < from) {
    throw new Error('Invalid parameters: "from" should be less then "to"');
  }
  if (from === to) {
    return from;
  }
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from)) + from;
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const ALERT_SHOW_TIME = 3000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {generateRandomNumber, isEscEvent,showAlert};
