import { Login } from 'features/auth';
import { ItemsList } from 'features/craft-items';
import { WorkspaceSelect } from 'features/workspace';
import './App.css';

function App() {
  return (
    <div className="App">
      <Login />
      <WorkspaceSelect />
      <ItemsList />
    </div>
  );
}

export default App;
