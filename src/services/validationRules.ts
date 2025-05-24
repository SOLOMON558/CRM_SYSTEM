const MIN_LEGNTH_USERNAME = 1;
const MAX_LEGNTH_USERNAME = 60;
const MIN_LEGNTH_PASSWORD = 6;
const MAX_LEGNTH_PASSWORD = 60;
const LENGTH_PHONENUMBER = 10;

export const userNameRule = [
  { required: true, message: "Имя не может быть пустым" },
  { min: MIN_LEGNTH_USERNAME, message: "Введите более 1 символа" },
  { max: MAX_LEGNTH_USERNAME, message: "Введите менее 60 символов" },
  {
    pattern: /^[A-Za-zА-Яа-яЁё]+$/,
    message: "Имя состоит только из букв",
  },
];
export const passwordRule = [
  { required: true, message: "Имя не может быть пустым" },
  { min: MIN_LEGNTH_PASSWORD, message: "Введите более 5 символов" },
  { max: MAX_LEGNTH_PASSWORD, message: "Введите менее 60 символов" },
];
export const emailRule = [
  {
    type: "email",
    message: "Введите корректный email",
  },
  {
    required: true,
    message: "Введите email",
  },
];
export const phoneRule = [
  { len: LENGTH_PHONENUMBER, message: "Введите 10 цифр телефона" },
];
