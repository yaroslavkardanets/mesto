import { initialCards } from './Card.js';
import { FormValidator } from './FormValidator.js';

// *** Переменные *** //
// переменные profile
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// переменные popup профиля
const popupProfile = document.querySelector('.popup_profile');
const formElement = document.querySelector('.popup__container');
const closeButtonProfile = document.querySelector('.popup__close-button_profile');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');

// переменные popup карточки
const popupCards = document.querySelector('.popup_cards');
const cardsElement = document.querySelector('.popup__container_cards');
const closeButtonCards = document.querySelector('.popup__close-button_cards');
const placeInput = document.querySelector('.popup__input_cards_place');
const imageInput = document.querySelector('.popup__input_cards_image');

// переменные элементы карточек
const elements = document.querySelector('.elements');

// // переменные popup просмотра фотографии
// const popupImage = document.querySelector('.popup_image');
// const closeImage = document.querySelector('.popup__close-button-image');
// const previewImage = document.querySelector('.popup__preview');
// const titleImage = document.querySelector('.popup__title-image');


// *** Открываем/закрываем всплывающие окна *** //
// Общая функция закрыть/открыть всплывающее окно
function openClosePopup(element) {
  element.classList.toggle('popup-opened');
}

// Добавляем слушатели для всплывающих окон
function addListenersForOpenPopup(button, overlay) {
  document.addEventListener('keydown', closePopupEsc);
  button.addEventListener('click', closePopupButton);
  overlay.addEventListener('click', closePopupClick);
}

// *** Открываем всплывающие окна *** //
// Открываем всплывающее окно профиля, передаем текущие значения
function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
  openClosePopup(popupProfile);
  addListenersForOpenPopup(closeButtonProfile, popupProfile);
}

// Открываем всплывающее окно создания карточки
function openPopupCards() {
  placeInput.value = '';
  imageInput.value = '';
  openClosePopup(popupCards);
  addListenersForOpenPopup(closeButtonCards, popupCards);
}

// // Открываем всплывающее окно просмотра фотографии
// function previewImages(evt) {
//   previewImage.setAttribute('src', evt.target.src);
//   titleImage.textContent = name;
//   openClosePopup(popupImage);
//   addListenersForOpenPopup(closeImage, popupImage);
// }

// Удаляем слушатели для всплывающих окон
function removeListenersAndClosePopup() {
  document.removeEventListener('keydown', closePopupEsc);  

  closeButtonProfile.removeEventListener('click', closePopupButton);
  closeButtonCards.removeEventListener('click', closePopupButton);
  closeImage.removeEventListener('click', closePopupButton);  

  popupProfile.removeEventListener('click', closePopupClick);
  popupCards.removeEventListener('click', closePopupClick);
  popupImage.removeEventListener('click', closePopupClick);  
}

// *** закрываем всплывающие окна (3 способа) *** //
// Кнопка закрыть всплывающее окно (крестик)
function closePopupButton(evt) {
  openClosePopup(evt.target.closest('.popup'));
  removeListenersAndClosePopup();
}

// Закрываем всплывающее окно кликом по оверлею
function closePopupClick (evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup-opened');
  }
  removeListenersAndClosePopup();
}

// Закрываем всплывающее окно кнопкой Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const close = document.querySelector('.popup-opened');
    close.classList.remove('popup-opened');
  }
  removeListenersAndClosePopup();
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._setEventListeners();

    return this._element;
  }

  // Обработчик лайка
  _handleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  // *** Добавляем слушатели *** //
  _setEventListeners() {
    // слушатель лайка
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    });
    // слушатель удаления
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrash();
    });
    // слушатель просмотра фотографии
    this._element.querySelector('.element__image').addEventListener('click', () => {
      previewImages(this._link, this._name);
    });
  }
  // Обработчик удаления карточки и слушателей 
  _handleTrash() {
    this._element.querySelector('.element__like').removeEventListener('click', () => {
      this._handleLike();
    });
    // слушатель удаления
    this._element.querySelector('.element__trash').removeEventListener('click', () => {
      this._handleTrash();
    });
    // слушатель просмотра фотографии
    this._element.querySelector('.element__image').removeEventListener('click', () => {
      previewImages();
    });
    this._element.remove();
  }
}

// переменные popup просмотра фотографии
const popupImage = document.querySelector('.popup_image');
const closeImage = document.querySelector('.popup__close-button-image');
const previewImage = document.querySelector('.popup__preview');
const titleImage = document.querySelector('.popup__title-image');

// Открываем попап просмотра фотографии
function previewImages(link, name) {
  previewImage.src = link;
  previewImage.alt = name;
  titleImage.textContent = name;
  openClosePopup(popupImage);
  addListenersForOpenPopup(closeImage, popupImage);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

// Создаем и добавляем в разметку новую карточку
function addCard(item) {
  const card = new Card(item, '#card-element');
  const cardElement = card.generateCard();
  elements.append(cardElement);
}

// Добавляем в разметку 6 готовых карточек
function getInitialCards() {
  initialCards.forEach((item) => {
    addCard(item)
  });
}
getInitialCards();

// Добавляем карточки
function cardSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = { name: placeInput.value, link: imageInput.value };
  addCard(newCard);
  openClosePopup(popupCards);
}

// !!!!!!!!!
const formObjects = {
  // formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
// enableValidation(formObjects);

// !!!!!!!
// Функция валидации форм
function addValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((form) => {
    const formValidator = new FormValidator(formObjects, form);
    formValidator.enableValidation();
  });
}
addValidation();
// !!!!!!!

      // *** Блок работы с карточкой *** //
      // Собираем карточку
      // function cardItem (name, link) {
      //   const cardElement = document.querySelector('#card-element').content;
      //   const element = cardElement.cloneNode(true);
      //   const elementTitle = element.querySelector('.element__title');
      //   const elementImage = element.querySelector('.element__image');
      //   const elementLike = element.querySelector('.element__like'); 
      //   const elementTrash = element.querySelector('.element__trash');
        
      //   elementTitle.textContent = name;
      //   elementImage.src = link; 

      //   elementLike.addEventListener('click', cardLike);
      //   elementTrash.addEventListener('click', deleteCard);
      //   elementImage.addEventListener('click', previewImages);
      //   return element;
      // }

      // активируем like
      // function cardLike (evt) {
      //   evt.target.classList.toggle('element__like_active');
      // }
      // // Удаляем карточку
      // function deleteCard (evt) {
      //   evt.target.closest('.element').remove();
      // }

      // Создаем массив карточек
      // function makeCard (card) {
      //   card.forEach(function (item) {
      //     elements.append(cardItem (item.name, item.link));
      //   })
      // }
      // makeCard(initialCards);


// *** Создаем/сохраняем данные попапов *** //
// Обработка титульного всплывающего окна для отправки на сервер
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  openClosePopup(popupProfile);
}

      


// *** Слушатели *** //
// Кнопка подтверждения карточек
cardsElement.addEventListener('submit', cardSubmitHandler);
// Кнопки открытия форм
profileEditButton.addEventListener('click', openPopupProfile);
addCardButton.addEventListener('click', openPopupCards);
// Кнопка подтверждения имени/профессии
formElement.addEventListener('submit', formSubmitHandler);

