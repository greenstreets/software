import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/login.css";

function Login() {
    console.log("login");
    return (
        <div>
          <Navbar></Navbar>
            <div className="App">
                <header className="App-header">
                    <div className="centre-login">
                        <h2>Login</h2>
                        <form>
                            <div>
                                <input placeholder='Username'>

                                </input>
                            </div>
                            <div>
                                <input placeholder='Password'>
                                </input>
                            </div>
                            <div>
                            <button>Submit</button> 
                            </div>
                        </form>
                    </div>
                </header>
            </div>
           <Footer></Footer>  
        </div>
        

    )
}

export default Login;