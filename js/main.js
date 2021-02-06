const generateRandom = (from, to) => {
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

const validateLength = (value, maxStringLength) => value.length < maxStringLength;
