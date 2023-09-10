import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LoginSuccess from "../components/footer";
import "../css/login.css";
import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showForm, setShowForm] = useState(true);

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


    // async function handleFormSubmit(event) {
    //     event.preventDefault();
    //     if (!/^\S+@\S+$/.test(event.target[1].value) !== true) {
    //       if (event.target[0].value.trim().length >= 2) {
    //         if (event.target[2].value.trim().length !== 0) {
    //           const contactMessage = {
    //             name: event.target[0].value,
    //             email: event.target[1].value,
    //             subject: event.target[2].value,
    //             message: event.target[3].value,
    //           };
    //           setShowForm(false);
    //           const response = await fetch(
    //             "http://localhost:5000/api/contactmessage",
    //             {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json",
    //               },
    //               body: JSON.stringify(contactMessage),
    //             }
    //           );
    //           await response;
    //         }
    //       }
    //     }
    //   }


    console.log("login");
    async function handleSubmit (event) {
        event.preventDefault();

        var userSuccess = validateUser(username);
        var passSuccess = validatePass(password);
        console.log(validateUser(username))
        console.log(validatePass(password))
        console.log(username);
        console.log(password);

        if (userSuccess && passSuccess) {
            setShowForm(false);  
        }
            

        const userInfo = {
            username: username,
            password: password
          };

        const response = await fetch(
            "http://localhost:8000/api/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            }
        );
        await response;
    }

    return (
        <div>
          <Navbar></Navbar>
            <div className="App">
                <header className="App-header">
                    {showForm ? (
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
                    ) : (
                        <LoginSuccess></LoginSuccess>
                    )}
                </header>
            </div>
           <Footer></Footer>  
        </div>
        

    )
}

export default Login;