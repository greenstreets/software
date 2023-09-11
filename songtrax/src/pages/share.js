import '../starterstyles.css';
import Header from '../components/header.js';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
            <h2 className="title">Share This Sample</h2>

            <div className="card">
                <div className="song-details">
                    <h3>Sample Name</h3>
                    <p>Date Created</p>
                </div>
                <div className="buttons">
                    <a href="#" className="bright-button" >Preview</a>
                </div>
            </div>

            <div className="toggle-row-container">
                <div className="location-name-label">
                    <h4>Location 1</h4>
                </div>
                <div className="sequence-row-container">
                    <button className="toggle-selected" >Shared</button>
                    <button className="toggle">Not Shared</button>
                </div>
            </div>
        <footer className="page-footer"></footer>
    </div>
  );
}

export default App;