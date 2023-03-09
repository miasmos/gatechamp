import {
  Container,
  Link,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { AppRoute } from "../enum";
import { LogoIcon } from "./icon";

const StyledFooter = styled("footer")(() => ({
  padding: "40px 0",
  width: "100%",
  position: "fixed",
  minHeight: 80,
  bottom: 0,
}));

function Footer() {
  const theme = useTheme();
  return (
    <StyledFooter>
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Link href={AppRoute.Home}>
              <LogoIcon color={theme.palette.primary.main} width={100} mt={1} />
            </Link>
            <Typography variant="caption" mt={-0.4}>
              ©{new Date().getFullYear()} GateChamp
            </Typography>
          </Stack>
          <Stack></Stack>
        </Stack>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
