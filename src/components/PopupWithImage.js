import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupPreview = this._popup.querySelector('.popup__preview');
    this._popupTitleImage = this._popup.querySelector('.popup__title-image');
  }

  open(link, name) {
    this._popupPreview.src = link;
    this._popupPreview.alt = name;
    this._popupTitleImage.textContent = name;
    
    super.open();
  }
}