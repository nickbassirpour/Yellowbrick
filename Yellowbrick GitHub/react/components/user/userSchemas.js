import * as Yup from "yup";

const registerSchema = Yup.object().shape({
   firstName: Yup.string().max(100).required("Is Required"),
   lastName: Yup.string().max(100).required("Is Required"),
   email: Yup.string().max(255).matches(/@[^.]*\./, "Must be a proper email"),
   password: Yup.string().max(100).required("Is Required").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must be 8 characters with at least 1 uppercase, number & special character"
    ),
   confirmPassword: Yup.string().max(100).required("Is Required").oneOf([Yup.ref('password'), null], "Passwords don't match."),
   termsCheckbox: Yup.bool().oneOf([true], 'You need to accept the terms and conditions')
   });

const loginSchema = Yup.object().shape({
   email: Yup.string().max(255).required("Is Required"),
   password: Yup.string().max(100).required("Is Required")
   });

const requestResetSchema = Yup.object().shape({
   email: Yup.string().max(255).required("Is Required"),
   });

const updatePasswordSchema = Yup.object().shape({
   password: Yup.string().max(100).required("Is Required").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must be 8 characters with at least 1 uppercase, number & special character"
      ),
   confirmPassword: Yup.string().max(100).required("Is Required").oneOf([Yup.ref('password'), null], "Passwords don't match."),
})

const adminInviteSchema = Yup.object().shape({
   email: Yup.string().max(255).required("Is Required"), 
   userRoleId: Yup.number(1, 2, 3, 4).required("You must choose a role"),
})

const adminChangeStatus = Yup.object().shape({
   email: Yup.string().max(255).required("Is Required"), 
   statusTypeId: Yup.number(1, 2, 3, 4).required("You must choose a status"),
})

const userSettingsSchema = Yup.object().shape({
    firstName: Yup.string().min(1).max(100).required("Is Required"),
    lastName: Yup.string().min(1).max(100).required("Is Required"),
});

const userSchema = {
  loginSchema,
  registerSchema,
  requestResetSchema,
  updatePasswordSchema,
  adminInviteSchema,
  adminChangeStatus,
  userSettingsSchema,
};

export default userSchema;
