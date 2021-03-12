import "./login.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { ADMIN_AUTHENTICATE_LINK } from "../links";
import { tokenContext } from "../context/tokenProvider";
import { useHistory } from "react-router";

export default function Login() {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const history = useHistory();
  const [setToken] = useContext(tokenContext);

  const [error, setError] = useState("");

  const handleUserNameChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      userName: event.target.value,
    }));
  };
  const handlePasswordChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.userName === "" || values.passWord === "") {
      setError("Input field is empty!");
      return;
    }
    var config = {
      method: "post",
      url: ADMIN_AUTHENTICATE_LINK,
      data: values,
    };

    axios(config)
      .then(function (response) {
        setToken(response.data.jwt);
        sessionStorage.setItem("jwt", response.data.jwt);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="form">
      <input
        type="text"
        placeholder="Enter User Name"
        onChange={handleUserNameChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        required
      />

      <input type="submit" value="Login" onClick={handleSubmit} />
      {setError ? (
        <p style={{ color: "red", textAlign: "center", marginTop: "4px" }}>
          {error}
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
