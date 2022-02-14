import { Login } from 'features/auth';
import { ItemsPage } from 'features/craft-items';
import { WorkspaceSelect } from 'features/workspace';
import './App.css';

function App() {
  return (
    <div className="App">
      <Login />
      <WorkspaceSelect />
      <ItemsPage />
    </div>
  );
}

export default App;
