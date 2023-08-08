import React, {useState, useEffect} from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import userSchema from "../../schemas/userSchemas";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import UserService from "../../services/userService";
import lookUp from "services/lookUpService";
const _logger = debug.extend("ChangeStatus");

const ChangeStatus = () => {
  const userFormData = {
    email: "",
    statusTypeId: 0
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success",
      text: "The user's status has been updated",
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

  const changeStatusSuccess = (res) => {
    _logger("Admin Invite", res);
    showSuccessAlert();
  };

  const changeStatusError = (err) => {
    _logger("Admin Invite", err);
    const errorMessage = err.response.data.errors
    showErrorAlert(errorMessage);
  };

  const handleSubmit = (values) => {
    _logger("AdminInvite", values);
    const email = values.email;
    const statusTypeId = values.statusTypeId;
    UserService.changeStatus(email, statusTypeId)
      .then(changeStatusSuccess)
      .catch(changeStatusError);
  };

  const [lookUps, setLookUps] = useState({
   tokenTypes: [],
   roleTokenOptions: []
 });

 useEffect(() => {
   lookUp
     .lookUp(["StatusTypes"])
     .then(onGetLookUpSuccess)
     .catch(onGetLookUpError);
 }, []);

 const onGetLookUpSuccess = (response) => {
   _logger(response);
   setLookUps((prevState) => {
     const look = { ...prevState };
     look.statusTypes = response.item.statusTypes;
     look.roleTokenOptions = look.statusTypes.map(options);
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
              <h1 className="mb-1 fw-bold">Change A User&apos;s Status</h1>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={userFormData}
              onSubmit={handleSubmit}
              validationSchema={userSchema.adminChangeStatus}
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
                    <label>Status</label>
                  <Field
                    as="select"
                    name="statusTypeId"
                    className={`form-select ${values.statusTypeId ? "text-dark" : "text-secondary"}`}
                  >
                  <option value="" className="text-secondary">
                    Select Status
                  </option>
                  {lookUps.roleTokenOptions}
                  </Field>
                  <ErrorMessage
                  name="statusTypeId"
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
                    Update Status
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

export default ChangeStatus;
