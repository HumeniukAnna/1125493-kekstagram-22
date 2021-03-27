
import {showBigPicture} from './popup.js';
import {getData} from './network.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//должна брать данные из параметров

const makePic = (photos) => {
  photos.forEach((photo) => {
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
    showBigPicture(pictureElement, photo);
  })
};

const onError = (onFail) => {
  console.log('ошибка', onFail);
}
getData(makePic,onError);

