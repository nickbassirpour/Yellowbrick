import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import userSchema from "../../schemas/userSchemas";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import UserService from "../../services/userService";
const _logger = debug.extend("RequestReset");

const ResetPassword = () => {
  const userFormData = {
    email: "",
  };

  const navigate = useNavigate();

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Reset password request has been sent to your email!",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-primary",
     },
     buttonsStyling: false,
    }).then(function () {
      navigate("/");
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      title: "Oops!",
      text: "Invalid Email",
      icon: "error",
      confirmButtonText: "Try Again",
      customClass: {
        confirmButton: "btn btn-primary",
     },
     buttonsStyling: false,
    });
  };

  const requestResetSuccess = (res) => {
    _logger("login success", res);
    showSuccessAlert();
  };

  const requestResetError = (err) => {
    _logger("login error", err);
    showErrorAlert();
  };

  const handleSubmit = (values) => {
    _logger("ResetPassword", values);
    const email = values.email
    UserService.requestReset(email)
      .then(requestResetSuccess)
      .catch(requestResetError);
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
              <h1 className="mb-1 fw-bold">Reset Your Password</h1>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={userFormData}
              onSubmit={handleSubmit}
              validationSchema={userSchema.requestResetSchema}
            >
              <Form>
                <div className="mb-3 col-lg-12 col-md-12">
                  <div className="mt-3">
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
                </div>
                <div className="mb-0 d-grid gap-2 col-lg-12 col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary register-link-btn"
                  >
                    Request Password Reset
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

export default ResetPassword;
