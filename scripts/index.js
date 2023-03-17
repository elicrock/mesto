"use strict";

  const popupList = Array.from(document.querySelectorAll('.popup'));

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');

  const popupEditProfile = document.querySelector('.popup_type_edit-profile');
  const formEditProfile = document.forms.profileEdit;
  const inputName = formEditProfile.querySelector('.popup__input_el_name');
  const inputAbout = formEditProfile.querySelector('.popup__input_el_about');

  const popupAddPlace = document.querySelector('.popup_type_add-place');
  const formAddPlace = document.forms.addPlace;
  const inputNamePlace = formAddPlace.querySelector('.popup__input_el_name-place');
  const inputUrlPlace = formAddPlace.querySelector('.popup__input_el_url-place');
  const buttonElement = formAddPlace.querySelector(`${validationConfig.submitButtonSelector}`);

  const inputList = Array.from(document.querySelectorAll(`${validationConfig.inputSelector}`));
  const errorsList = Array.from(document.querySelectorAll('.popup__input-error'));

  const popupViewImage = document.querySelector('.popup_type_view-image');
  const popupImg = popupViewImage.querySelector('.popup__img');
  const popupTitleImg = popupViewImage.querySelector('.popup__title-img');

  const placeTemplate = document.querySelector('#place-template').content;
  const elementsContainer = document.querySelector('.elements__list');


  const cleanErrors = () => {
    inputList.forEach(input => {
      input.classList.remove('popup__input_type_error');
    });
    errorsList.forEach(error => {
      error.textContent = '';
    });
  };

  const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEsc);
  };

  const closePopup = (popup) => {
	  popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEsc);
    cleanErrors();
  };

  const closeEsc = (event => {
    if (event.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
  });

  popupList.forEach(popup => {
    popup.addEventListener('click', event => {
      if (event.target.classList.contains('popup_opened') ||
          event.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    });
  });

  const saveFormPlace = event => {
    event.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAbout.value;
    closePopup(popupEditProfile);
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

  const handleImgClick = event => {
    const target = event.target;
    openPopup(popupViewImage);
    const cardTitle = target.closest('.element').querySelector('.element__title').textContent;

    popupImg.setAttribute('src', target.src);
    popupImg.setAttribute('alt', target.alt);
    popupTitleImg.textContent = cardTitle;
    // popupTitleImg.textContent = target.alt.split(' (фото)')[0];
  };

  const createCard = card => {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = placeElement.querySelector('.element__title');
    const cardImage = placeElement.querySelector('.element__img');
    const cardLike = placeElement.querySelector('.element__like');
    const cardDelete = placeElement.querySelector('.element__delete-place');

    cardTitle.textContent = card.name;
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', `${card.name} (фото)`);

    cardLike.addEventListener('click', handleLikeButtonClick);
    cardDelete.addEventListener('click', handleDeleteButtonClick);
    cardImage.addEventListener('click', handleImgClick);

    return placeElement;
  };

  initialCards.forEach((card) => {
    elementsContainer.append(createCard(card));
  });

  const addCard = event => {
    event.preventDefault();
    const form = event.target;
    const card = {
      name: inputNamePlace.value,
      link: inputUrlPlace.value,
    };
    elementsContainer.prepend(createCard(card));
    form.reset();
    toggleButtonValidity(inputList, buttonElement, validationConfig.inactiveButtonClass);
    closePopup(popupAddPlace);
  };

  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    inputName.value = profileTitle.textContent;
    inputAbout.value = profileSubtitle.textContent;
  });

  profileAddButton.addEventListener('click', () => {
    openPopup(popupAddPlace);
    formAddPlace.reset();
    toggleButtonValidity(inputList, buttonElement, validationConfig.inactiveButtonClass);
  });

  formEditProfile.addEventListener('submit', saveFormPlace);
  formAddPlace.addEventListener('submit', addCard);
