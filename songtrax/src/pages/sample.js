import '../starterstyles.css';
import Header from '../components/header.js';
import React, { useState } from 'react';
import ToggleButtons from '../components/sampleButton';

function App() {
    const [appButtonsState, setAppButtonsState] = useState([]);

    const handleButtonsStateChange = (newButtonsState) => {
      setAppButtonsState(newButtonsState);
    };
  
    const handleLogState = () => {
      console.log(appButtonsState);
    };
  return (
    <div className="App">
      <div>
        <Header />
      </div>
                <h2 className="title">Edit Sample:</h2>
                <form className="card edit-card">
                    <input type="text" value="" ></input>
                    <div className="button-group-container">
                            <button type="button" className="bright-button" onClick={handleLogState}>Save</button>
                    </div>
                </form>

                <div className="toggle-row-container">
                    <div className="row-label">
                        <h4>Instrument</h4>
                    </div>
                    <div className="sequence-row-container">
                        <button className="toggle-selected">Guitar</button>
                        <button className="toggle">Piano</button>
                        <button className="toggle">Violin</button>
                        <button className="toggle">Drums</button>
                    </div>
                </div>

            <div className="toggle-row-container">
                <div className="row-label">
                    <h4>B</h4>
                </div>
                <div className="sequence-row-container">
                    <ToggleButtons  onButtonsStateChange={handleButtonsStateChange} note = 'B'/>
                </div>
            </div>

            <div className="toggle-row-container">
                <div className="row-label">
                    <h4>A</h4>
                </div>
                <div className="sequence-row-container">
                    <ToggleButtons />
                </div>
            </div>

        <footer className="page-footer"></footer>
    </div>
  );
}

export default App;