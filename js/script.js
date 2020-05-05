// пременные profile
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
let profileTitle = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// popup профиля
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const popupTitle = document.querySelector('.popup__title');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');

// Открываем форму профиля и присваиваиваем значения полям
function openPopup () {
  popup.classList.add('popup-opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
}

// Закрываем форму
function closePopup () {
  popup.classList.remove('popup-opened');
  popupCards.classList.remove('popup-opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopup();
}

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const cardElement = document.querySelector('#card-element').content;
const cardTitle = document.querySelector('.element__title');
const cardImage = document.querySelector('.element__image');
const cardLike = document.querySelector('.element__like');

function cardItem() {
  initialCards.forEach((item) => {
    const element = cardElement.cloneNode(true);
    element.querySelector('.element__title').textContent = item.name;
    element.querySelector('.element__image').src = item.link; 

    // активируем like
    element.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });
    element.querySelector('.element__trash').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
    });
    elements.append(element);
  });
}
cardItem (initialCards); 

const popupCards = document.querySelector('.popup-cards');
const cardsElement = document.querySelector('.popup-cards__container');
const closeButtonCards = document.querySelector('.popup-cards__close-button');
const placeInput = document.querySelector('.popup-cards__input_place');
const imageInput = document.querySelector('.popup-cards__input_image');
const cardSubmitButton = document.querySelector('.popup-cards__submit-button');

function openPopupCards () {
  popupCards.classList.add('popup-opened');
  placeInput.value = '';
  imageInput.value = '';
}

function cardSubmitHandler (evt) {
  evt.preventDefault();
  const element = cardElement.cloneNode(true);
  element.querySelector('.element__image').src = imageInput.value;
  element.querySelector('.element__title').textContent = placeInput.value;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  elements.prepend(element);
  openPopupCards();
  closePopup();
}

cardsElement.addEventListener('submit', cardSubmitHandler);
editButton.addEventListener('click', openPopup);
addCardButton.addEventListener('click', openPopupCards);
closeButton.addEventListener('click', closePopup);
closeButtonCards.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);