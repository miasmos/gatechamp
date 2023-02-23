import CssBaseline from "@mui/material/CssBaseline";
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
        <Station />
      </div>
    </>
  );
}

export default App;
