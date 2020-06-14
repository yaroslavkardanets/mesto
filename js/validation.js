// *** Ошибки *** //
// Показываем сообщение ошибки ввода
const showInputError = (formElement, inputElement, errorMessage) => { // errorMessage - стандартное сообщение об ошибке
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage; // errorMessage - стандартное сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');
}

// Прячем сообщение ошибки ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
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
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Проверяем всю форму
function enableValidation(objects) {
  const formList = Array.from(document.querySelectorAll(objects.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListener(formElement);
  });
}

// Проверям на ошибки заполненные поля для кнопки отправки формы
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Активация / деактивация кнопки отправки формы
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('popup__submit-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

// Проверяем элементы формы
const formObjects = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}

enableValidation(formObjects);