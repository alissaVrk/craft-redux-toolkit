import { createTheme, ThemeProvider } from '@mui/material';
import { Login } from 'features/auth';
import { CardsList } from 'features/craft-items';
import { WorkspaceSelect } from 'features/workspace';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0063ff"
    },
    grey: {
      500: "#acacac"
    },
    action: {
      hoverOpacity: 0.35
    }
  },
  components: {
    MuiCheckbox: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true,
        size: "small"
      }
    }
  }
});

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
