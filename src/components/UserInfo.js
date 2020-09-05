export class UserInfo {
  constructor({ title, occupation }) {
    this._title = document.querySelector(title);
    this._occupation = document.querySelector(occupation);
  }
  
  // Получаем текущие значения
  getUserInfo() {
    return { 'title': this._title.textContent, 
    'occupation': this._occupation.textContent 
    }
  }

  // Передаем новые значения
  setUserInfo({nameInput, profileOccupation}) {
    this._title.textContent = nameInput;
    this._occupation.textContent = profileOccupation;
  }
}