import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().required("email is required").email(),
    password: Yup.string().required("password is required"),

})