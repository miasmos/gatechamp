import { Container } from "@mui/material";
import { Outlet } from "react-router";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";

function ScrolledLayout() {
  return (
    <>
      <AppBar />
      <Container
        sx={{
          display: "flex",
          flex: 1,
          mt: "120px",
          minHeight: "70vh",
          alignItems: "center",
          flexDirection: "column",
        }}
        fixed
      >
        <Outlet />
      </Container>
      <Footer mt={40} />
    </>
  );
}

export default ScrolledLayout;
