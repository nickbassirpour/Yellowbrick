import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const DashboardHome = (props) => {

   const navigate = useNavigate(); 

useEffect(()=> {
   redirect()
},[])

const redirect = () => {
   let topCount = 5;
   let roleValue = "User"

   props.currentUser?.roles.forEach((role)=>{
      let currentVal = topCount;
      switch (role) { 
          case "Admin":
         topCount = 1;
         break;
         case "Advisor":
         topCount = 2;
         break;
         case "Agent":
         topCount = 3;
         break;
         case "Client":
         topCount = 4;
         break;
         default: 
         topCount = 5;
         break;
      }
      if (topCount < currentVal) {
         roleValue = role;
      }
   })
      navigate(`/dashboard/${roleValue.toLowerCase()}`)
   }
   return <></>
}

DashboardHome.propTypes = {
   currentUser: PropTypes.shape({
     roles: PropTypes.arrayOf(PropTypes.string).isRequired,
 }).isRequired
 };

export default DashboardHome;