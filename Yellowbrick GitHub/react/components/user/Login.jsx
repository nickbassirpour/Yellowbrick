import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import userSchema from "../../schemas/userSchemas";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";
import UserService from "../../services/userService";
const _logger = debug.extend("Login");

const Login = () => {
  const userFormData = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const showErrorAlert = () => {
    Swal.fire({
      title: "Oops!",
      text: "Invalid username or password!",
      icon: "error",
      confirmButtonText: "Try Again",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  const loginSuccess = (res) => {
    _logger("login success", res);
    UserService.getCurrent().then(getCurrentSuccess).catch(getCurrentError);
  };

  const loginError = (err) => {
    _logger("login error", err);
    const error = err.response.data.errors;
    showErrorAlert(error[0]);
  };

  const getCurrentSuccess = (res) => {
    const getUser = res.item;

    const currentUser = {
      id: getUser.id,
      roles: getUser.roles,
      email: getUser.email,
      name: getUser.name,
      isLoggedIn: true,
      avatarUrl: getUser.avatarUrl ? getUser.avatarUrl : Avatar1
    };

    const stateToTransport = { type: "USER_LOGIN", user: currentUser };

    _logger("Login moving to App")
      navigate("/dashboard", { state: stateToTransport });
  };

  const getCurrentError = (err) => {
    _logger("Get Current Success", err);
  };

  const handleSubmit = (values) => {
    _logger("Login", values);
    UserService.loginUser(values).then(loginSuccess).catch(loginError);
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
              <h1 className="mb-1 fw-bold">Sign in</h1>
              <div className="mb-2">
              </div>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={userFormData}
              onSubmit={handleSubmit}
              validationSchema={userSchema.loginSchema}
            >
              <Form>
                <div className="mb-3 col-lg-12 col-md-12">
                  <label>Email</label>
                  <Field
                    placeholder="Email address here"
                    name="email"
                    className="form-control"
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
                <label className="pb-2">
                  Forgot password?{" "}
                  <a href="/request-reset-password" className="text-warning">
                    Click here
                  </a>
                </label>
                <div className="mb-0 d-grid gap-2 col-lg-12 col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary register-link-btn"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            </Formik>
            <hr className="my-4" />
            <div className="mt-4 text-center">
              <a
                className="btn-social btn-social-outline btn-instagram"
                href="https://www.instagram.com/yellowbrickfinancial/"
              >
                <i className="fab fa-instagram" />
              </a>{" "}
              <a
                className="btn-social btn-social-outline btn-linkedin"
                href="https://www.linkedin.com/in/gene-santos-803514167/"
              >
                <i className="fab fa-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
