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

  const popups = document.querySelectorAll('.popup');
  const popupsCloseButton = document.querySelectorAll('.popup__close-button');

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const popupInputName = document.querySelector('.popup__input_el_name');
  const popupInputAbout = document.querySelector('.popup__input_el_about');
  const popupInputNamePlace = document.querySelector('.popup__input_el_name-place');
  const popupInputUrlPlace = document.querySelector('.popup__input_el_url-place');

  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');

  const popupEditProfile = document.querySelector('.popup_type_edit-profile');
  const popupFormEdit = popupEditProfile.querySelector('[name="profileEdit"]')

  const popupAddPlace = document.querySelector('.popup_type_add-place');
  const popupFormPlace = popupAddPlace.querySelector('[name="addPlace"]')

  const popupViewImage = document.querySelector('.popup_type_view-image');
  const popupImg = document.querySelector('.popup__img');
  const popupTitleImg = document.querySelector('.popup__title-img');

  const elementsList = document.querySelector('.elements__list');


  const openForm = (popup) => {
    popup.classList.add('popup_opened');
  };

  const closeForm = () => {
    popups.forEach(elem => elem.classList.remove('popup_opened'));
  };

  const saveForm = function(event) {
    event.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAbout.value;
    closeForm();
  };

  const handleLikeButtonClick = event => {
    const target = event.target;
    target.classList.toggle('element__like_active');
  };

  const handleDeleteButtonClick = event => {
    const target = event.target;
    const listItem = target.closest('.element');
    listItem.remove();
  };

  const createCard = card => {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

    placeElement.querySelector('.element__title').textContent = card.name;
    placeElement.querySelector('.element__img').setAttribute('src', card.link);
    placeElement.querySelector('.element__img').setAttribute('alt', `${card.name} (фото)`);

    placeElement.querySelector('.element__like').addEventListener('click', handleLikeButtonClick);
    placeElement.querySelector('.element__delete-place').addEventListener('click', handleDeleteButtonClick);

    placeElement.querySelector('.element__img').addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('element__img')) {
        openForm(popupViewImage);
        popupImg.setAttribute('src', card.link);
        popupTitleImg.textContent = card.name;
      }
    });

    elementsList.prepend(placeElement);
  };

  initialCards.forEach(createCard);

  const addCard = event => {
    event.preventDefault();
    const form = event.target;
    const card = {
      name: popupInputNamePlace.value,
      link: popupInputUrlPlace.value,
    };
    createCard(card);
    closeForm();
    form.reset();
  };

  profileEditButton.addEventListener('click', () => {
    openForm(popupEditProfile);
    popupInputName.value = profileTitle.textContent;
    popupInputAbout.value = profileSubtitle.textContent;
  });

  profileAddButton.addEventListener('click', () => {
    openForm(popupAddPlace);
    popupInputNamePlace.value = '';
    popupInputUrlPlace.value = '';
  });

  popupFormEdit.addEventListener('submit', saveForm);
  popupFormPlace.addEventListener('submit', addCard);

  popupsCloseButton.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest('.popup__close-button')) {
        closeForm();
      }
    })
  });

});
