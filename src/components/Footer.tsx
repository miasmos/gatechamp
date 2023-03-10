import {
  Container,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
  BoxProps,
} from "@mui/material";
import { ComponentProps } from "react";
import { WEBSITE_NAME } from "../constants";
import { AppRoute } from "../enum";
import LogoIcon from "./icon/LogoIcon";
import Link from "./Link";

const StyledFooter = styled(Box)(() => ({
  width: "100%",
  minHeight: 80,
}));

const FooterLink = (props: ComponentProps<typeof Link>) => (
  <Link fontWeight="normal" sx={{ textDecoration: "none" }} {...props} />
);

function Footer(props: BoxProps) {
  const theme = useTheme();
  return (
    <StyledFooter component="footer" {...props}>
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Stack alignItems="flex-start">
            <Link href={AppRoute.Home}>
              <LogoIcon color={theme.palette.primary.main} width={100} mt={1} />
            </Link>
            <Typography variant="caption" mt={-0.4}>
              ©{new Date().getFullYear()} {WEBSITE_NAME} Inc.
            </Typography>
          </Stack>

          <Stack alignItems="flex-end" direction="row">
            <FooterLink href={AppRoute.Faq} variant="body2">
              FAQ
            </FooterLink>
            <Stack alignItems="center" direction="row">
              <Typography lineHeight="1.25">&nbsp;/&nbsp;</Typography>
            </Stack>
            <FooterLink href={AppRoute.PrivacyPolicy} variant="body2">
              Privacy Policy
            </FooterLink>
            <Stack alignItems="center" direction="row">
              <Typography lineHeight="1.25">&nbsp;/&nbsp;</Typography>
            </Stack>
            <FooterLink href={AppRoute.TermsOfUse} variant="body2">
              Terms of Use
            </FooterLink>
          </Stack>
        </Stack>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
