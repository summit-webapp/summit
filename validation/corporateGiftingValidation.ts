import * as Yup from 'yup';

export const CorporateGiftingValidation = Yup.object().shape({
    firstName: Yup.string()
        .required(' First Name is a required field.')
        .min(3, 'First Name must be atleast 3 characters.'),
    lastName: Yup.string()
        .required(' Last Name is a required field.')
        .min(3, 'Last Name must be atleast 3 characters.'),
    requirement: Yup.string().required('Requirement field is required.'),
    emailAddress: Yup.string().email().required('Please enter valid email.'),
    mobileNumber: Yup.number()
        .typeError("That doesn't look like a phone number.")
        .positive("A phone number can't start with a minus.")
        .integer("A phone number can't include a decimal point.")
        .min(10)
        .required('A phone number is required.'),
});
