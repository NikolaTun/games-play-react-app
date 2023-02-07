import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import * as authService from "../../services/authService";
import { authContext } from "../../contexts/authContext";

const Logout = () => {
  const { user, userLogout } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .logout(user.accessToken)
      .then(() => {
        userLogout();
        navigate("/");
      })
      .catch(() => {
        navigate("/");
      });
  });

  return null;
};

export default Logout;
