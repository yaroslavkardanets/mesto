// *** Ошибки *** //
// Показываем сообщение ошибки ввода
const showInputError = (formElement, inputElement, errorMessage) => { // errorMessage - стандартное сообщение об ошибке
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObjects.inputErrorClass);
  errorElement.textContent = errorMessage; // errorMessage - стандартное сообщение об ошибке
  errorElement.classList.add(formObjects.errorClass);
}

// Прячем сообщение ошибки ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObjects.inputErrorClass);
  errorElement.classList.remove(formObjects.errorClass);
  errorElement.textContent = ''; // стандартное сообщение об ошибке
}

// Проверяем на ошибки заполненные поля ввода
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Проверяем поля ввода
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

// Проверяем всю форму
function enableValidation(formObjects) {
  const formList = Array.from(document.querySelectorAll(formObjects.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListener(formElement, formObjects);
  });
}

// Проверям на ошибки заполненные поля для кнопки отправки формы
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Активация / деактивация кнопки отправки формы
function toggleButtonState(inputList, buttonElement, formObjects) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObjects.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(formObjects.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// // Проверяем элементы формы
// enableValidation({
//   formSelector: '.popup__container',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_inactive',
//   inputErrorClass: 'popup__input-error',
//   errorClass: 'popup__input-error_active'
// });

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