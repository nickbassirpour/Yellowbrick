import React, { useState, useEffect } from "react";
import userService from "services/userService";
import debug from "sabio-debug";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import SingleFileUpload from "components/fileupload/SingleFileUpload";
import toastr from "toastr";
import userSchema from "../../schemas/userSchemas";

const UserSettings = (props) => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mi: "",
    avatarUrl: "",
    id: "",
  });

  const _logger = debug.extend("UserSettings");

  useEffect(() => {
    userService
      .getById(props.currentUser.id)
      .then(onGetByIdSuccess)
      .catch(onGetByIdError);
  }, []);

  const onGetByIdSuccess = (response) => {
    setUser((prevState) => {
      const addUserData = { ...prevState };
      addUserData.email = response.item.email;
      addUserData.firstName = response.item.firstName;
      if (response.item.mi === null) {
        addUserData.mi = "";
      } else {
        addUserData.mi = response.item.mi;
      }
      addUserData.lastName = response.item.lastName;
      addUserData.avatarUrl = response.item.avatarUrl;
      addUserData.id = response.item.id;

      return addUserData;
    });
  };

  const onGetByIdError = (err) => {
    _logger("getCurrent Failed:", err);
  };

  const handleUpload = (response) => {
    _logger("From handler:", response);
    setUser((prevState) => {
      const updateAvatar = { ...prevState };
      updateAvatar.avatarUrl = response.item[0].url;

      return updateAvatar;
    });
  };

  const onSaveClick = (values) => {
    const userValues = { ...values };
    userValues.mi = userValues.mi || null;
    userValues.avatarUrl = userValues.avatarUrl || null;

    userService
      .update(userValues.id, userValues)
      .then(onUpdateSuccess)
      .catch(onUpdateError);
  };

  const onUpdateSuccess = (response) => {
    _logger("Update Success:", response);
    toastr.success("Profile Details Successfully Updated");
  };

  const onUpdateError = (err) => {
    _logger("Update Failed:", err);
  };

  return (
    <div className="col-lg-10 col-md-10 col-sm-10">
      <div
        className="border-0 card col-12 justify-content-center"
        style={{ backgroundColor: "white" }}
      >
        <div className="card-header">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Profile Details</h3>
            <p className="mb-0">
              You have full control to manage your own account.
            </p>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <div className="d-flex align-items-center mb-4 mb-lg-0">
                <img
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5GfGomQwUzWsCqesYfd0TNe6MAg0cnsfiQ&usqp=CAU"
                  }
                  id="img-uploaded"
                  alt=""
                  className="avatar-xl rounded-circle"
                />
                <div className="ms-3">
                  <h4 className="mb-1 ">Change Your Avatar</h4>
                  <SingleFileUpload handleUpload={handleUpload} />
                </div>
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h4 className="mb-0">Personal Details</h4>
            <p className="mb-4">Edit your personal information.</p>
            <Formik
              enableReinitialize={true}
              initialValues={user}
              onSubmit={onSaveClick}
              validationSchema={userSchema.userSettingsSchema}
            >
              <Form className="">
                <div className="row justify-content-center">
                  <div className="mb-3 col-md-3 col-sm-12">
                    <div className="mb-3">
                      <label className="ps-1 form-label" htmlFor="mi">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={user.email}
                        disabled={true}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="ps-1 form-label" htmlFor="firstName">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="err-text"
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-md-1 col-sm-12">
                    <div className="mb-3">
                      <label className="ps-1 form-label" htmlFor="mi">
                        M.I.
                      </label>
                      <Field
                        type="text"
                        maxLength="2"
                        name="mi"
                        placeholder="Initial"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label className="ps-1 form-label" htmlFor="lastName">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="err-text"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 text-end">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
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

UserSettings.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserSettings;
