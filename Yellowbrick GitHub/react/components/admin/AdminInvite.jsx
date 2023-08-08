import React, {useState, useEffect} from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import userSchema from "../../schemas/userSchemas";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import UserService from "../../services/userService";
import lookUp from "services/lookUpService";
const _logger = debug.extend("AdminInvite");

const AdminInvite = () => {
  const userFormData = {
    email: "",
    userRoleId: 0
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success",
      text: "An invite has just been sent!",
      icon: "success",
      confirmButtonText: "Continue",
      customClass: {
         confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  const showErrorAlert = (err) => {
    Swal.fire({
      title: "Oops!",
      text: err,
      icon: "error",
      confirmButtonText: "Continue",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  const adminInviteSuccess = (res) => {
    _logger("Admin Invite", res);
    showSuccessAlert();
  };

  const adminInviteError = (err) => {
    _logger("Admin Invite", err);
    const errorMessage = err.response.data.errors
    showErrorAlert(errorMessage);
  };

  const handleSubmit = (values) => {
    _logger("AdminInvite", values);
    UserService.adminInvite(values)
      .then(adminInviteSuccess)
      .catch(adminInviteError);
  };

  const [lookUps, setLookUps] = useState({
   tokenTypes: [],
   roleTokenOptions: []
 });

 useEffect(() => {
   lookUp
     .lookUp(["TokenTypes"])
     .then(onGetLookUpSuccess)
     .catch(onGetLookUpError);
 }, []);

 const onGetLookUpSuccess = (response) => {
   _logger(response);
   setLookUps((prevState) => {
     const look = { ...prevState };
     look.rolesTokens = response.item.tokenTypes;
     const userRoles = look.rolesTokens.filter((role) => {
      return (role.name === "Agent" 
      || role.name === "Advisor")
     })
     look.roleTokenOptions = userRoles.map(options);
     return look;
   });
 };

 const onGetLookUpError = (err) => {
   _logger({err}, "err code")
 };

 const options = (lookUp) => {
     return (
       <option
         key={lookUp.id + lookUp.name}
         value={lookUp.id}
         className="text-dark"
       >
         {lookUp.name}
       </option>
     );
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
              <h1 className="mb-1 fw-bold">Invite New User</h1>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={userFormData}
              onSubmit={handleSubmit}
              validationSchema={userSchema.adminInviteSchema}
            >
              {({values}) => ( <Form>
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
                  <div className="mb-3 mt-3 col-lg-12 col-md-12">
                    <label>Select Role</label>
                  <Field
                    as="select"
                    name="userRoleId"
                    className={`form-select ${values.userRoleId ? "text-dark" : "text-secondary"}`}
                  >
                  <option value="" className="text-secondary">
                    Select Role
                  </option>
                  {lookUps.roleTokenOptions}
                  </Field>
                  <ErrorMessage
                  name="userRoleId"
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
                    Send Invite
                  </button>
                </div>
              </Form>
               )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInvite;
