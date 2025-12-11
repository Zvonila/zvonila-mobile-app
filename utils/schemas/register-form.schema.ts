import * as yup from 'yup';

export const registerSchema = yup.object({
    email: yup
        .string()
        .email("Введите корректный адрес электронной почты")
        .required("Укажите вашу электронную почту"),

    name: yup
        .string()
        .min(2, "Длина имени должна быть не менее 2 символов")
        .required("Укажите вашу электронную почту"),

    password: yup
        .string()
        .min(3, "Длина пароля должна быть не менее 3 символов")
        .required("Введите пароль для продолжения"),

    confirm: yup
        .string()
        .required("Повторите пароль")
        .oneOf([yup.ref("password")], "Пароли не совпадают"),
});