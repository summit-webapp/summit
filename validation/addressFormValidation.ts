import * as Yup from "yup";

export const ShippingValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required field.")
    .min(5, "Name must be atleast 5 characters."),
  address_1: Yup.string().required("The Street Address field is required."),
  //   address_2: Yup.string().required("The Street Address field is required."),
  country: Yup.string().required("The Country field is required."),
  // state: Yup.string().required("The State field is required."),
  // city: Yup.string().required("The City field is required."),
  postal_code: Yup.number()
    .min(6, "The Postal Code field must be at least 6 characters in length.")
    .typeError("The Postal Code field must contain only numbers.")
    .required("The Postal Code field is required."),
  email: Yup.string().email().required("Please enter valid email."),
  contact: Yup.number()
    .typeError("That doesn't look like a phone number.")
    .positive("A phone number can't start with a minus.")
    .integer("A phone number can't include a decimal point.")
    .min(10)
    .required("A phone number is required."),
  
});
