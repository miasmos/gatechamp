import { Container } from "@mui/material";
import { Outlet } from "react-router";
import AppBarWithoutUser from "../components/AppBarWithoutUser";
import ErrorBoundary from "../components/ErrorBoundary";
import Footer from "../components/Footer";

function CheckoutLayout() {
  return (
    <>
      <AppBarWithoutUser />
      <Container
        sx={{
          display: "flex",
          flex: 1,
          mt: "90px",
          minHeight: "70vh",
          alignItems: "center",
        }}
        fixed
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Container>
      <Footer position="fixed" bottom={0} py={5} />
    </>
  );
}

export default CheckoutLayout;
