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
  const elementsList = document.queryCommandIndeterm('.elements__list');
  // const elementLike = document.querySelector('.element__like');

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

  // const activateLike = function(event) {
  //   const target = event.target;
  //   target.classList.toggle('element__like_active');
  // };

  const createCard = function(placeValue, urlValue) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

    placeElement.querySelector('.element__title').textContent = placeValue;
    placeElement.querySelector('.element__img').src = urlValue;
    placeElement.querySelector('.element__img').alt = placeValue;
    placeElement.querySelector('.element__like').addEventListener('click', event => {
      const target = event.target;
      target.classList.toggle('element__like_active');
    });

    placeElement.querySelector('.element__delete-place').addEventListener('click', () => {
      const listItem = deleteButton.closest('.element');
      listItem.remove();
    });

    // const newCard = elementsList.append(placeElement);
    // return newCard;
    elementsList.append(placeElement);
  };

  // createCard();

  const initialPlace = () => {
    initialCards.forEach((elem) => {
      // createCard(elem.name, elem.link);
    });
  };
  initialPlace();


  profileEditButton.addEventListener('click', () => {
    openForm(popupTypeEditProfile);
    popupInputName.value = profileTitle.textContent;
    popupInputAbout.value = profileSubtitle.textContent;
  });

  profileAddButton.addEventListener('click', () => {
    openForm(popupTypeAddPlace);
  });

  // elementLike.forEach(item => item.addEventListener('click', activateLike));

  popupForm.addEventListener('submit', saveForm);
  popupTypeEditProfile.addEventListener('click', closeForm);
  popupTypeAddPlace.addEventListener('click', closeForm);

});
