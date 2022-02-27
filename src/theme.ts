import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors"

const black = grey[900];

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
      },
      common: {
          black: black
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