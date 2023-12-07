import * as yup from "yup";

export const faqSchema = yup.object().shape({
  question: yup
    .string()
    .max(300, "FAQ Question can not exceed 400 characters.")
    .required("FAQ Question is required"),
  answer: yup
    .string()
    .max(5000, "FAQ Answer can not exceed 2000 characters.")
    .required("FAQ Answer is required"),
});
