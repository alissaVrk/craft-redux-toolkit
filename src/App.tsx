import { Login } from 'features/auth';
import { ItemsPage, CardsList } from 'features/craft-items';
import { WorkspaceSelect } from 'features/workspace';
import './App.css';

function App() {
  return (
    <div className="App">
      <Login />
      <WorkspaceSelect />
      <CardsList />
    </div>
  );
}

export default App;
