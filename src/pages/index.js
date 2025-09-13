import { enableValidation } from "../scripts/validation.js";
import { settings } from "../scripts/validation.js";
import { setEventListeners } from "../scripts/validation.js";
import {
  showInputError,
  hideInputError,
  hasInvalidInput,
  toggleButtonState,
  disableButton,
  resetValidation,
  checkInputValidity,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4a38bf12-1362-40f0-8a41-245882881b3c",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardList.append(cardEl);
    });

    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    profileAvatarEl.src = user.avatar;
  })
  .catch(console.error);

const editForm = document.querySelector("#edit-profile-form");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileModalClosebtn =
  editProfileModal.querySelector(".modal__close-btn");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");
const avatarModal = document.querySelector("#avatar-modal");
const profileAvatarButton = document.querySelector(".profile__avatar-btn");
const avatarCloseButton = avatarModal.querySelector(".modal__close-btn");
const avatarForm = document.querySelector("#avatar-form");
const deleteModal = document.querySelector("#delete-modal");
const deleteFormCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteForm = deleteModal.querySelector("#delete-form");
const deleteFormCancelButton = deleteModal.querySelector(".modal__cancel-btn");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const editProfileDescriptionInput =
  editProfileModal.querySelector("#description-input");
const profileFormElement = editProfileModal.querySelector(".modal__form");

const avatarInput = avatarModal.querySelector("#avatar-input");

const cardList = document.querySelector(".cards__list");
const cardFormElement = newPostModal.querySelector(".modal__form");
const imageLinkInput = cardFormElement.querySelector("#image-link-input");
const captionInput = cardFormElement.querySelector("#caption-input");
const modalPreview = document.querySelector("#preview-modal");
const previewModalCloseBtn = modalPreview.querySelector(
  ".modal__close-btn_type_preview"
);

const closeOnEscape = function (event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    closeModal(openModal);
  }
};

const closeOverlayClick = function (event) {
  const openModal = document.querySelector(".modal_is-opened");
  if (event.target.classList.contains("modal")) {
    closeModal(openModal);
  }
};
const previewModalImage = modalPreview.querySelector(".modal__image");
const previewModalCaption = modalPreview.querySelector(".modal__caption");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

let selectedCard;
let selectedCardId;

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeOnEscape);
  document.addEventListener("click", closeOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeOnEscape);
  document.removeEventListener("click", closeOverlayClick);
}
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

editProfileModalClosebtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

deleteFormCancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(modalPreview);
});

newPostBtn.addEventListener("click", function () {
  resetValidation(cardFormElement, [imageLinkInput, captionInput], settings);
  disableButton(cardSubmitBtn, settings);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

profileAvatarButton.addEventListener("click", function () {
  avatarInput.value = profileAvatarEl.src;
  resetValidation(avatarForm, [avatarInput], settings);
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", handleProfileAvatarSubmit);

avatarCloseButton.addEventListener("click", function () {
  closeModal(avatarModal);
});

deleteFormCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  api
    .changeProfilePic({
      avatar: avatarInput.value,
    })
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

avatarForm.addEventListener("submit", handleProfileAvatarSubmit);

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";
  api
    .deleteCard({
      id: selectedCardId,
    })
    .then((res) => {
      selectedCard.remove(res);
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Delete";
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleLike(evt, data) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  api
    .changeLikeStatus(data._id, isLiked)
    .then((data) => {
      if (data.isLiked) {
        evt.target.classList.add("card__like-btn_active");
      } else {
        evt.target.classList.remove("card__like-btn_active");
      }
    })
    .catch(console.error);
}

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardImage.id = data._id;

  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-btn_active");
  } else {
    cardLikeButton.classList.remove("card__like-btn_active");
  }
  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data));

  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  cardDeleteButton.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImage.addEventListener("click", function () {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;

    openModal(modalPreview);
  });

  return cardElement;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  api
    .addNewCard({
      name: captionInput.value,
      link: imageLinkInput.value,
    })
    .then((data) => {
      const inputValues = {
        name: data.name,
        link: data.link,
        _id: data._id,
      };
      const cardEl = getCardElement(inputValues);
      cardList.prepend(cardEl);
      closeModal(newPostModal);
      captionInput.value = "";
      imageLinkInput.value = "";
      disableButton(cardSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

cardFormElement.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
