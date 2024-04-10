import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ActionButton from "../../components/button/ActionButton";
import Input from "../../components/form/Input";
import InputContainer from "../../components/container/InputContainer";
import TogglePassword from "../../components/form/TogglePassword";
import MessageBox from "../../components/form/MessageBox";
import { useLoginMutation } from "../../services/redux/api/authApiSlice";
import { setCredentials } from "../../services/redux/slice/authSlice";

const Login = () => {
  const initialize = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(initialize);
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState();

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    switch (fieldName) {
      case "username":
        errors.username = value.trim() === "" ? "Username is required" : "";
        break;

      case "password":
        errors.password = value.trim() === "" ? "Password is required" : "";
        break;
    }

    setValidationErrors(errors);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(auth).unwrap();
      dispatch(setCredentials(response));

      if (response.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

      setAuth(initialize);
    } catch (err) {
      const responseError = err.data;
      if (responseError && responseError.errors) {
        const serverErrors = responseError.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});

        setValidationErrors(serverErrors);
      } else {
        setMessage({
          type: "danger",
          text: err.data.errorMessage,
        });
      }
    }
  };

  return (
    <>
      <div className="mb-3">
        <h3>Login</h3>
        <p>Welcome back!</p>
      </div>
      {message && (
        <MessageBox
          type={message.type}
          text={message.text}
          handleClick={() => setMessage(null)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <InputContainer label={"Username"}>
          <Input
            type={"text"}
            name={"username"}
            style={validationErrors.username ? "error" : ""}
            value={auth.username}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          {validationErrors.username && (
            <small className="text-danger">{validationErrors.username}</small>
          )}
        </InputContainer>
        <InputContainer label={"Password"}>
          <div className="position-relative">
            <Input
              type={showPassword ? "text" : "password"}
              name={"password"}
              style={validationErrors.password ? "error" : ""}
              value={auth.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <TogglePassword
              showPassword={showPassword}
              handleTogglePassword={handleTogglePassword}
            />
          </div>
          {validationErrors.password && (
            <small className="text-danger">{validationErrors.password}</small>
          )}
        </InputContainer>
        <div className="text-start">
          <span className="text-black-50">Forgot password?</span>
        </div>
        <ActionButton
          style={"btn btn-primary mt-4 mb-3 w-100 border-0"}
          type={"submit"}
          label={"Login"}
          isLoading={isLoading}
          handleClick={handleSubmit}
        />
        <p className="text-center text-black-50">
          Don't have an account?
          <span
            className="ms-1 text-decoration-underline "
            style={{ color: "#F7770F", cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target="#register"
          >
            Sign up
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;
