"use strict";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

document.addEventListener('DOMContentLoaded', () => {

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');
  const popup = document.querySelector('.popup');
  const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
  const popupTypeAddPlace = document.querySelector('.popup_type_add-place');
  const popupForm = document.querySelector('.popup__form');
  const popupCloseButton = document.querySelector('.popup__close-button');
  const popupInputName = document.querySelector('.popup__input_el_name');
  const popupInputAbout = document.querySelector('.popup__input_el_about');

  const openForm = function(popup) {
    popup.classList.add('popup_opened');
  };

  const closeForm = function(popup) {
    popup.classList.remove('popup_opened');
  };

  const saveForm = function(event) {
    event.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAbout.value;
    closeForm(popup);
  }

  profileEditButton.addEventListener('click', () => {
    openForm(popupTypeEditProfile);
    popupInputName.value = profileTitle.textContent;
    popupInputAbout.value = profileSubtitle.textContent;
  });

  profileAddButton.addEventListener('click', () => {
    openForm(popupTypeAddPlace);
  });

  popupForm.addEventListener('submit', saveForm);

  popupCloseButton.addEventListener('click', () => {
    closeForm(popup);
  });

});
