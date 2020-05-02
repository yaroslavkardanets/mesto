// пременные profile
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
let profileTitle = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
// переменные popup
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
let popupTitle = document.querySelector('.popup__title');
const closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__submit-button');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');



// Открываем форму и присваиваиваем значения полям профиля
function openPopup () {
  popup.classList.add('popup_opened');
  // Меняем заголовок
  popupTitle.textContent = 'Редактировать профиль';
  // Меняем текст кнопки
  submitButton.textContent = 'Сохранить';

  nameInput.value = profileTitle.textContent;
  nameInput.placeholder = 'Имя';

  jobInput.value = profileOccupation.textContent;
}

// Открываем форму для работы с карточками
function openPopupCards () {
  popup.classList.add('popup_opened');
  // Меняем заголовок
  popupTitle.textContent = 'Новое место';
  // Меняем поля ввода
  nameInput.value = '';
  nameInput.placeholder = 'Название';
  jobInput.value = '';
  jobInput.placeholder = 'Ссылка на картинку';
  // Меняем текст кнопки
  submitButton.textContent = 'Создать';
}



// Закрываем форму
function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopup();
}



// Редактирование профиля
editButton.addEventListener('click', openPopup);
// Редактирование картинок
addCardButton.addEventListener('click', openPopupCards);

closeButton.addEventListener('click', closePopup);

//elementLike.addEventListener('click', like);
formElement.addEventListener('submit', formSubmitHandler);



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

const photoElement = document.querySelector('.photo-element').content;
const elements = document.querySelector('.elements');

function cards() {
  elements.innerHTML = '';
  initialCards.forEach(cardItem);
}

function cardItem() {
  initialCards.forEach((item) => {
    const element = photoElement.cloneNode(true);
    element.querySelector('.element__title').textContent = item.name;
    element.querySelector('.element__image').src = item.link;
    element.querySelector('.element__like');
    elements.appendChild(element);
  });

}
cardItem();

// Активируем сердечко
let elementLike = document.querySelector('.element__like');
function like () {
  
}