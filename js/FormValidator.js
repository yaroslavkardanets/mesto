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



/*
// *** Ошибки *** //
// !!! Показываем сообщение ошибки ввода
const showInputError = (formElement, inputElement, errorMessage) => { // errorMessage - стандартное сообщение об ошибке
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObjects.inputErrorClass);
  errorElement.textContent = errorMessage; // errorMessage - стандартное сообщение об ошибке
  errorElement.classList.add(formObjects.errorClass);
}

// !!! Прячем сообщение ошибки ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObjects.inputErrorClass);
  errorElement.classList.remove(formObjects.errorClass);
  errorElement.textContent = ''; // стандартное сообщение об ошибке
}

// !!! Проверяем на ошибки заполненные поля ввода
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// !!! Проверяем поля ввода
function setEventListener (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(formObjects.inputSelector));
  const buttonElement = formElement.querySelector(formObjects.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObjects);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, formObjects);
    });
  });
}

// !!! Проверяем всю форму
function enableValidation(formObjects) {
  const formList = Array.from(document.querySelectorAll(formObjects.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListener(formElement, formObjects);
  });
}

// !!! Проверям на ошибки заполненные поля для кнопки отправки формы
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// !!! Активация / деактивация кнопки отправки формы
function toggleButtonState(inputList, buttonElement, formObjects) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObjects.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(formObjects.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// Проверяем элементы формы
const formObjects = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
enableValidation(formObjects);
*/