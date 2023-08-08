import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import userSchema from "../../schemas/userSchemas";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import UserService from "../../services/userService";
const _logger = debug.extend("UpdatePassword");

const UpdatePassword = () => {
  const userFormData = {
    password: "",
    confirmPassword: ""
  };

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search)
  const userEmail = queryParameters.get("email")
  const userToken = queryParameters.get("token")

  const navigate = useNavigate();

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Your password has been reset!",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-primary",
     },
     buttonsStyling: false,
    }).then(function () {
      navigate("/login");
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      title: "Oops!",
      text: "There was an error processing your request",
      icon: "error",
      confirmButtonText: "Try Again",
      customClass: {
        confirmButton: "btn btn-primary",
     },
     buttonsStyling: false,
    });
  };

  const updatePasswordSuccess = (res) => {
    _logger("Update Success", res);
    showSuccessAlert();
  };

  const updatePasswordError = (err) => {
    _logger("Update Error", err);
    showErrorAlert();
  };

  const handleSubmit = (values) => {
    const updateBody = {
      email: userEmail,
      token: userToken,
      password: values.password,
      confirmPassword: values.confirmPassword
    } 
    _logger("Update Password", updateBody);
    UserService.updatePassword(updateBody)
    .then(updatePasswordSuccess)
    .catch(updatePasswordError);
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
              <h1 className="mb-1 fw-bold">Please Update Your Password</h1>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={userFormData}
              onSubmit={handleSubmit}
              validationSchema={userSchema.updatePasswordSchema}
            >
              <Form>
                <div className="mb-3 col-lg-12 col-md-12">
                <div className="mt-3">
                  <label>Password</label>
                  <Field
                    name="password"
                    className="form-control"
                    type="password"
                    placeholder="**************"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="has-error text-danger"
                  />
                  </div>
                  <div className="mt-3">
                  <label>Please confirm your password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="**************"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
                    Update your password
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
