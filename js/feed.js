/* global _:readonly */
import {showBigPicture} from './popup.js';
import {getData} from './network.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

//должна брать данные из параметров
const RENDER_DELAY = 500;

const makePic = (photos) => {
  const renderPhotos = (photos) => {
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

  renderPhotos(photos);
  filterBlock.classList.remove('img-filters--inactive');

  const clearPhotoList = () => {
    document.querySelectorAll('.picture')
      .forEach(el => el.remove());
  };

  filterDefaultButton.addEventListener('click', _.debounce(() => {
    clearPhotoList();
    renderPhotos(photos);
  }, RENDER_DELAY));

  filterRandomButton.addEventListener('click', _.debounce(() => {
    const randomPhotos = _.sampleSize(photos, 10);
    clearPhotoList();
    renderPhotos(randomPhotos);
  }, RENDER_DELAY));

  filterDiscussedButton.addEventListener('click', _.debounce(() => {
    const discussedPhotos = _.sortBy(photos, 'comments.length').reverse();
    clearPhotoList();
    renderPhotos(discussedPhotos);
  }, RENDER_DELAY));

};


const onError = (onFail) => {
  console.log('ошибка', onFail);
};

getData(makePic, onError);

