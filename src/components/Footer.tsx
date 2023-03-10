import {
  Container,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
  BoxProps,
} from "@mui/material";
import { WEBSITE_NAME } from "../constants";
import { AppRoute } from "../enum";
import { LogoIcon } from "./icon";
import Link from "./Link";

const StyledFooter = styled(Box)(() => ({
  width: "100%",
  minHeight: 80,
}));

function Footer(props: BoxProps) {
  const theme = useTheme();
  return (
    <StyledFooter component="footer" {...props}>
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Link href={AppRoute.Home}>
              <LogoIcon color={theme.palette.primary.main} width={100} mt={1} />
            </Link>
            <Typography variant="caption" mt={-0.4}>
              ©{new Date().getFullYear()} {WEBSITE_NAME} Inc.
            </Typography>
          </Stack>
          <Stack justifyContent="center">
            <Link href={AppRoute.PrivacyPolicy} variant="body2">
              Privacy Policy
            </Link>
          </Stack>
        </Stack>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
