import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Station from "./components/Station";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Link href="/" underline="none" color="default">
          <Typography variant="h2">EveTrade+</Typography>
        </Link>
        <Station />
      </div>
    </>
  );
}

export default App;
