import { openPopup, addListenersForOpenPopup } from '../pages/index.js';


const popupImage = document.querySelector('.popup_image');
const closeImage = document.querySelector('.popup__close-button-image');

// *** Работаем с карточками *** //
// массив карточек
export const initialCards = [
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

export class Card {
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
      handlePreviewPicture(this._link, this._name);
    });
  }
  // Обработчик удаления карточки 
  _handleTrash() {
    this._element.remove();
    this._element = null;
    _removeEventListeners();
  }

  // Обработчик удаления слушателей 
  _removeEventListeners() {
    this._element.querySelector('.element__like').removeEventListener('click', () => {
      this._handleLike();
    });
    // слушатель удаления
    this._element.querySelector('.element__trash').removeEventListener('click', () => {
      this._handleTrash();
    });
    // слушатель просмотра фотографии
    this._element.querySelector('.element__image').removeEventListener('click', () => {
      handlePreviewPicture();
    });
  }
}

// Открываем попап просмотра фотографии
function handlePreviewPicture(/*link, name*/) {
  // previewImage.src = link;
  // previewImage.alt = name;
  // titleImage.textContent = name;
  openPopup(popupImage);
  addListenersForOpenPopup(closeImage, popupImage);
} 