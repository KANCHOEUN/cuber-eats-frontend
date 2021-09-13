import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => (
  <div>
    <h1>Logged In</h1>
    <button onClick={() => isLoggedInVar(false)}>Click to log out</button>
  </div>
);
