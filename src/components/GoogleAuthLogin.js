import React from "react";
import GoogleLogin from "react-google-login";

export default function GoogleAuthLogin() {
  const responseGoogle = (response) => {
    console.log(response);
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
