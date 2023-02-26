"use strict";

  const popups = document.querySelectorAll('.popup');
  const closeButtons = document.querySelectorAll('.popup__close-button');

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

  const placeTemplate = document.querySelector('#place-template').content;
  const elementsContainer = document.querySelector('.elements__list');


  const openPopup = (popup) => {
    popup.classList.add('popup_opened');
  };

  const closePopup = () => {
    popups.forEach(elem => elem.classList.remove('popup_opened'));
  };

  const saveFormPlace = function(event) {
    event.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAbout.value;
    closePopup();
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
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

    placeElement.querySelector('.element__title').textContent = card.name;
    placeElement.querySelector('.element__img').setAttribute('src', card.link);
    placeElement.querySelector('.element__img').setAttribute('alt', `${card.name} (фото)`);

    placeElement.querySelector('.element__like').addEventListener('click', handleLikeButtonClick);
    placeElement.querySelector('.element__delete-place').addEventListener('click', handleDeleteButtonClick);

    placeElement.querySelector('.element__img').addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('element__img')) {
        openPopup(popupViewImage);
        popupImg.setAttribute('src', card.link);
        popupTitleImg.textContent = card.name;
      }
    });

    elementsContainer.prepend(placeElement);
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
    closePopup();
    form.reset();
  };

  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    popupInputName.value = profileTitle.textContent;
    popupInputAbout.value = profileSubtitle.textContent;
  });

  profileAddButton.addEventListener('click', () => {
    openPopup(popupAddPlace);
    popupInputNamePlace.value = '';
    popupInputUrlPlace.value = '';
  });

  popupFormEdit.addEventListener('submit', saveFormPlace);
  popupFormPlace.addEventListener('submit', addCard);

  closeButtons.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest('.popup__close-button')) {
        closePopup();
      }
    })
  });
