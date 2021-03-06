import {generatePhotoArray} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photos = generatePhotoArray();

photos.forEach((photo)=> {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img')
    .src = photo.url;
  pictureElement.querySelector('.picture__info')
    .querySelector('.picture__likes')
    .textContent = photo.likes;
  pictureElement.querySelector('.picture__info')
    .querySelector('.picture__comments')
    .textContent = photo.comments.length;
  pictureList.appendChild(pictureElement);
})
