import { createTheme, ThemeProvider } from '@mui/material';
import { Checkbox } from 'components/Checkbox';
import { Login } from 'features/auth';
import { ItemsPage, CardsList } from 'features/craft-items';
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
  return <div> 
    <ThemeProvider theme={theme}>
      <Checkbox />
    </ThemeProvider>
  </div>
}

// function App() {
//   return (
//     <div className="App">
//       <Login />
//       <WorkspaceSelect />
//       <CardsList />
//     </div>
//   );
// }

export default App;
