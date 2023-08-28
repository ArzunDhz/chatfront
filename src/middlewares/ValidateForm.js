import * as Yup from "yup";

export const FormSchema = Yup.object({
  username: Yup.string().max(12),
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string().required("Password Required"),
});
