import React from 'react';

import './App.css';
import {FretBoardView} from './components/FretBoardView';
import {FretBoardDirectionToggle} from './components/FretBoardDirectionToggle';

function App() {
  return (
    <div className="App">
      <div style={{padding: '10px'}}>
        <FretBoardDirectionToggle></FretBoardDirectionToggle>
        <FretBoardView></FretBoardView>
      </div>
    </div>
  );
}

export default App;
