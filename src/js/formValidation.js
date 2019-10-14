































// const patternName = /^[0-9a-zA-Z-;]+$/;
// const patternEmail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;

// export function validateRegistrationForm(registationForm) {
//   let isValid = false;
//   let formfields = getFormData(registationForm);

//   for (const field in formfields) {
//     const error = getError(field, formfields[field]);

//     if (error) {
//       const target = registationForm.querySelector(`input[name=${field}]`);
//       target.classList.add("error");
//       const errorBox = target.nextElementSibling;
//       errorBox.innerText = error;
//     } else {
//       const target = registationForm.querySelector(`input[name=${field}]`);
//       target.classList.remove("error");
//       const errorBox = target.nextElementSibling;
//       errorBox.innerText = "";
//     }
//   }
// }

// function getFormData(form) {
//   let inputs = {};
//   for (let i = 0; i < form.elements.length; i++) {
//     const element = form.elements[i];

//     if (element.tagName.toLowerCase() != "button") {
//       switch (element.type) {
//         case "checkbox":
//           inputs[element.name] = inputs[element.name] || [];
//           if (element.checked) {
//             const value = {
//               [element.value]: element.checked
//             };
//             inputs[element.name] = [...inputs[element.name], value];
//           }

//           break;

//         default:
//           inputs[element.name] = element.value;
//           break;
//       }
//     }
//   }
//   console.log(inputs);
//   return inputs;
// }

// function getError(field, value) {
//   const errorMessages = [
//     "Email должен иметь вид example@eample.com",
//     "Никнейм должен содержать не менее 6 символов",
//     "Никнейм должен содержать не более 32 символов",
//     "Никнейм содержит некорректные символы",
//     "Никнейм должен начинаться с буквы",
//     "Введите корректный Email адрес",
//     "Введите корректный Email адрес",
//     "Введите корректный Email адрес",
//     "Введите корректный Email адрес",
//     "Введите корректный Email адрес"
//   ];

//   const validate = {
//     email: function(email) {
//       if (!patternEmail.test(email)) return errorMessages[0];
//       return false;
//     },
//     nickname: function(nickname) {
//       if (nickname.length < 6) return errorMessages[1];
//       if (nickname.length > 32) return errorMessages[2];
//       if (!patternName.test(nickname))
//         return (
//           errorMessages[3] + ` [${nickname.match(/[^0-9a-zA-Z-;]/).join(", ")}]`
//         );
//       if (/^[^a-zA-Z]/.test(nickname)) return errorMessages[4];
//       return false;
//     },

//     password: function() {},
//     "password-repeated": function() {},
//     "user-agreement": function(agreement) {}
//   };

//   return validate[field](value);
// }
