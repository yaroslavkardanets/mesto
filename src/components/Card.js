export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Получаем шаблон создания карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Создаем карточку
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
      this._handleCardClick(this._link, this._name);
    });
  }
  // Обработчик удаления карточки 
  _handleTrash() {
    this._element.remove();
    this._element = null;
  }
}

