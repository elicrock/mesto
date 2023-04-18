import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._formElement = document.querySelector('.popup__form');
    this._inputList = document.querySelectorAll('.popup__input');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputValue = {};
    this._inputList.forEach((input) => {
      this._inputValue[input.name] = input.value;
    });

    return this._inputValue;
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
}