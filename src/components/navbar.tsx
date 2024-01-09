import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth); // this hook will authomatically update the user whenever the user logs in using differrenct account

  const signnoutuser = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <h3>Socialcom</h3>
      <div className="links">
        <Link to={"/"}>Home</Link>
        {!user ? (
          <Link to={"/Login"}>Login</Link> //if the user is not logged in show this link
        ) : (
          <Link to={"/createpost"}>Create a Post</Link> // else show this link(which means the user is logged in)
        )}
      </div>

      <div className="user-details">
        {/* <p>{auth.currentUser?.displayName}</p>
        <img
          src={auth.currentUser?.photoURL || ""}
          width={"50"}
          height={"50"}
          alt=""
        /> */}
        {user && ( //if the user variable form useauthstate is  true or exists or  logged in then only show these
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width={"30"} height={"30"} alt="" />
            <button onClick={signnoutuser}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};
