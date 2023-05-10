import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //Local State
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData.success);
      if (loginData.success) {
        navigate("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="mt-4 mb-2" onSubmit={login}>
        <AlertMessage info={alert}></AlertMessage>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={onChangeLoginForm}
            value={loginForm.username}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={onChangeLoginForm}
            value={loginForm.password}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p className="mr-2">
        Don't have an account?
        <Link to="/register">
          <Button variant="info" className="m-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
