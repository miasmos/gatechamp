import { Container, Stack, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

const StyledFooter = styled("footer")(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  padding: "40px 0",
  width: "100%",
  marginTop: 100,
  position: "sticky",
  minHeight: 180,
}));

function Footer() {
  return (
    <StyledFooter>
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Stack>placeholder</Stack>
          <Stack>placeholder</Stack>
        </Stack>
      </Container>
    </StyledFooter>
  );
}

export default Footer;