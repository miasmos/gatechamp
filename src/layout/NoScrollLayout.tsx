import { Container } from "@mui/material";
import { Outlet } from "react-router";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";

function NoScrollLayout() {
  return (
    <>
      <AppBar />
      <Container
        sx={{ display: "flex", flex: 1, mt: "90px", minHeight: "70vh" }}
      >
        <Outlet />
      </Container>
      <Footer position="fixed" bottom={0} py={6} />
    </>
  );
}

export default NoScrollLayout;
