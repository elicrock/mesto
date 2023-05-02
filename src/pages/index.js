import './index.css';

import { token, cohortId, profileTitleSelector, profileSubtitleSelector, profileAvatarSelector, profileEditButton, profileAddButton, popupEditProfile, popupAddPlace, popupViewImage, popupConfirmation, placesContainer, validationConfig } from '../utils/constants.js';

import Api from '../components/Api.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector });

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(data => {
    const [ cardsData, userData ] = data;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    // console.log(cardsData);
    cardsSection.renderItems(cardsData);
  })

const handleSaveFormProfile = ({ 'user-name': userName, 'about': userAbout }) => {
  popupProfile.renderLoading(true);
  api.updateUserInfo(userName, userAbout)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      popupProfile.close();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
};

// api.getInitialCards()
//   .then(cards => {
//     // console.log(cards);
//     cards.forEach(card => {
//       console.log(card.owner._id);
//     })
//   });

const handleAddNewCard = ({ 'place-name': namePlace, 'link': urlPlace }) => {
  popupAddNewPlace.renderLoading(true);
  api.addNewCard(namePlace, urlPlace)
    .then(cards => {
      cardsSection.addItem(createCard(cards));
      popupAddNewPlace.close();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      popupAddNewPlace.renderLoading(false);
    });
};

const popupProfile = new PopupWithForm(popupEditProfile, handleSaveFormProfile);
popupProfile.setEventListeners();

const popupAddNewPlace = new PopupWithForm(popupAddPlace, handleAddNewCard);
popupAddNewPlace.setEventListeners();

const popupImg = new PopupWithImage(popupViewImage);
popupImg.setEventListeners();

const popupConfirmationDelete = new PopupWithConfirmation(popupConfirmation);
popupConfirmationDelete.setEventListeners();

const handleDeleteButtonClick = (cardId, cardElement) => {
  popupConfirmationDelete.open();
  popupConfirmationDelete.handleSubmit(() => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupConfirmationDelete.close();
      })
      .catch(err => {
        console.error(`Карточка не удалена. ${err}`);
      })
  });
};

const handleCardClick = (name, link) => {
  popupImg.open(name, link);
};

const createCard = (item) => {
  const card = new Card(item, userId, '#place-template', handleCardClick, handleDeleteButtonClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  }
}, placesContainer);

const openProfilePopup = () => {
  const { userName, userAbout } = userInfo.getUserInfo();
  popupProfile.setInputValues({ 'user-name': userName, 'about': userAbout });
  formValidators['profileEdit'].resetValidation();
  popupProfile.open();
};

const openAddPlacePopup = () => {
  formValidators['addPlace'].resetValidation();
  popupAddNewPlace.open();
};

enableValidation(validationConfig);

profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openAddPlacePopup);
