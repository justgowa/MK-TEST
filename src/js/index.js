const form = document.querySelector("form.registration");
let closeButton = document.querySelector(".modal__close-button");
let regOpenButton = document.querySelector(".open-registration-modal");
let regButton = document.querySelector(".registration__button");
let formModal = document.querySelector(".form-modal");
const hints = document.querySelectorAll(".password-hints__item");
let validState = {};
let state = {};

function formCloseHanler(evt) {
  evt.preventDefault();
  form.reset();
  formModal.classList.add("hidden");
  for (const field in validState) {
    removeError(document.querySelector(`[name=${field}]`));
  }
  passwordRules.forEach((rule, idx) => {
    rule.status = null;
    hints[idx].classList.remove("password-hints__item--error");
    hints[idx].classList.remove("password-hints__item--success");
  });
}

regOpenButton.onclick = e => {
  Array.from(form.elements).forEach(field => {
    if (field.tagName.toLowerCase() != "button") {
      validState[field.name] = false;
      field.addEventListener("change", validateField);
      if (field.name === "password")
        field.addEventListener("input", validatePassword);
    }
  });
  e.preventDefault();
  formModal.classList.remove("hidden");
  regButton.onclick = e => {
    e.preventDefault();
  };
};

closeButton.onclick = formCloseHanler;

passwordRules = [
  { status: null, regExp: /^.{6,32}$/ },
  { status: null, regExp: /[0-9]/ },
  { status: null, regExp: /(?=.*[a-z])(?=.*[A-Z])/ }
];

function validatePassword(e) {
  const value = e.target.value;
  passwordRules.forEach((el, idx) => {
    let { status, regExp } = el;
    const ruleCorrect = value.match(regExp);
    if (!status) status = ruleCorrect ? true : false;
    if (status) {
      if (ruleCorrect) {
        hints[idx].classList.add("password-hints__item--success");
        hints[idx].classList.remove("password-hints__item--error");
      } else {
        hints[idx].classList.add("password-hints__item--error");
        hints[idx].classList.remove("password-hints__item--success");
        status = false;
      }
    }
    passwordRules[idx].status = status;
  });
}

function validateField(e) {
  let isFormValid = true;
  const field = e.target;
  const value = e.target.value;
  const error = getError(field, value);
  if (error) {
    validState[field.name] = false;
    showError(e.target, error);
    e.target.addEventListener("input", validateField);
  } else {
    validState[field.name] = true;
    removeError(e.target);
    e.target.removeEventListener("input", validateField);
  }
  for (const key in validState) {
    isFormValid &= validState[key] || false;
  }
  if (!isFormValid) {
    regButton.classList.add("disabled");
    regButton.onclick = e => e.preventDefault();
    return false;
  }
  finishRegistration();
}

function getError(field, value) {
  const patternName = /^[0-9a-zA-Z-;]+$/;
  const patternEmail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
  const errorMessages = [
    "Email должен иметь вид example@eample.com",
    "Никнейм должен содержать не менее 3 символов",
    "Никнейм должен содержать не более 40 символов",
    "Никнейм содержит некорректные символы",
    "Никнейм должен начинаться с буквы",
    "Пароль не должен совпадать с адрессом почты",
    "Пароль не должен совпадать с никнеймом",
    "Пароли не совпадают",
    "Примите условия пользовательского соглашения"
  ];

  const validate = {
    email: function() {
      if (!patternEmail.test(state.email)) return errorMessages[0];
      return false;
    },
    nickname: function() {
      if (state.nickname.length < 3) return errorMessages[1];
      if (state.nickname.length > 40) return errorMessages[2];
      if (!patternName.test(state.nickname))
        return (
          errorMessages[3] +
          ` [${state.nickname.match(/[^0-9a-zA-Z-;]/).join(", ")}]`
        );
      if (/^[^a-zA-Z]/.test(state.nickname)) return errorMessages[4];
      return false;
    },

    password: function() {
      if (state.password === state.email) return errorMessages[5];
      if (state.password === state.nickname) return errorMessages[6];
    },
    "password-repeated": function() {
      if (state["password-repeated"] !== state.password)
        return errorMessages[7];
    },
    "user-agreement": function() {
      if (!state["user-agreement"]) return errorMessages[8];
    }
  };

  if (field.type == "checkbox" || field.type == "radio") {
    if (field.checked) state[field.name] = true;
    else state[field.name] = false;
  } else {
    state[field.name] = value;
  }

  return validate[field.name](state[field.name]);
}

function showHints() {}

function showError(element, error) {
  element.classList.add("error");
  const errorBox = element.parentNode.querySelector(".form-error");
  errorBox.innerText = error;
}

function removeError(element) {
  element.classList.remove("error");
  const errorBox = element.parentNode.querySelector(".form-error");
  errorBox.innerText = "";
}

function finishRegistration() {
  regButton.classList.remove("disabled");
  regButton.onclick = null;
  form.onsubmit = e => {
    e.preventDefault();
    console.log(JSON.stringify(state));
    regOpenButton.onclick = e => e.preventDefault();
    regOpenButton.classList.add("disabled");
    formModal.classList.add("hidden");
  };
}
