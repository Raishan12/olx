import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className=' underline underline-offset-4 decoration-3 hover:no-underline' onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;