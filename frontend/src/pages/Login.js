import { useState } from "react";

import api from "../services/api";


function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const response = await api.post(
        "login/",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      alert("Login Successful");

      window.location.reload();

    } catch (error) {

      alert("Invalid Credentials");
    }
  };

  return (

    <div
      style={{
        width: "300px",
        margin: "100px auto",
      }}
    >

      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) =>
          setUsername(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "10px",
        }}
      >
        Login
      </button>

    </div>
  );
}

export default Login;