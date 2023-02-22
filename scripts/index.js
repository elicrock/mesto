"use strict";

document.addEventListener('DOMContentLoaded', () => {

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

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');
  const popup = document.querySelector('.popup');
  const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
  const popupTypeAddPlace = document.querySelector('.popup_type_add-place');
  const popupForm = document.querySelector('.popup__form');
  const popupInputName = document.querySelector('.popup__input_el_name');
  const popupInputAbout = document.querySelector('.popup__input_el_about');
  const elementsList = document.querySelector('.elements__list');

  const openForm = function(popup) {
    popup.classList.add('popup_opened');
  };

  const closeForm = function(event) {
    const target = event.target;
	  if (target.closest('.popup__close-button') || target === this) {
		  this.classList.remove('popup_opened');
	  }
  };

  const saveForm = function(event) {
    event.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAbout.value;
    popup.classList.remove('popup_opened');
  };

  const createCard = function(card) {
    const newCard = document.querySelector('#place-template').content.cloneNode(true);
    const cardHeading = newCard.querySelector('.element__title');
    const cardImage = newCard.querySelector('.element__img');
    const cardLike = newCard.querySelector('.element__like');
    const cardDelete = newCard.querySelector('.element__delete-place');

    cardHeading.textContent = card.name;
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);

    cardLike.addEventListener('click', event => {
      const target = event.target;
      target.classList.toggle('element__like_active');
    });

    cardDelete.addEventListener('click', () => {
      const listItem = cardDelete.closest('.element');
      listItem.remove();
    });

    elementsList.append(newCard);
  };

  initialCards.forEach(createCard);

  profileEditButton.addEventListener('click', () => {
    openForm(popupTypeEditProfile);
    popupInputName.value = profileTitle.textContent;
    popupInputAbout.value = profileSubtitle.textContent;
  });

  profileAddButton.addEventListener('click', () => {
    openForm(popupTypeAddPlace);
  });

  popupForm.addEventListener('submit', saveForm);
  popupTypeEditProfile.addEventListener('click', closeForm);
  popupTypeAddPlace.addEventListener('click', closeForm);

});
