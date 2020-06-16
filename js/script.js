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
const previewImage = document.querySelector('.popup__preview');
const titleImage = document.querySelector('.popup__title-image');


// *** Открываем/закрываем всплывающие окна *** //
// Общая функция закрыть/открыть popup
function openClosePopup(element) {
  element.classList.toggle('popup-opened');
}

// *** Открываем всплывающие окна *** //
// Открываем popup профиля, передаем текущие значения
function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
  document.addEventListener('keydown', closePopupEsc);
  closeButtonProfile.addEventListener('click', closePopupButton);
  popupProfile.addEventListener('click', closePopupClick);
  openClosePopup(popupProfile);
  openClosePopup(closeButtonProfile);
}

// Открываем попап создания карточки
function openPopupCards() {
  placeInput.value = '';
  imageInput.value = '';
  closeButtonCards.addEventListener('click', closePopupButton);
  document.addEventListener('keydown', closePopupEsc);
  popupCards.addEventListener('click', closePopupClick);
  openClosePopup(popupCards);
}

// Открываем popup просмотра фотографии
function previewImages(evt) {
  previewImage.setAttribute('src', evt.target.src);
    titleImage.textContent = name;
    closeImage.addEventListener('click', closePopupButton);
    document.addEventListener('keydown', closePopupEsc);
    popupImage.addEventListener('click', closePopupClick);
    openClosePopup(popupImage);
}


// *** закрываем всплывающие окна (3 способа) *** //
// Кнопка закрыть popup (крестик)
function closePopupButton(evt) {
  openClosePopup(evt.target.closest('.popup'));
  closeButtonProfile.removeEventListener('click', closePopupButton);
  closeButtonCards.removeEventListener('click', closePopupButton);
  closeImage.removeEventListener('click', closePopupButton);
}

// Закрываем popup кликом по оверлею
function closePopupClick (evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup-opened');
  }
  popupProfile.removeEventListener('click', closePopupClick);
  popupCards.removeEventListener('click', closePopupClick);
  popupImage.removeEventListener('click', closePopupClick);
}

// Закрываем popup кнопкой Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const close = document.querySelector('.popup-opened');
    close.classList.remove('popup-opened');
  }
  document.removeEventListener('keydown', closePopupEsc);
}


// *** Работаем с карточками *** //
// массив карточек
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

// *** Блок работы с карточкой *** //


// Собираем карточку
function cardItem (name, link) {
  const cardElement = document.querySelector('#card-element').content;
  const element = cardElement.cloneNode(true);
  const elementTitle = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const elementLike = element.querySelector('.element__like'); 
  const elementTrash = element.querySelector('.element__trash');
  
  elementTitle.textContent = name;
  elementImage.src = link; 

  elementLike.addEventListener('click', cardLike);
  elementTrash.addEventListener('click', deleteCard);
  elementImage.addEventListener('click', previewImages);
  return element;
}

// активируем like
function cardLike (evt) {
  evt.target.classList.toggle('element__like_active');
}
// Удаляем карточку
function deleteCard (evt) {
  evt.target.closest('.element').remove();
}

// Создаем массив карточек
function makeCard (card) {
  card.forEach(function (item) {
    elements.append(cardItem (item.name, item.link));
  })
}
makeCard(initialCards);


// *** Создаем/сохраняем данные попапов *** //
// Обработка титульного popup для отправки на сервер
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  openClosePopup(popupProfile);
}

// Добавляем карточки
function cardSubmitHandler (evt) {
  evt.preventDefault();
  elements.prepend(cardItem (placeInput.value, imageInput.value));
  placeInput.value = '';
  imageInput.value = '';
  openClosePopup(popupCards);
}


// *** Слушатели *** //
// Кнопка подтверждения карточек
cardsElement.addEventListener('submit', cardSubmitHandler);
// Кнопки открытия форм
profileEditButton.addEventListener('click', openPopupProfile);
addCardButton.addEventListener('click', openPopupCards);
// Кнопка подтверждения имени/профессии
formElement.addEventListener('submit', formSubmitHandler);

