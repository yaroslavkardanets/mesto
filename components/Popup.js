export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
      this._popup.classList.add('popup-opened');
      this.setEventListeners();
    }

    close() {
      this._popup.classList.remove('popup-opened');
      this.removeEventListeners();
    }

    _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    _handleOverlayClose = (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    }

    setEventListeners() {
      document.addEventListener('keydown', this._handleEscClose);
      document.addEventListener('click', this._handleOverlayClose);
      this._popupCloseButton.addEventListener('click', () => {
        this.close();
      });
    }

    removeEventListeners() {
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('click', this._handleOverlayClose);
    }
  }
  