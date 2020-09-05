export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    // Общий метод открытия всплывающих окон
    open() {
      this._popup.classList.add('popup-opened');
      this.setEventListeners();
    }

    // Общий метод закрытия всплывающих окон
    close() {
      this._popup.classList.remove('popup-opened');
      this.removeEventListeners();
    }

    // Закрываем кнопкой Esc
<<<<<<< HEAD:src/components/Popup.js
    _handleEscClose (evt) {
=======
    _handleEscClose = (evt) => {
>>>>>>> 0bee2a9c0c1530258c89082eb48a5fe6a787594c:src/components/Popup.js
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    // Закрываем кликом по оверлею
<<<<<<< HEAD:src/components/Popup.js
    _handleOverlayClose (evt) {
=======
    _handleOverlayClose = (evt) => {
>>>>>>> 0bee2a9c0c1530258c89082eb48a5fe6a787594c:src/components/Popup.js
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    }

    // Добавляем слушатели закрытия для всплывающих окон
    setEventListeners() {
      document.addEventListener('keydown', this._handleEscClose);
      document.addEventListener('click', this._handleOverlayClose);
      this._popupCloseButton.addEventListener('click', () => {
        this.close();
      });
    }

    // Удаляем слушатели закрытия для всплывающих окон
    removeEventListeners() {
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('click', this._handleOverlayClose);
    }
  }
  