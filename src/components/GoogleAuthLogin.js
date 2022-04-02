import React, { useContext } from "react";
import GoogleLogin from "react-google-login";

import { GlobalContext } from "../GlobalState";

export default function GoogleAuthLogin() {
  const { userGoogleLogin } = useContext(GlobalContext);
  const responseGoogle = (response) => {
    if (response.accessToken) {
      // login
      userGoogleLogin(response.accessToken);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="LOGIN"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        accessType="offline"
      />
    </div>
  );
}
