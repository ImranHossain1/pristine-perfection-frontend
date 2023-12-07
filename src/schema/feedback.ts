import * as yup from "yup";

export const feedbackSchema = yup.object().shape({
  comment: yup.string().max(300, "Feedback can not exceed 500 characters."),
});
