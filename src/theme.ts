import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        }
      },
      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
          disableFocusRipple: true
        }
      }
    }
  });