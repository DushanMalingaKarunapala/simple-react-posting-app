import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; //use naviagete helps to redirect the  user to specific route pages
export const Login = () => {
  const navigate = useNavigate();

  const signInwithGoogle = async () => {
    // function to start google authenetication process
    const result = await signInWithPopup(auth, provider);

    navigate("/"); // route or url which the user redirects after the authentication
  };

  return (
    <div className="login">
      <p>Sign in with google to Continue</p>

      <button onClick={signInwithGoogle}>Sign in with Google</button>
    </div>
  );
};
