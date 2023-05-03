import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import App from "./App";

export default function Root() {
  const theme = createTheme({
    typography: {
      fontFamily: ["GmarketSansMedium"],
    },
    palette: {
      type: "light",
      primary: {
        main: "#ffb300",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
