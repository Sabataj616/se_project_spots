const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalClosebtn = editProfileModal.querySelector(".modal__close-btn");
const addProfileBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput =
  editProfileModal.querySelector("#description-input");
const profileFormElement = document.querySelector(".modal__form");

const cardFormElement = newPostModal.querySelector(".modal__form");
const imageLinkInput = cardFormElement.querySelector("#image-link-input");
const captionInput = cardFormElement.querySelector("#caption-input");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  profileNameEl.textContent = "Bessie Coleman";
  profileDescriptionEl.textContent = "Civil Aviator";
  editProfileModal.classList.add("modal_is-opened");
});

modalClosebtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

addProfileBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
  imageLinkInput.value = someThing.textContent;
  captionInput.value = someOtherThing.textContent;
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log("submitting");
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log("submitting");
  someThing.textContent = imageLinkInput.value;
  someOtherThing.textContent = captionInput.value;

  newPostModal.classList.remove("modal_is-opened");
}

cardFormElement.addEventListener("submit", handleAddCardSubmit);
