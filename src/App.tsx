import React from 'react';

import './App.css';
import {FretBoardView} from './components/FretBoardView';

function App() {
  return (
    <div className="App">
      <div style={{padding: '10px'}}>
        <FretBoardView direction={'horizontal'}></FretBoardView>
      </div>
    </div>
  );
}

export default App;
