import * as yup from "yup";

export const serviceSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  categoryId: yup.string().required("Category is Required"),
  price: yup.string().required("Price is Required"),
  availability: yup.string().required("Availability is Required"),
});
