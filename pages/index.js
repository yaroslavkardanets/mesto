import { initialCards, Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
// import { Popup } from '../components/Popup.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

// *** Переменные *** //
// переменные profile
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// const profileTitle = document.querySelector('.profile__name');
// const profileOccupation = document.querySelector('.profile__occupation');

// переменные popup профиля
// const popupProfile = document.querySelector('.popup_profile');
// const formElement = document.querySelector('.popup__container');
// const closeButtonProfile = document.querySelector('.popup__close-button_profile');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');

// переменные popup карточки
// const popupCards = document.querySelector('.popup_cards');
const cardsElement = document.querySelector('.popup__container_cards');
// const closeButtonCards = document.querySelector('.popup__close-button_cards');
const placeInput = document.querySelector('.popup__input_cards_place');
const imageInput = document.querySelector('.popup__input_cards_image');



// переменные popup просмотра фотографии
// const popupImage = document.querySelector('.popup_image');
// const closeImage = document.querySelector('.popup__close-button-image');
// const popup = new Popup('.popup_image');

const popupWithImage = new PopupWithImage('.popup_image');

const userInfo = new UserInfo({ 'title': '.profile__name', 'occupation': '.profile__occupation' });
const popupUserInfo = new PopupWithForm('.popup_profile', (info) => {
  userInfo.setUserInfo(info);
});

const popupNewCard = new PopupWithForm('.popup_cards', (info) => {
});

// *** Открываем всплывающие окна *** //
// Открываем всплывающее окно профиля, передаем текущие значения
function openPopupProfile() {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.title;
  jobInput.value = profileInfo.occupation;
  popupUserInfo.open();
  // openPopup(popupProfile);
  // addListenersForOpenPopup(closeButtonProfile, popupProfile);
}


// Общая функция закрыть/открыть всплывающее окно
// export function openClosePopup(element) {
//   element.classList.toggle('popup-opened');
// }

// *** Открываем/закрываем всплывающие окна *** //
// Открываем popup
// export function openPopup(element) {
//   element.classList.add('popup-opened'); 
// }
// // Закрываем popup
// function closePopup(element) {
//   element.classList.remove('popup-opened'); 
// }

// // Добавляем слушатели для всплывающих окон
// export function addListenersForOpenPopup(button, overlay) {
//   document.addEventListener('keydown', closePopupEsc);
//   button.addEventListener('click', closePopupButton);
//   overlay.addEventListener('click', closePopupClick);
// }




// Открываем всплывающее окно создания карточки
function openPopupCards() {
  placeInput.value = '';
  imageInput.value = '';
  popupNewCard.open();
  // openPopup(popupCards);
  // addListenersForOpenPopup(closeButtonCards, popupCards);
}

// // Удаляем слушатели для всплывающих окон
// function removeListenersAndClosePopup() {
//   document.removeEventListener('keydown', closePopupEsc);  

//   closeButtonProfile.removeEventListener('click', closePopupButton);
//   closeButtonCards.removeEventListener('click', closePopupButton);
//   closeImage.removeEventListener('click', closePopupButton);  

//   popupProfile.removeEventListener('click', closePopupClick);
//   popupCards.removeEventListener('click', closePopupClick);
//   popupImage.removeEventListener('click', closePopupClick);  
// }



// *** закрываем всплывающие окна (3 способа) *** //
// Кнопка закрыть всплывающее окно (крестик)
// function closePopupButton(evt) {
//   closePopup(evt.target.closest('.popup'));
//   removeListenersAndClosePopup();
// }

// // Закрываем всплывающее окно кликом по оверлею
// function closePopupClick (evt) {
//   if (evt.target.classList.contains('popup')) {
//     evt.target.classList.remove('popup-opened');
//     removeListenersAndClosePopup();
//   }
// }

// // Закрываем всплывающее окно кнопкой Esc
// function closePopupEsc(evt) {
//   if (evt.key === 'Escape') {
//     const close = document.querySelector('.popup-opened');
//     close.classList.remove('popup-opened');
//     removeListenersAndClosePopup();
//   }
// }



// *** Создаем карточки *** //
// Добавляем в разметку 6 готовых карточек
// function addInitialCards() {
//   initialCards.forEach((item) => {
//     renderCard(item)
//   });
// }
// addInitialCards();

// переменные элементы карточек
const elements = '.elements';
const elementsComponent = document.querySelector(elements);

// Добавляем в разметку 6 готовых карточек
const section = new Section({ items: initialCards, renderer: (item) => {
  renderCard(item);} }, elements);

section.renderCards();


// Создаем и добавляем в разметку новую карточку
function renderCard(item) {
  const card = new Card(item, '#card-element', () => popupWithImage.open(item.link, item.name));
  console.log(elements);
  const cardElement = card.generateCard();
  elementsComponent.prepend(cardElement);
}

// Подтверждаем создание карточки
function cardSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = { name: placeInput.value, link: imageInput.value };
  renderCard(newCard);
  // closePopup(popupCards);
}

// const previewImage = document.querySelector('.popup__preview');
// const titleImage = document.querySelector('.popup__title-image');
// const popupImage = document.querySelector('.popup_image');
// const closeImage = document.querySelector('.popup__close-button-image');

// Открываем попап просмотра фотографии
// function handleCardClick(link, name) {
//   previewImage.src = link;
//   previewImage.alt = name;
//   titleImage.textContent = name;
//   openPopup(popupImage);
//   addListenersForOpenPopup(closeImage, popupImage);
// } 



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
// function formSubmitHandler (evt) {
//   evt.preventDefault(); 
//   userInfo.setUserInfo( {
//     'inputTitle': nameInput.value,
//     'inputOccupation': jobInput.value
//   });
//   // profileTitle.textContent = nameInput.value;
//   // profileOccupation.textContent = jobInput.value;
//   closePopup(popupProfile);
// }



// *** Слушатели *** //
// Кнопка подтверждения карточек
cardsElement.addEventListener('submit', cardSubmitHandler);
// Кнопки открытия форм
profileEditButton.addEventListener('click', openPopupProfile);
addCardButton.addEventListener('click', openPopupCards);
// Кнопка подтверждения имени/профессии
// formElement.addEventListener('submit', formSubmitHandler);

