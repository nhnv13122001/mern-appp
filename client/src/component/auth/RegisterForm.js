import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      setAlert({ type: "danger", message: "Password doesn't match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      console.log(registerData.success);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="mt-4 mb-2" onSubmit={register}>
        <AlertMessage info={alert}></AlertMessage>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={onChangeRegisterForm}
            value={registerForm.username}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={onChangeRegisterForm}
            value={registerForm.password}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            onChange={onChangeRegisterForm}
            value={registerForm.confirmPassword}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p className="mr-2">
        Already have an account?
        <Link to="/login">
          <Button variant="info" className="m-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
