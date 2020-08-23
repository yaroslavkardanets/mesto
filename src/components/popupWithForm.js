import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  // Получаем текущие значения
  _getInputValues() {
    this._popupInputs = this._popup.querySelectorAll('.popup__input');
    this._data = {};
    this._popupInputs.forEach(input => {
      this._data[input.name] = input.value;
    }) 
    return this._data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__container').addEventListener('submit', () => {
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
  }
}