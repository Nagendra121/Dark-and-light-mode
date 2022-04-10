import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = "sntuser";
  const loginPassword = "Snt@1234";
  const onSubmit = () => {
    if (username === loginUser && password === loginPassword) {
      alert("Login Successful");
      let credentials = {
        user: username,
        userpassword: password,
      };
      localStorage.setItem("loginCredentials", JSON.stringify(credentials));
      navigate("/home");
    } else {
      alert("Incorrect credentials, Login Failed!!");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();
  return (
    <div className="form_container">
      <div className="form_body mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-primary text-center"> Login Form </h4>
          <div>
            <label htmlFor="username_input" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="input_field"
              {...register("username", {
                required: "Username is required",
              })}
              id="username_input"
              onChange={(e) => setUsername(e.target.value)}
            onKeyUp={() => {
                trigger("username")
            }}/>
            {errors.username && (
              <small className="text-danger"> {errors.username.message}</small>
            )}
          </div>
          <br/>
          <div>
            <label htmlFor="password_input" className="form-label">
              {" "}
              Password:
            </label>
            <input
              type="password"
              className="input_field"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be of 8 characters",
                },
                pattern: {
                    value: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$",
                    message: "Password must contain one special character, alphanumeric characters."
                }
              })}
              id="password_input"
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={() => {
                trigger("password")
            }}
            />
            {errors.password && (
              <small className="text-danger"> {errors.password.message}</small>
            )}
          </div>
          <div className="text-center my-2">
            <button type="submit" style={{margin:'5rem'}} className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
