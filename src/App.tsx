import { ThemeProvider } from '@mui/material';
import { Login } from 'features/auth';
import { CardsList } from 'features/craft-items';
import { WorkspaceSelect } from 'features/workspace';
import { theme } from "./theme"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Login />
        <WorkspaceSelect />
        <CardsList />
      </div>
    </ThemeProvider>
  );
}

export default App;
