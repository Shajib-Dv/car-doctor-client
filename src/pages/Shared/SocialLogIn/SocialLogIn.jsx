/** @format */

import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const SocialLogIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="divider">OR</div>
      <div className="text-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-outline"
        >
          G
        </button>
      </div>
    </>
  );
};

export default SocialLogIn;
