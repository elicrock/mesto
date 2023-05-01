import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._saveButton = this._formElement.querySelector('.popup__save-button');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputValue = {};
    this._inputList.forEach((input) => {
      this._inputValue[input.name] = input.value;
    });

    return this._inputValue;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  renderLoading(isLoading) {
    this._formAddPlace = this._popup.querySelector('[name="addPlace"]');
    if(isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      !this._formAddPlace ?
      this._saveButton.textContent = 'Сохранить' :
      this._saveButton.textContent = 'Создать';
    }
  }
}
