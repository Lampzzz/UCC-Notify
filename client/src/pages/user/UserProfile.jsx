import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserDetail } from "@Services/api/fetchUserDetail";
import { useUpdateProfleMutation } from "@Services/redux/api/userApiSlice";
import Container from "@Components/container/Container";
import ProfileButton from "@Components/button/ProfileButton";
import Input from "@Components/form/Input";
import Avatar from "@Components/navbar/Avatar";
import TogglePassword from "@Components/form/TogglePassword";
import ActionButton from "@Components/button/ActionButton";

const UserProfile = () => {
  const initialize = {
    newPassword: "",
    repeatPassword: "",
  };

  const dispatch = useDispatch();
  const { user, setUser } = fetchUserDetail();
  const [updateUser, { isLoading }] = useUpdateProfleMutation();
  const [password, setPassword] = useState(initialize);
  const [validationErrors, setValidationErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

    switch (fieldName) {
      case "newPassword":
        errors.newPassword =
          value.trim() === ""
            ? "New Password is required"
            : !passwordRegex.test(value)
            ? "Invalid password format"
            : "";

        if (password.repeatPassword && password.repeatPassword !== value) {
          errors.repeatPassword = "Password does not match";
        }

        if (password.repeatPassword && password.repeatPassword == value) {
          errors.repeatPassword = "";
        }
        break;

      case "repeatPassword":
        errors.repeatPassword =
          value.trim() === ""
            ? "Repeat Password is required"
            : value !== password.newPassword
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
    if (e.target.name === "image") {
      setUser({ ...user, image: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }

    validateField(e.target.name, e.target.value);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("middleName", user.middleName);
      formData.append("email", user.email);
      formData.append("avatar", user.image);

      const response = await updateUser(formData).unwrap();
      dispatch(setCredentials(response));
      toast.success("User Updated Successfully.");
    } catch (err) {
      toast.error(err.data.errorMessage);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      dispatch(logout());
      toast.success("Account Deleted Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.errorMessage || err.message);
    }
  };

  return (
    <Container>
      <div className="my-5">
        <h2>User Profile</h2>
        <p className="mb-0">Set your account settings down below</p>
      </div>
      <div className="text-center mb-5 d-flex justify-content-center">
        <ProfileButton to="/user/profile" label="Profile" />
        <ProfileButton to="/user/bookmark" label="Bookmark" />
      </div>
      <div className="mb-3 row">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <Avatar
              src={
                user.image
                  ? URL.createObjectURL(user.image)
                  : `http://localhost:3000/image/${user.avatar}`
              }
              handleChange={handleChange}
            />
            <div className="row mb-2">
              <div className="col-12 col-md-6 mb-2 mb-md-0">
                <label htmlFor="username" className="form-label mb-2">
                  Username
                </label>
                <Input
                  type={"text"}
                  name={"username"}
                  style={validationErrors.username ? "error" : ""}
                  value={user.username}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                {validationErrors.username && (
                  <small className="text-danger">
                    {validationErrors.username}
                  </small>
                )}
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  name="email"
                  disabled
                  value={user.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">New Password</label>
              <div className="position-relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  name={"newPassword"}
                  style={validationErrors.newPassword ? "error" : ""}
                  value={password.newPassword}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <TogglePassword
                  showPassword={showNewPassword}
                  handleTogglePassword={handleToggleNewPassword}
                />
              </div>
              {validationErrors.newPassword && (
                <small className="text-danger">
                  {validationErrors.newPassword}
                </small>
              )}
              <div className="form-text">
                Your password must be 8-20 characters long, contain atleast one
                capital letters, numbers, and special characters
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Repeat New Password</label>
              <div className="position-relative">
                <Input
                  type={showRepeatPassword ? "text" : "password"}
                  name={"repeatPassword"}
                  style={validationErrors.repeatPassword ? "error" : ""}
                  value={password.repeatPassword}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <TogglePassword
                  showPassword={showRepeatPassword}
                  handleTogglePassword={handleToggleRepeatPassword}
                />
              </div>
              {validationErrors.repeatPassword && (
                <small className="text-danger">
                  {validationErrors.repeatPassword}
                </small>
              )}
            </div>
            <div className="d-flex flex-column align-items-center mt-3">
              <ActionButton
                style={"btn btn-primary mb-5 w-50 main--button"}
                type={"submit"}
                label={"Save changes"}
                isLoading={isLoading}
                handleClick={handleSubmit}
              />
              <ActionButton
                style={"btn btn-outline-danger mb-5 w-50"}
                type={"submit"}
                label={"Delete Account"}
                handleClick={() => handleDelete(user._id)}
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
