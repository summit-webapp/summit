import * as Yup from 'yup';

const ReviewFormValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  images: Yup.mixed().required('Image is required'),
  description: Yup.string().required('Description is required'),
});

export default ReviewFormValidation;
