import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import userSchema from "../../schemas/userSchemas";
import Swal from "sweetalert2";
import userService from "../../services/userService";
import debug from "sabio-debug";
const _logger = debug.extend("Register");

const Register = () => {
  const userFormData = {
    firstName: "",
    mi: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userToken: "",
    termsCheckbox: false,
  };

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search)
  const userToken = queryParameters.get("token")
  const userEmail = queryParameters.get("email")

  const navigate = useNavigate();

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success",
      text: "You have successfully registered!",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    }).then(function () {
      navigate("/login");
    });
  };

  const showErrorAlert = (err) => {
    Swal.fire({
      title: "Error",
      text: err,
      icon: "error",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  const registerSuccess = (res) => {
    _logger("register success", res);
    showSuccessAlert();
  };

  const registerError = (err) => {
    _logger("register error", err);
    const errCode = err.response.status;
    let errMessage = err.response.data.errors;
    if (errCode === 400)
    {
      errMessage = "You do not have a proper invitation to join.";
    }
    showErrorAlert(errMessage);
  };

  const handleSubmit = (values) => {
    _logger("Register New User", values);
    const registerBody = {...values}
    _logger(userToken)
    registerBody.userToken = userToken
    registerBody.mi = registerBody.mi || null;
    registerBody.email = userEmail
    _logger(registerBody)
    userService.addUser(registerBody).then(registerSuccess).catch(registerError);
  };

  return (
    <div className="align-items-center justify-content-center g-0 min-vh-100 row">
      <div className="py-8 py-xl-0 col-lg-4 col-md-4">
        <div className="card bg-white">
          <div className="p-6 card-body">
            <div className="justify-content-center">
              <a href="/">
                <img
                  src="https://trello.com/1/cards/64a740bd64fa9d6b6a3c6305/attachments/64a740c41d0afd90d2f3e012/previews/64a740c41d0afd90d2f3e05c/download/Yellowbrick-financial-logo-1024x610-1.png"
                  alt=""
                  className="mb-4 img-fluid"
                />
              </a>
              <h1 className="mb-1 fw-bold">Sign up</h1>
              <span>
                Already have an account?{" "}
                <a className="ms-1 text-warning" href="/login">
                  Sign in
                </a>
              </span>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={userFormData}
              onSubmit={handleSubmit}
              validationSchema={userSchema.registerSchema}
            >
              <Form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="row">
                      <div className="col-md-5 mb-4">
                        <label>First Name</label>
                        <Field
                          placeholder="First Name"
                          name="firstName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="has-error text-danger"
                        />
                      </div>
                      <div className="col-md-2 mb-4">
                        <label>M.I.</label>
                        <Field
                          placeholder="M.I."
                          name="mi"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-5 mb-4">
                        <label>Last Name</label>
                        <Field
                          placeholder="Last Name"
                          name="lastName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="has-error text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 col-lg-12 col-md-12">
                    <label>Email </label>
                    <Field
                      placeholder="Email address here"
                      name="email"
                      className="form-control disabled"
                      disabled={true}
                      value={userEmail}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="has-error text-danger"
                    />
                  </div>
                  <div className="mb-3 col-lg-12 col-md-12">
                    <label>Password </label>
                    <Field
                      type="password"
                      placeholder="**************"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="has-error text-danger"
                    />
                  </div>
                  <div className="mb-3 col-lg-12 col-md-12">
                    <label>Confirm Password </label>
                    <Field
                      type="password"
                      placeholder="**************"
                      name="confirmPassword"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="has-error text-danger"
                    />
                  </div>
                  <div className="mb-3 col-lg-12 col-md-12">
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="termsCheckbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">
                        I agree to the{" "}
                        <a
                          href="/pages/terms-and-conditions"
                          className="text-warning"
                        >
                          Terms of Service{" "}
                        </a>{" "}
                        and{" "}
                        <a
                          href="/pages/terms-and-conditions"
                          className="text-warning"
                        >
                          Privacy Policy.
                        </a>
                      </label>
                      <ErrorMessage
                        name="termsCheckbox"
                        component="div"
                        className="has-error text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-0 d-grid gap-2 col-lg-12 col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary register-link-btn"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
            <hr className="my-4" />
            <div className="mt-4 text-center">
              <a
                className="btn-social btn-social-outline btn-facebook"
                href="/authentication/sign-up/"
              >
                <i className="fab fa-facebook" />
              </a>{" "}
              <a
                className="btn-social btn-social-outline btn-twitter"
                href="/authentication/sign-up/"
              >
                <i className="fab fa-twitter" />
              </a>{" "}
              <a
                className="btn-social btn-social-outline btn-linkedin"
                href="/authentication/sign-up/"
              >
                <i className="fab fa-linkedin" />
              </a>{" "}
              <a
                className="btn-social btn-social-outline btn-github"
                href="/authentication/sign-up/"
              >
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
