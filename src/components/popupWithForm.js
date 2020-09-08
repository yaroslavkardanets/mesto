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

  // Устанавливаем слушатели
  

  close() {
    super.close();
  }
}