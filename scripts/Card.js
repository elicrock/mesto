import { popupViewImage, popupImg, popupTitleImg } from './Constants.js'
import { openPopup } from './index.js';

export default class Card {
  constructor(data, teamplateSelector) {
    this._titleImg = data.name;
    this._urlImg = data.link;
    this._teamplateSelector = teamplateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._teamplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButtonClick(event) {
    event.target.classList.toggle('element__like_active');
  };

  _handleDeleteButtonClick(event) {
    event.target.closest('.element').remove();
  };

  _handleOpenImg() {
    popupImg.src = this._urlImg;
    popupImg.alt = `${this._titleImg} (фото)`;
    popupTitleImg.textContent = this._titleImg;
    openPopup(popupViewImage);
  };

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (event) => {
      this._handleLikeButtonClick(event);
    });

    this._element.querySelector('.element__delete-place').addEventListener('click', (event) => {
      this._handleDeleteButtonClick(event);
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleOpenImg();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._titleImg;
    this._element.querySelector('.element__img').src = this._urlImg;
    this._element.querySelector('.element__img').alt = `${this._titleImg} (фото)`;

    return this._element;
  }
}
