/* global _:readonly */
import {showBigPicture} from './popup.js';
import {getData} from './network.js';
import {showAlert} from './util.js';

const RENDER_DELAY = 500;
const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');

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
    _.debounce((evt) => changeFilter(evt, photos), RENDER_DELAY))
};

const clearPhotoList = () => {
  document.querySelectorAll('.picture')
    .forEach(el => el.remove());
};

const changeFilter = (evt, photos) => {
  const filter = evt.target;
  if (filter.matches('.img-filters__button')) {
    if (filter.matches('#filter-random')) {
      photos = _.sampleSize(photos, 10);
    } else if (filter.matches('#filter-discussed')) {
      photos = _.sortBy(photos, 'comments.length').reverse();
    }
    document.querySelectorAll('.img-filters__button')
      .classList.remove('.img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    clearPhotoList();
    renderPhotos(photos);
  }
};


const onError = () => {
  showAlert('Ошибка');
};

getData(makePic, onError);

