/* global _:readonly */
import {showBigPicture} from './popup.js';
import {getData} from './network.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');

//должна брать данные из параметров
const RENDER_DELAY = 500;

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

const makePic = (photos) => {
  renderPhotos(photos);
  filterBlock.classList.remove('img-filters--inactive');
  filterBlock.addEventListener('click',
    _.debounce((evt) => clickFilter(evt, photos), RENDER_DELAY))
};

const clearPhotoList = () => {
  document.querySelectorAll('.picture')
    .forEach(el => el.remove());
};

const clickFilter = (evt, photos) => {
  const filter = evt.target;
  if (filter.matches('.img-filters__button')) {
    if (filter.matches('#filter-random')) {
      photos = _.sampleSize(photos, 10);
    } else if (filter.matches('#filter-discussed')) {
      photos = _.sortBy(photos, 'comments.length').reverse();
    }
    clearPhotoList();
    renderPhotos(photos);
  }
};


const onError = (onFail) => {
  console.log('ошибка', onFail);
};

getData(makePic, onError);

