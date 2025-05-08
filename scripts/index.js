const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalClosebtn = editProfileModal.querySelector(".modal__close-btn");
const addProfileBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

modalClosebtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

addProfileBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});