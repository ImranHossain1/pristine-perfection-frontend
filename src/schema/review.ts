import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  review: yup.string().max(300, "Review can not exceed 300 characters."),
});
