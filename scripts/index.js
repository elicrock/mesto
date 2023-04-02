import { popupList, profileTitle, profileSubtitle, profileEditButton, profileAddButton, popupEditProfile, formEditProfile, inputName, inputAbout, popupAddPlace, formAddPlace, inputNamePlace, inputUrlPlace, placesContainer, validationConfig } from './Constants.js'

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './Data.js';

const validateProfileForm = new FormValidator(validationConfig, formEditProfile);
const validateAddPlaceForm = new FormValidator(validationConfig, formAddPlace);
validateProfileForm.enableValidation();
validateAddPlaceForm.enableValidation();

const cleanInputErrors = (form) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach(input => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
  });
};

export const openPopup = (popup) => {
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

const createCard = (item) => {
  const card = new Card(item, '#place-template');
  return card.generateCard();
};

initialCards.forEach(card => placesContainer.append(createCard(card)));

const handleAddNewCard = event => {
  event.preventDefault();
  const form = event.target;
  const card = {
    name: inputNamePlace.value,
    link: inputUrlPlace.value,
  };
  placesContainer.prepend(createCard(card));
  form.reset();
  closePopup(popupAddPlace);
  validatorAddPlaceForm.toggleButtonValidity();
};

const openProfilePopup = () => {
  const submitButton = popupEditProfile.querySelector('.popup__save-button');
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  cleanInputErrors(formEditProfile);
};

const openAddPlacePopup = () => {
  openPopup(popupAddPlace);
  formAddPlace.reset();
  validateAddPlaceForm.toggleButtonValidity();
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

profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openAddPlacePopup);

formEditProfile.addEventListener('submit', handleSaveFormProfile);
formAddPlace.addEventListener('submit', handleAddNewCard);
