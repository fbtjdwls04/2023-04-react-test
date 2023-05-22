import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import App from "./App";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

const muiThemePaletteKeys = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
];

export default function Root() {
  const theme = createTheme({
    typography: {
      fontFamily: ["GmarketSansMedium"],
    },
    palette: {
      type: "light",
      primary: {
        main: "#ae58f9",
        constrastText: "#fff",
      },
    },
  });

  useEffect(() => {
    const r = document.querySelector(":root");

    muiThemePaletteKeys.forEach((paletteKey) => {
      const themeColorObj = theme.palette[paletteKey];

      for (const key in themeColorObj) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
        }
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  );
}
