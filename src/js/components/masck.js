import intlTelInput from 'intl-tel-input';


const input = document.querySelector("#phone");
const input2 = document.querySelector("#phone2");
const input3 = document.querySelector("#phone3");

import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";

const inputMask = new Inputmask('(999)999-99-99');
if (input3) {
  const iti = intlTelInput(input, {
    separateDialCode: true,
    initialCountry: "ru", // Задаём Россию как страну по умолчанию
    searchPlaceholder: "",

  });
  const iti2 = intlTelInput(input2, {
    separateDialCode: true,
    initialCountry: "ru", // Задаём Россию как страну по умолчанию
    searchPlaceholder: "",

  });
  const iti3 = intlTelInput(input3, {
    separateDialCode: true,
    initialCountry: "ru", // Задаём Россию как страну по умолчанию
    searchPlaceholder: "",

  });
  inputMask.mask(input)
  inputMask.mask(input2)
  inputMask.mask(input3)
}

