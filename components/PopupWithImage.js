import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  open(link, name) {
    this._popup.querySelector('.popup__preview').src = link;
    this._popup.querySelector('.popup__preview').alt = name;
    this._popup.querySelector('.popup__title-image').textContent = name;
    
    super.open();
  }
}