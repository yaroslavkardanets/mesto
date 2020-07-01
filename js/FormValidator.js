export class FormValidator {
  constructor(data, formSelector){
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
  }

  // Проверяем всю форму
  enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListener();
  }

  // Проверяем поля ввода
  _setEventListener () {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  // Активация / деактивация кнопки отправки формы
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  // Проверям на ошибки заполненные поля для кнопки отправки формы
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Проверяем на ошибки заполненные поля ввода
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Показываем сообщение ошибки ввода
  _showInputError (inputElement, errorMessage) { // errorMessage - стандартное сообщение об ошибке
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage; // errorMessage - стандартное сообщение об ошибке
    errorElement.classList.add(this._errorClass);
  }

    // Прячем сообщение ошибки ввода
  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ''; // стандартное сообщение об ошибке
  }
}