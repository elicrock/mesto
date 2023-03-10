"use strict";

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');

  const popupEditProfile = document.querySelector('.popup_type_edit-profile');
  const inputName = popupEditProfile.querySelector('.popup__input_el_name');
  const inputAbout = popupEditProfile.querySelector('.popup__input_el_about');
  const formEditProfile = popupEditProfile.querySelector('[name="profileEdit"]');

  const popupAddPlace = document.querySelector('.popup_type_add-place');
  const inputNamePlace = popupAddPlace.querySelector('.popup__input_el_name-place');
  const inputUrlPlace = popupAddPlace.querySelector('.popup__input_el_url-place');
  const formAddPlace = popupAddPlace.querySelector('[name="addPlace"]');

  const popupViewImage = document.querySelector('.popup_type_view-image');
  const popupImg = popupViewImage.querySelector('.popup__img');
  const popupTitleImg = popupViewImage.querySelector('.popup__title-img');

  const closeButtons = document.querySelectorAll('.popup__close-button');

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

  const createCard = card => {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = placeElement.querySelector('.element__title');
    const cardImage = placeElement.querySelector('.element__img');
    const cardLike = placeElement.querySelector('.element__like');
    const cardDelete = placeElement.querySelector('.element__delete-place');

    cardTitle.textContent = card.name;
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', `${card.name} (????????)`);

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
      name: inputNamePlace.value,
      link: inputUrlPlace.value,
    };
    elementsContainer.prepend(createCard(card));
    closePopup(popupAddPlace);
    form.reset();
  };

  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    inputName.value = profileTitle.textContent;
    inputAbout.value = profileSubtitle.textContent;
  });

  profileAddButton.addEventListener('click', () => {
    inputNamePlace.value = '';
    inputUrlPlace.value = '';
    openPopup(popupAddPlace);
  });

  formEditProfile.addEventListener('submit', saveFormPlace);
  formAddPlace.addEventListener('submit', addCard);

  closeButtons.forEach(elem => {
    const popup = elem.closest('.popup');
    elem.addEventListener('click', () => {
      closePopup(popup);
    });
  });
