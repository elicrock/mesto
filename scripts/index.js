"use strict";

  const popup = document.querySelector('.popup');
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

  const closePopup = (popup) => {
	  popup.classList.remove('popup_opened');
  };

  const saveFormPlace = function(event) {
    event.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAbout.value;
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

    cardImage.addEventListener('click', () => {
      openPopup(popupViewImage);
      popupImg.setAttribute('src', card.link);
      popupImg.setAttribute('alt', card.name);
      popupTitleImg.textContent = card.name;
    });

    return placeElement;
  };

  initialCards.forEach((card) => {
    elementsContainer.append(createCard(card));
  });

  const addCard = event => {
    event.preventDefault();
    const form = event.target;
    const card = {
      name: popupInputNamePlace.value,
      link: popupInputUrlPlace.value,
    };
    elementsContainer.prepend(createCard(card));
    closePopup(popupAddPlace);
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
    elem.addEventListener('click', () => {
      if (popupEditProfile) {
        closePopup(popupEditProfile);
      }
      if (popupAddPlace) {
        closePopup(popupAddPlace);
      }
      if (popupViewImage) {
        closePopup(popupViewImage);
      }
    })
  });

