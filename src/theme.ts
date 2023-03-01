import { createTheme } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import Link from "./components/Link";

declare module "@mui/material/styles/createPalette" {
  type PaletteExtended = {
    eve: {
      security: {
        s1p0: string;
        s0p9: string;
        s0p8: string;
        s0p7: string;
        s0p6: string;
        s0p5: string;
        s0p4: string;
        s0p3: string;
        s0p2: string;
        s0p1: string;
        s0p0: string;
      };
    };
  };
  interface Palette extends PaletteExtended {}
  interface PaletteOptions extends PaletteExtended {}
}

const colors = {
  eve: {
    security: {
      s1p0: "#2e74dc",
      s0p9: "#389cf3",
      s0p8: "#48cff4",
      s0p7: "#5bdcaa",
      s0p6: "#73e352",
      s0p5: "#eeff83",
      s0p4: "#df6a0d",
      s0p3: "#c94816",
      s0p2: "#bb0f19",
      s0p1: "#6d2126",
      s0p0: "#8c3263",
    },
  },
};

const palette = createTheme({
  palette: {
    ...colors,
  },
});

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
            textDecoration: "none",
            ":visited": {
              color: palette.palette.primary.main,
            },
          },
        },
        defaultProps: {
          component: Link,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: Link,
        },
      },
    },
  },
  palette
);

export default theme;
export { colors };
