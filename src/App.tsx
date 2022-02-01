import { Login } from 'features/auth';
import { WorkspaceSelect } from 'features/workspace';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Login />
      <WorkspaceSelect />
    </div>
  );
}

export default App;
