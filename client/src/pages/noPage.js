import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import logo from "../images/logo.svg";

const NoPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <h1>404 Page Not Found</h1>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NoPage;
