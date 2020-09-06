import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {

  open(link, name) {
    const popupPreview = this._popup.querySelector('.popup__preview');
    const popupTitleImage = this._popup.querySelector('.popup__title-image')
    popupPreview.src = link;
    popupPreview.alt = name;
    popupTitleImage.textContent = name;
    
    super.open();
  }
}