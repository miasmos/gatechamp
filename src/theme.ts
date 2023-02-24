import { createTheme, Theme } from "@mui/material";

const palette = createTheme();
const theme = createTheme(
  {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            display: "flex",
            placeItems: "center",
            minWidth: "320px",
            minHeight: "100vh",
          },
          "#root": {
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "2rem",
            textAlign: "center",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: palette.palette.primary.main,
            ":visited": {
              color: palette.palette.primary.main,
            },
          },
        },
      },
    },
  },
  palette
);

export default theme;
