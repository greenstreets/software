import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import logo from "../images/logo.svg";

const Map = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <h1>Map Here</h1>
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

export default Map;
