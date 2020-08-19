import { initialCards, Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

// *** Переменные *** //
// переменные profile
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// переменные popup профиля
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');

// переменные popup карточки
const cardsElement = document.querySelector('.popup__container_cards');
const placeInput = document.querySelector('.popup__input_cards_place');
const imageInput = document.querySelector('.popup__input_cards_image');

// переменные элементы карточек
const elements = '.elements';
const elementsComponent = document.querySelector(elements);



// Открываем попап просмотра фотографии
const popupWithImage = new PopupWithImage('.popup_image');

const userInfo = new UserInfo({ 'title': '.profile__name', 'occupation': '.profile__occupation' });

const popupUserInfo = new PopupWithForm('.popup_profile', (info) => {
  userInfo.setUserInfo(info);
});



// Открываем всплывающее окно профиля, передаем текущие значения
function openPopupProfile() {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.title;
  jobInput.value = profileInfo.occupation;
  popupUserInfo.open();
}



// *** Открываем/закрываем всплывающие окна *** //
// Открываем всплывающее окно создания карточки
function openPopupCards() {
  placeInput.value = '';
  imageInput.value = '';
  popupNewCard.open();
}



// *** Создаем карточки *** //
// Добавляем в разметку 6 готовых карточек
const section = new Section({ items: initialCards, renderer: (item) => {
  renderCard(item);} }, elements);

section.renderCards();

// Создаем новую карточку
const popupNewCard = new PopupWithForm('.popup_cards', () => {
});

// Добавляем новую карточку в разметку
function renderCard(item) {
  const card = new Card(item, '#card-element', () => popupWithImage.open(item.link, item.name));
  const cardElement = card.generateCard();
  elementsComponent.prepend(cardElement);
}

// Подтверждаем создание карточки
function cardSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = { name: placeInput.value, link: imageInput.value };
  renderCard(newCard);
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



// *** Слушатели *** //
// Кнопка подтверждения карточек
cardsElement.addEventListener('submit', cardSubmitHandler);
// Кнопки открытия форм
profileEditButton.addEventListener('click', openPopupProfile);
addCardButton.addEventListener('click', openPopupCards);


