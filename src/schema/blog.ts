import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup
    .string()
    .max(300, "Blog Title can not exceed 400 characters.")
    .required("Blog Title is required"),
  content: yup
    .string()
    .max(5000, "Blog Content can not exceed 5000 characters.")
    .required("Blog content is required"),
});
