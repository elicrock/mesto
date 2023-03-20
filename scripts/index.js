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
const buttonElement = formAddPlace.querySelector(validationConfig.submitButtonSelector);
const inputList = Array.from(formAddPlace.querySelectorAll(validationConfig.inputSelector));

const popupViewImage = document.querySelector('.popup_type_view-image');
const popupImg = popupViewImage.querySelector('.popup__img');
const popupTitleImg = popupViewImage.querySelector('.popup__title-img');

const placeTemplate = document.querySelector('#place-template').content;
const placeElement = placeTemplate.querySelector('.element');
const placesContainer = document.querySelector('.elements__list');

const cleanInputErrors = (form) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach(input => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
  });
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc);
};

const handleClosePopupByEsc = event => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const handleSaveFormProfile = event => {
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

  popupImg.src = target.src;
  popupImg.alt = target.alt;
  popupTitleImg.textContent = cardTitle;
  // popupTitleImg.textContent = target.alt.split(' (фото)')[0];
};

const createCard = card => {
  const clonedElement = placeElement.cloneNode(true);
  const cardTitle = clonedElement.querySelector('.element__title');
  const cardImage = clonedElement.querySelector('.element__img');
  const cardLike = clonedElement.querySelector('.element__like');
  const cardDelete = clonedElement.querySelector('.element__delete-place');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `${card.name} (фото)`;

  cardLike.addEventListener('click', handleLikeButtonClick);
  cardDelete.addEventListener('click', handleDeleteButtonClick);
  cardImage.addEventListener('click', handleImgClick);

  return clonedElement;
};

initialCards.forEach((card) => {
  placesContainer.append(createCard(card));
});

const handleAddNewCard = event => {
  event.preventDefault();
  const form = event.target;
  const card = {
    name: inputNamePlace.value,
    link: inputUrlPlace.value,
  };
  placesContainer.prepend(createCard(card));
  form.reset();
  toggleButtonValidity(inputList, buttonElement, validationConfig.inactiveButtonClass);
  closePopup(popupAddPlace);
};

const changeProfileInfo = () => {
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  cleanInputErrors(formEditProfile);
};

const addNewPlace = () => {
  openPopup(popupAddPlace);
  formAddPlace.reset();
  toggleButtonValidity(inputList, buttonElement, validationConfig.inactiveButtonClass);
  cleanInputErrors(formAddPlace);
};

popupList.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup_opened') ||
        event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

profileEditButton.addEventListener('click', changeProfileInfo);
profileAddButton.addEventListener('click', addNewPlace);

formEditProfile.addEventListener('submit', handleSaveFormProfile);
formAddPlace.addEventListener('submit', handleAddNewCard);
