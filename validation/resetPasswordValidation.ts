import * as Yup from "yup";

const ResetpasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid Email")
    .required("Please provide an email address"),

  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});
export default ResetpasswordValidation;
