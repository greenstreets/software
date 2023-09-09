import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/login.css";
import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
      
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // TODO Move code to backend
    const validateUser = (user) => {
        // Allows characters alphanumeric characters as input
        var userRegex = /^[a-zA-Z0-9]+$/;
        
        if (user == null || user.length < 4) {
            return false
        }

        var valid = userRegex.test(user);
                
        return valid;
    };

    // TODO Move code to backend
    const validatePass = (pass) => {
        // Allows characters alphanumeric characters as input
        var passRegex = /^[\u0021-\u007E]+$/;
        
        if (pass == null || pass.length < 6) {
            return false
        }

        var valid = passRegex.test(pass);
                
        return valid;
    };

    console.log("login");
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(validateUser(username))
        console.log(validatePass(password))
        console.log(username);
        console.log(password);
    }

    return (
        <div>
          <Navbar></Navbar>
            <div className="App">
                <header className="App-header">
                    <div className="centre-login">
                        <h2>Login</h2>
                        <form onSubmit = {handleSubmit}>
                            <div>
                               <input id="password" type="text" value={username} onChange={handleUsernameChange} placeholder='Username'>

                                </input> 
                            </div>
                            
                            <div>
                               <input id="username" type="password" value={password} onChange={handlePasswordChange} placeholder='Password'>
                            </input> 
                            </div>
                            
                            
                            <button type='submit'>Submit</button> 
                    
                        </form>
                    </div>
                </header>
            </div>
           <Footer></Footer>  
        </div>
        

    )
}

export default Login;