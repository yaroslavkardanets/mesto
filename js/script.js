const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__occupation');
const profileTitle = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

function openPopup () {
  popup.classList.add('popup_opened');
};

function closePopup () {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
