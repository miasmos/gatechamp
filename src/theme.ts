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
    killSummary: {
      smartBomb: string;
      hic: string;
      gateCamp: string;
    };
  };
  interface Palette extends PaletteExtended {}
  interface PaletteOptions extends PaletteExtended {}
}

const colors = {
  eve: {
    security: {
      s1p0: "#2c75e2",
      s0p9: "#3a9aeb",
      s0p8: "#4ecdf7",
      s0p7: "#61dba4",
      s0p6: "#72e655",
      s0p5: "#f4fe83",
      s0p4: "#dc6d07",
      s0p3: "#ce440f",
      s0p2: "#bc1117",
      s0p1: "#732121",
      s0p0: "#8d3364",
    },
  },
  killSummary: {
    smartBomb: "red",
    hic: "darkorange",
    gateCamp: "white",
  },
};

const palette = createTheme({
  palette: {
    ...colors,
    primary: {
      main: "#222",
      light: "#333",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#222",
      secondary: "#333",
      disabled: "rgba(22,22,22,0.77)",
    },
    background: {
      default: "#fff",
      paper: "transparent",
    },
  },
});

const theme = createTheme(
  {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            height: "100vh",
            width: "100vw",
          },
          body: {
            textAlign: "center",
            width: "100vw",
            overflowX: "hidden",
          },
          "#root": {
            textAlign: "center",
            width: "100%",
            height: "100%",
          },
          'input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration':
            {
              display: "none",
            },
          "::-webkit-scrollbar": {
            width: 7,
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: palette.palette.primary.main,
            outline: "none",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            "&.MuiAutocomplete-clearIndicator": {
              color: palette.palette.primary.main,
              background: palette.palette.primary.main,
              borderColor: palette.palette.primary.main,
            },
            "&:hover.MuiAutocomplete-clearIndicator": {
              color: palette.palette.primary.main,
              background: palette.palette.primary.main,
              borderColor: palette.palette.primary.main,
            },
            "&.Mui-focused.MuiAutocomplete-clearIndicator": {
              color: palette.palette.primary.main,
              background: palette.palette.primary.main,
              borderColor: palette.palette.primary.main,
            },
          },
          listbox: {
            background: palette.palette.primary.contrastText,
            color: palette.palette.primary.main,
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            ".MuiSlider-rail": {
              opacity: 1,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "inherit",
            },
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
      MuiChip: {
        styleOverrides: {
          root: {
            borderColor: palette.palette.background.paper,
            background: palette.palette.background.paper,
            ".MuiChip-deleteIcon": {
              color: palette.palette.primary.main,
            },
            ".MuiChip-deleteIcon:hover": {
              color: palette.palette.primary.main,
            },
            "&.MuiChip-clickable:hover": {
              background: palette.palette.background.paper,
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            background: palette.palette.primary.contrastText,
            color: palette.palette.primary.main,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            background: palette.palette.primary.main,
            color: palette.palette.primary.contrastText,
          },
          arrow: {
            color: palette.palette.primary.main,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: Link,
          disableRipple: true,
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            borderWidth: "1px",
            "&:hover": {
              background: palette.palette.background.paper,
            },
          },
        },
      },
    },
  },
  palette
);

export default theme;
export { colors, palette };
