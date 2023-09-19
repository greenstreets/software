import React from "react";
import Footer from "../components/footer";
function LoginForm({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  errorMessage,
}) {
  return (
    <div className="App">
      <header className="App-header">
        {errorMessage ? <div>Invalid Email or Password</div> : null}
        <div className="centre-login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                id="password"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                required
              ></input>
            </div>

            <div>
              <input
                id="username"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              ></input>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default LoginForm;
