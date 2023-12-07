import * as yup from "yup";

export const profileSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  phone: yup.string().required("Contact Number is Required"),
  address: yup.string().required("Address is Required"),
});
