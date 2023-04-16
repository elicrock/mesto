import './index.css';

import { initialCards, profileTitle, profileSubtitle, profileEditButton, profileAddButton, popupEditProfile, formEditProfile, inputName, inputAbout, popupAddPlace, formAddPlace, inputNamePlace, inputUrlPlace, placesContainer, popupViewImage, validationConfig } from '../utils/constants.js'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleClosePopupByEsc);
// };

// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleClosePopupByEsc);
// };

// const handleClosePopupByEsc = event => {
//   if (event.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// };

const popupProfile = new PopupWithForm(popupEditProfile, handleSaveFormProfile);
popupProfile.setEventListeners();

const popupImg = new PopupWithImage(popupViewImage);
popupImg.setEventListeners();

const handleCardClick = (name, link) => {
  popupImg.open(name, link);
};

const handleSaveFormProfile = event => {
  console.log('submit');
  // event.preventDefault();
  // profileTitle.textContent = inputName.value;
  // profileSubtitle.textContent = inputAbout.value;
  // closePopup(popupEditProfile);
};

const createCard = (item) => {
  const card = new Card(item, '#place-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addInitialItem(createCard(item));
  }
}, placesContainer);

cards.renderItems();

const handleAddNewCard = event => {
  event.preventDefault();
  const form = event.target;
  const card = {
    name: inputNamePlace.value,
    link: inputUrlPlace.value,
  };
  cards.addItem(createCard(card));
  form.reset();
  closePopup(popupAddPlace);
};

const openProfilePopup = () => {
  console.log('asfas');
  popupProfile.open();
  // inputName.value = profileTitle.textContent;
  // inputAbout.value = profileSubtitle.textContent;
  // formValidators['profileEdit'].resetValidation();
  // openPopup(popupEditProfile);
};

const openAddPlacePopup = () => {
  formAddPlace.reset();
  formValidators['addPlace'].resetValidation();
  openPopup(popupAddPlace);
};


profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openAddPlacePopup);

formEditProfile.addEventListener('submit', handleSaveFormProfile);
formAddPlace.addEventListener('submit', handleAddNewCard);
