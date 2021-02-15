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

const validateStringLength = (value, maxStringLength) => value.length < maxStringLength;

const COMMENT_SIZE = 7;

const PHOTO_SIZE = 25;

const getRandomArrayElement = (elements) => {
  return elements[generateRandomNumber(0, elements.length - 1)];
};

const generatePhotoArray = () => new Array(PHOTO_SIZE).fill(null).map(() => createPhoto());

let photoId = 0;
const createPhoto = () => {
  return {
    id: photoId++,
    url: 'photos/' + photoId + '.jpg',
    description: getRandomArrayElement(DESCRIPTION),
    likes: generateRandomNumber(15, 200),
    comments: new Array(COMMENT_SIZE).fill(null).map(() => createComment()),
  }
}

const DESCRIPTION = [
  'Поднимаю настроение мини–фотосессией.',
  'Любовь в каждом пикселе.',
  'Фото, заряженное на позитив.',
  'Улыбаюсь новому дню.',
  'Поймал дзен.',
];

let commentId = 0;
const createComment = () => {
  return {
    id: commentId++,
    avatar: 'img/avatar-' + generateRandomNumber(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

const NAMES = [
  'Frank',
  'Phillip',
  'Fiona',
  'Liam',
  'Carl',
  'Ian',
  'Debbie',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
