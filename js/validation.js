// const formElement = document.querySelector('.popup__container');
// const popupInput = formElement.querySelector('.popup__input');
// const formError = formElement.querySelector(`#${popupInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => { // errorMessage - стандартное сообщение об ошибке
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage; // errorMessage - стандартное сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = ''; // стандартное сообщение об ошибке
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListener (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListener(formElement);
  })
}
enableValidation();

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// formElement.addEventListener('submit', function (evt) {
//   evt.preventDefault();
// });

// popupInput.addEventListener('input', () => {
//   isValid(formElement, popupInput);
// });

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }





// // показывает элемент ошибки
// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__input-error_active');
// }

// // скрывает элемент ошибки
// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__input-error_active');
//   errorElement.textContent = '';
// }

// // проверяет валидность поля, внутри вызывает showInputError или hideInputError
// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// }

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__submit-button');
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__container'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));

//     fieldsetList.forEach((fieldSet) => {
//       setEventListeners(fieldSet);
//     });
    
//   });
// }

// enableValidation();

// function hasInvalidInput (inputList) {
//   return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
// });
// }

// function toggleButtonState (inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('popup__submit-button_inactive');
//   } else {
//     buttonElement.classList.remove('popup__submit-button_inactive');
//   }
// }