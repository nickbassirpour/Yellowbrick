import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import debug from "sabio-debug";
import UserService from "../../services/userService";
const _logger = debug.extend("ConfirmEmail")

const ConfirmEmail = () => {
  const [textOnScreen, setTextOnScreen] = useState({
    message: "Your Email is Confirmed!", 
    button: "Sign In",
    newRequestNeeded: false})

   const location = useLocation();
   const queryParameters = new URLSearchParams(location.search)
   const userEmail = queryParameters.get("email") 
   const userToken = queryParameters.get("token")

   useEffect(()=> {
    _logger(userEmail, userToken);
    UserService.confirmEmail(userEmail, userToken).
    then(confirmEmailSuccess).
    catch(confirmEmailError);
   }, [])

   const confirmEmailSuccess = (res) => {
    _logger("Confirm Email Success", res);
   };

   const confirmEmailError = (err) => {
    setTextOnScreen((prevState) => { 
     const newText = {...prevState}
     newText.message = err.response.data.errors
     newText.button = "Send another request"
     newText.newRequestNeeded = true
    return newText
  })
     _logger("Confirm Email Error", err);
   };

   const sendNewRequest = () => {
    _logger("New Request Sent")
   }

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
              <h1 className="mb-1 fw-bold text-center">{textOnScreen.message}</h1>
            </div>
            <div className="mb-0 mt-5 d-grid gap-2 col-lg-6 col-md-6 mx-auto">
              {!textOnScreen.newRequestNeeded ? (
                <a
                href="/login"
                className="btn btn-warning register-link-btn"
              >
                {textOnScreen.button}
              </a>
              ) : (
                <a
                onClick={sendNewRequest}
                className="btn btn-primary register-link-btn"
              >
                {textOnScreen.button}
              </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}

export default ConfirmEmail;