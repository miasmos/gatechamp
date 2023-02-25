import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import DebugRouter from "./components/DebugRouter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <BrowserRouter>
          <DebugRouter>
            <App />
          </DebugRouter>
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
