import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  contactNo: yup.string().required("Contact Number is Required"),
  alternativeContactNo: yup
    .string()
    .required("Alternative Contact is Required"),
});
