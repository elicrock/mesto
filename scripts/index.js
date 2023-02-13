"use strict";

document.addEventListener('DOMContentLoaded', () => {

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const profileEditButton = document.querySelector('.profile__edit-button');
  const popup = document.querySelector('.popup');
  const popupCloseButton = document.querySelector('.popup__close-button');
  const popupSaveButton = document.querySelector('.popup__save-button');
  const popupInputName = document.querySelector('.popup__input-name');
  const popupInputAbout = document.querySelector('.popup__input-about');

  const openForm = function() {
    popup.classList.add('popup_opened');
    popupInputName.value = profileTitle.textContent;
    popupInputAbout.value = profileSubtitle.textContent;
  };

  const closeForm = function() {
    popup.classList.remove('popup_opened');
  };

  const saveForm = function(event) {
    event.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAbout.value;
    closeForm();
  }

  profileEditButton.addEventListener('click', openForm);

  popupSaveButton.addEventListener('click', saveForm);

  popupCloseButton.addEventListener('click', closeForm);

});
