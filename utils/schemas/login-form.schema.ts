import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Введите корректный адрес электронной почты")
    .required("Укажите вашу электронную почту"),
    
  password: yup
    .string()
    .min(3, "Длина пароля должна быть не менее 3 символов")
    .required("Введите пароль для продолжения"),
});