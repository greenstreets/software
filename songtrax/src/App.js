import '../src/starterstyles.css';
import Header from './components/header.js';
import { Link } from "react-router-dom";

function App() {
  return (
    <div classNameName="App">
      <div>
        <Header />
      </div>
          <main>
              <h2 className="title">My Songs</h2>
              <section className="sample">
                  <div className="card">
                      <div className="song-details">
                          <h3>Song Name</h3>
                          <p>Date Created</p>
                      </div>
                      <div className="button-group-container">
                          <Link to = "/share" className="Share">Share</Link>
                          <Link to = "/sample" className="bright-button">Edit</Link>
                      </div>
                  </div>
              </section>

              <div className="create-card">
                  <Link to = "/sample">Create Sample</Link>
              </div>
          </main>

          <footer className="page-footer"></footer>
    </div>
  );
}

export default App;
