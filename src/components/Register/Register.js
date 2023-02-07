import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";

const Register = () => {
  const { userLogin } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = Object.fromEntries(
      new FormData(e.target)
    );

    if (password !== confirmPassword) {
      return;
    }

    authService.register(email, password).then((authData) => {
      userLogin(authData);
      navigate("/");
    });
  };

  return (
    <section id="register-page" className="content auth">
      <form onSubmit={onSubmit} id="register">
        <div className="container">
          <div className="brand-logo" />
          <h1>Register</h1>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="maria@email.com"
          />
          <label htmlFor="pass">Password:</label>
          <input type="password" name="password" id="register-password" />
          <label htmlFor="con-pass">Confirm Password:</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
          <input className="btn submit" type="submit" defaultValue="Register" />
          <p className="field">
            <span>
              If you already have profile click <a href="#">here</a>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Register;
