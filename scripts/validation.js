const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(settings.inputErrorClass);
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonEl) => {
  buttonEl.disabled = true;
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
