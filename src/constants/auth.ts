import * as Yup from "yup";

const emailValidReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

export const loginFormValidation = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
});

export const RegisterFormValidation = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  email: Yup.string()
    .test("emailValidity", "Email is invalid", (value: string | undefined) => {
      if (!value) return false;
      if (!value.match(emailValidReg)) return false;

      return true;
    })

    .required("Email is required!"),
});
