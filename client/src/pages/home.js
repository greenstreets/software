import logo from '../images/logo.svg';
import '../css/home.css';
import Navbar from '../components/navbar.js';
import Footer from '../components/footer.js';


function Home() {
  return (
    <div>
    <Navbar></Navbar>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
}

export default Home;
