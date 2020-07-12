import { initialCards, Card } from '../js/Card.js';
import { FormValidator } from '../js/FormValidator.js';



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

// переменные popup просмотра фотографии
const popupImage = document.querySelector('.popup_image');
const closeImage = document.querySelector('.popup__close-button-image');

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rendreredItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._rendreredItems.forEach(item => this._renderer(item));
  }
  
  addItem(element) {
    this._container.append(element);
  }
}

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup-opened');
    setEventListeners();
    addListenersForOpenPopup
  }

  close() {
    this._popup.classList.remove('popup-opened');
    // this._popup.querySelector('.popup__close-button').removeEventListener('click', ) !!!!!
  }

  // Закрываем всплывающее окно кнопкой Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      document.querySelector('.popup-opened').classList.remove('popup-opened');
      document.removeEventListener('keydown', this._handleEscClose);
      removeListenersAndClosePopup();
    }
  }

  this._handleOverlayClose = (evt)

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', );
  }
}

// Закрываем всплывающее окно кнопкой Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const close = document.querySelector('.popup-opened');
    close.classList.remove('popup-opened');
    removeListenersAndClosePopup();
  }
}

// Общая функция закрыть/открыть всплывающее окно
// export function openClosePopup(element) {
//   element.classList.toggle('popup-opened');
// }

// *** Открываем/закрываем всплывающие окна *** //
// Открываем popup
export function openPopup(element) {
  element.classList.add('popup-opened'); 
}
// Закрываем popup
function closePopup(element) {
  element.classList.remove('popup-opened'); 
}

// Добавляем слушатели для всплывающих окон
export function addListenersForOpenPopup(button, overlay) {
  // document.addEventListener('keydown', closePopupEsc);
  button.addEventListener('click', closePopupButton);
  overlay.addEventListener('click', closePopupClick);
}



// *** Открываем всплывающие окна *** //
// Открываем всплывающее окно профиля, передаем текущие значения
function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
  openPopup(popupProfile);
  addListenersForOpenPopup(closeButtonProfile, popupProfile);
}

// Открываем всплывающее окно создания карточки
function openPopupCards() {
  placeInput.value = '';
  imageInput.value = '';
  openPopup(popupCards);
  addListenersForOpenPopup(closeButtonCards, popupCards);
}

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
  closePopup(evt.target.closest('.popup'));
  removeListenersAndClosePopup();
}

// Закрываем всплывающее окно кликом по оверлею
function closePopupClick (evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup-opened');
    removeListenersAndClosePopup();
  }
}





// *** Создаем карточки *** //
// Добавляем в разметку 6 готовых карточек
function addInitialCards() {
  initialCards.forEach((item) => {
    renderCard(item)
  });
}
addInitialCards();

// Создаем и добавляем в разметку новую карточку
function renderCard(item) {
  const card = new Card(item, '#card-element');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

// Подтверждаем создание карточки
function cardSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = { name: placeInput.value, link: imageInput.value };
  renderCard(newCard);
  closePopup(popupCards);
}



// *** Валидация *** //
// Проверяем элементы формы
const formObjects = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Функция валидации
function addValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((form) => {
    const formValidator = new FormValidator(formObjects, form);
    formValidator.enableValidation();
  });
}
addValidation();



// *** Создаем/сохраняем данные попапов *** //
// Обработка титульного всплывающего окна для отправки на сервер
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupProfile);
}



// *** Слушатели *** //
// Кнопка подтверждения карточек
cardsElement.addEventListener('submit', cardSubmitHandler);
// Кнопки открытия форм
profileEditButton.addEventListener('click', openPopupProfile);
addCardButton.addEventListener('click', openPopupCards);
// Кнопка подтверждения имени/профессии
formElement.addEventListener('submit', formSubmitHandler);

