import * as Yup from 'yup';

export const ForgotValidation = Yup.object().shape({
    email:Yup.string()
        .email("Enter valid Email")
        .required("Please provide an email address"),
});