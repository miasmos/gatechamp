import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Station from "./components/Station";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecoilRoot>
          <Box className="App">
            <Link href="/" underline="none" color="default">
              <Typography variant="h2">EveTrade+</Typography>
            </Link>
            <Station />
          </Box>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
