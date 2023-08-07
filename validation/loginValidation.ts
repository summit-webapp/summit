import * as Yup from 'yup';

export const LoginValidation = Yup.object().shape({
    email:Yup.string()
        .email("Enter valid Email")
        .required("Please provide an email address"),
    password:Yup.string()
        .required("Password field required")
        .min(6, "Password is too short - should be 8 chars minimun"),
});