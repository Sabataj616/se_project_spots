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
const editForm = document.querySelector("#edit-profile-form");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalClosebtn = editProfileModal.querySelector(".modal__close-btn");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const editProfileDescriptionInput =
  editProfileModal.querySelector("#description-input");
const profileFormElement = editProfileModal.querySelector(".modal__form");

const cardList = document.querySelector(".cards__list");
const cardFormElement = newPostModal.querySelector(".modal__form");
const imageLinkInput = cardFormElement.querySelector("#image-link-input");
const captionInput = cardFormElement.querySelector("#caption-input");
const modalPreview = document.querySelector("#preview-modal");
const previewModalCloseBtn = modalPreview.querySelector(
  ".modal__close-btn_type_preview"
);

const previewModalImage = modalPreview.querySelector(".modal__image");
const previewModalCaption = modalPreview.querySelector(".modal__caption");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editForm, [editProfileNameInput, editProfileDescriptionInput]);
  openModal(editProfileModal);
});

modalClosebtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(modalPreview);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);



function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-btn_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");
  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
    cardElement = null;
  });

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
  const inputValues = {
    name: captionInput.value,
    link: imageLinkInput.value,
  };
  const cardEl = getCardElement(inputValues);
  cardList.prepend(cardEl);
  closeModal(newPostModal);
  captionInput.value = "";
  imageLinkInput.value = "";
  disableButton(cardSubmitBtn, settings);
}

cardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardEl = getCardElement(item);
  cardList.append(cardEl);
});
