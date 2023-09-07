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

    console.log("login");
    const handleSubmit = (event) => {
        event.preventDefault();

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