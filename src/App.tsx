import React from 'react';

import './App.css';
import {FretBoardView} from './components/FretBoardView';
import {FretBoardDirectionToggle} from './components/FretBoardDirectionToggle';
import {ChordView} from './components/ChordView/ChordView';

function App() {
  return (
    <div className="App">
      <div style={{padding: '10px'}}>
        <FretBoardDirectionToggle></FretBoardDirectionToggle>
        <FretBoardView></FretBoardView>
        <ChordView></ChordView>
      </div>
    </div>
  );
}

export default App;
