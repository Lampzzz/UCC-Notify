import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ActionButton from "../../components/button/ActionButton";
import Input from "../../components/form/Input";
import InputContainer from "../../components/container/InputContainer";
import TogglePassword from "../../components/form/TogglePassword";
import { useRegisterMutation } from "../../services/redux/api/authApiSlice";
import { setCredentials } from "../../services/redux/slice/authSlice";

const Register = () => {
  const initialize = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [auth, setAuth] = useState(initialize);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    switch (fieldName) {
      case "username":
        const fisrtNameRegex = /^[a-zA-Z0-9 ]+$/;
        errors.username =
          value.trim() === ""
            ? "Username is required"
            : !fisrtNameRegex.test(value)
            ? "Username cannot contain special characters"
            : "";
        break;

      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        errors.email =
          value.trim() === ""
            ? "Email is required"
            : !emailRegex.test(value)
            ? "Invalid email address"
            : "";
        break;

      case "password":
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
        errors.password =
          value.trim() === ""
            ? "Password is required"
            : !passwordRegex.test(value)
            ? "Invalid password format"
            : "";

        if (auth.confirmPassword && auth.confirmPassword !== value) {
          errors.confirmPassword = "Password does not match";
        } else if (auth.confirmPassword && auth.confirmPassword == value) {
          errors.confirmPassword = "";
        }
        break;

      case "confirmPassword":
        errors.confirmPassword =
          value.trim() === ""
            ? "Confirm Password is required"
            : value !== auth.password
            ? "Password does not match"
            : "";
        break;
      default:
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

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(auth).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/verify-otp");
      setAuth(initialize);
    } catch (error) {
      const responseError = error.data;
      if (responseError && responseError.errors) {
        const serverErrors = responseError.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setValidationErrors(serverErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <div className="mb-3">
        <h3>Register</h3>
        <p>Create an account to use full range of functions.</p>
      </div>
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
        <InputContainer label={"Email"}>
          <Input
            type={"text"}
            name={"email"}
            style={validationErrors.email ? "error" : ""}
            value={auth.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          {validationErrors.email && (
            <small className="text-danger">{validationErrors.email}</small>
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
          <div id="password" className="form-text">
            Your password must be 8-20 characters long, contain atleast one
            capital letters, numbers, and special characters
          </div>
        </InputContainer>
        <InputContainer label={"Confirm Password"}>
          <div className="position-relative">
            <Input
              type={showPassword ? "text" : "password"}
              name={"confirmPassword"}
              style={validationErrors.confirmPassword ? "error" : ""}
              value={auth.confirmPassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <TogglePassword
              showPassword={showConfirmPassword}
              handleTogglePassword={handleToggleConfirmPassword}
            />
          </div>
          {validationErrors.confirmPassword && (
            <small className="text-danger">{validationErrors.password}</small>
          )}
        </InputContainer>
        <ActionButton
          style={"btn mt-4 mb-3 w-100 border-0"}
          type={"submit"}
          label={"Register"}
          isLoading={isLoading}
        />
        <p className="text-center text-black-50">
          Already have an account?
          <span
            className="ms-1 text-decoration-underline "
            style={{ color: "#F7770F" }}
          >
            Sign in
          </span>
        </p>
      </form>
    </>
  );
};

export default Register;
