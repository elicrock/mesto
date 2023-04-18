import './index.css';

import { initialCards, profileTitleSelector, profileSubtitleSelector, profileEditButton, profileAddButton, popupEditProfile, formEditProfile, inputName, inputAbout, popupAddPlace, formAddPlace, inputNamePlace, inputUrlPlace, placesContainer, popupViewImage, validationConfig } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const userInfo = new UserInfo({ profileTitleSelector, profileSubtitleSelector });

const handleSaveFormProfile = ({ 'user-name': inputName, 'about': inputAbout}) => {
  userInfo.setUserInfo(inputName, inputAbout);
  popupProfile.close();
};

// const handleAddNewCard = (event, { 'place-name': inputNamePlace, 'link': inputUrlPlace }) => {
//   event.preventDefault();
  // const form = event.target;
  // const card = {
  //   name: inputNamePlace.value,
  //   link: inputUrlPlace.value,
  // };
  // cards.addItem(createCard(card));
  // form.reset();
  // closePopup(popupAddPlace);
// };

const popupProfile = new PopupWithForm(popupEditProfile, handleSaveFormProfile);
popupProfile.setEventListeners();

// const popupAddNewPlace = new PopupWithForm(popupAddPlace, handleAddNewCard);
// popupAddNewPlace.setEventListeners();

const popupImg = new PopupWithImage(popupViewImage);
popupImg.setEventListeners();

const handleCardClick = (name, link) => {
  popupImg.open(name, link);
};

const createCard = (item) => {
  const card = new Card(item, '#place-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, placesContainer);

cards.renderItems();

const openProfilePopup = () => {
  const { userName, userAbout } = userInfo.getUserInfo();
  inputName.value = userName;
  inputAbout.value = userAbout;
  formValidators['profileEdit'].resetValidation();
  popupProfile.open();
};

const openAddPlacePopup = () => {
  formAddPlace.reset();
  formValidators['addPlace'].resetValidation();
  // popupAddNewPlace.open();
};

profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openAddPlacePopup);

// formEditProfile.addEventListener('submit', handleSaveFormProfile);
// formAddPlace.addEventListener('submit', handleAddNewCard);
