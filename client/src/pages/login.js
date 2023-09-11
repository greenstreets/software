import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LoginSuccess from "../components/footer";
import "../css/login.css";
import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/loginForm";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const signIn = useSignIn();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const userInfo = {
      username: username,
      password: password,
    };

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (response.ok) {
      const data = await response.json();
      signIn({
        token: data.accessToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: username },
      });
      setIsLoggedIn(true);
    } else {
      setErrorMessage(true);
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Home;
