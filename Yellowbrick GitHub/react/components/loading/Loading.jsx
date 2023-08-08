import React from 'react';
import logo from './yellowbrick-logo.png'
import loadingSpinner from './LoadingSpinner.svg'
import './loading.css'

const Loading = () => {
   return (
      <div className="container">
         <div className="splashLoadingLogo">
            <img src={logo} alt="Yellowbrick" />
            <img src={loadingSpinner} />
         </div>
      </div>
   );
};

export default Loading;