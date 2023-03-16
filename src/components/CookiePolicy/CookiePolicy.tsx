import { Box, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { INQUIRIES_EMAIL, WEBSITE_NAME } from "../../constants";
import usePageTitle from "../../hooks/usePageTitle";
import Link from "../Link";

function CookiePolicy() {
  const SiteLink = ({
    href = `/`,
    children = `https://${document.location.hostname}`,
    ...props
  }: ComponentProps<typeof Link>) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
  usePageTitle("Cookie Policy");

  const CookieTable = ({
    name,
    purpose,
    provider,
    service,
    type,
    expiresIn,
  }: {
    name: string;
    purpose: string;
    provider: string;
    service: string;
    type: string;
    expiresIn: string;
  }) => {
    return (
      <Stack spacing={1} border="1px solid #222222" px={4} py={3}>
        <Stack direction="row">
          <Typography minWidth={90}>Name:</Typography>
          <Typography>{name}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography minWidth={90}>Purpose:</Typography>
          <Typography>{purpose}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography minWidth={90}>Provider:</Typography>
          <Typography>{provider}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography minWidth={90}>Service:</Typography>
          <Typography>{service}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography minWidth={90}>Type:</Typography>
          <Typography>{type}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography minWidth={90}>Expires In:</Typography>
          <Typography>{expiresIn}</Typography>
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack textAlign="left">
      <Typography variant="h2" textAlign="center">
        COOKIE POLICY
      </Typography>
      <Typography textAlign="center">Last updated March 09, 2023</Typography>
      <br />
      <br />
      <br />
      <Box component="section">
        <Typography>
          This Cookie Policy explains how GateChamp ("<strong>Company</strong>,"
          "<strong>we</strong>," "<strong>us</strong>," and "
          <strong>our</strong>") uses cookies and similar technologies to
          recognize you when you visit our website at <SiteLink /> ("Website").
          It explains what these technologies are and why we use them, as well
          as your rights to control our use of them.
        </Typography>
        <br />
        <Typography>
          In some cases we may use cookies to collect personal information, or
          that becomes personal information if we combine it with other
          information.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">What are cookies?</Typography>
        <br />
        <Typography>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </Typography>
        <br />
        <Typography>
          Cookies set by the website owner (in this case, {WEBSITE_NAME}) are
          called "first-party cookies." Cookies set by parties other than the
          website owner are called "third-party cookies." Third-party cookies
          enable third-party features or functionality to be provided on or
          through the website (e.g., advertising, interactive content, and
          analytics). The parties that set these third-party cookies can
          recognize your computer both when it visits the website in question
          and also when it visits certain other websites.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">Why do we use cookies?</Typography>
        <br />
        <Typography>
          We use first and third-party cookies for several reasons. Some cookies
          are required for technical reasons in order for our Website to
          operate, and we refer to these as "essential" or "strictly necessary"
          cookies. Other cookies also enable us to track and target the
          interests of our users to enhance the experience on our Online
          Properties. Third parties serve cookies through our Website for
          advertising, analytics, and other purposes. This is described in more
          detail below.
        </Typography>
      </Box>
      <Divider sx={{ my: 11 }} />
      <Box component="section">
        <Typography variant="h4">Essential website cookies:</Typography>
        <br />
        <Typography>
          These cookies are strictly necessary to provide you with services
          available through our Website and to use some of its features, such as
          access to secure areas.
        </Typography>
        <br />
        <CookieTable
          name="access_token"
          purpose="Maintains the user's login session."
          provider={document.location.hostname}
          service={WEBSITE_NAME}
          type="http_cookie"
          expiresIn="20 minutes"
        />
        <br />
        <CookieTable
          name="refresh_token"
          purpose="Allows the server to refresh the user's access token without logging in again."
          provider={document.location.hostname}
          service={WEBSITE_NAME}
          type="http_cookie"
          expiresIn="180 days"
        />{" "}
        <br />
        <CookieTable
          name="access_token_expires_at"
          purpose="Tracks when the access_token cookie will expire."
          provider={document.location.hostname}
          service={WEBSITE_NAME}
          type="http_cookie"
          expiresIn="20 minutes"
        />
        <br />
        <CookieTable
          name="refresh_token_exists"
          purpose="Tracks whether the refresh_token exists."
          provider={document.location.hostname}
          service={WEBSITE_NAME}
          type="http_cookie"
          expiresIn="180 days"
        />
      </Box>
      <Divider sx={{ my: 11 }} />
      <Box component="section">
        <Typography variant="h4">
          Performance and functionality cookies:
        </Typography>
        <br />
        <Typography>
          These cookies are used to enhance the performance and functionality of
          our Website but are non-essential to their use. However, without these
          cookies, certain functionality may become unavailable.
        </Typography>
        <br />
        <CookieTable
          name="recoil-persist"
          purpose="Saves the state of the website as the user's interacts with it. Remembers user preferences, settings, and various data to do with the user's profile."
          provider={document.location.hostname}
          service={WEBSITE_NAME}
          type="html_local_storage"
          expiresIn="persistent"
        />
      </Box>
      <Divider sx={{ my: 11 }} />
      <Box component="section">
        <Typography variant="h4">
          Analytics and customization cookies:
        </Typography>
        <br />
        <Typography>
          These cookies collect information that is used either in aggregate
          form to help us understand how our Website is being used or how
          effective our marketing campaigns are, or to help us customize our
          Website for you.
        </Typography>
        <br />
        <CookieTable
          name="_ga"
          purpose="It records a particular ID used to come up with data about website usage by the user. It is a HTTP cookie that expires after 2 years."
          provider={document.location.hostname}
          service="Google Analytics"
          type="http_cookie"
          expiresIn="1 year 11 months 29 days"
        />
        <br />
        <CookieTable
          name="_ga_#"
          purpose="Used to distinguish individual users by means of designation of a randomly generated number as client identifier, which allows calculation of visits and sessions."
          provider={document.location.hostname}
          service="Google Analytics"
          type="http_cookie"
          expiresIn="1 year 11 months 29 days"
        />
      </Box>
      <Divider sx={{ my: 11 }} />
      <Box component="section">
        <Typography variant="h4">Unclassified cookies:</Typography>
        <br />
        <Typography>
          These are cookies that have not yet been categorized. We are in the
          process of classifying these cookies with the help of their providers.
        </Typography>
        <br />
        <CookieTable
          name="AMP_#"
          purpose="_______"
          provider="sentry.io"
          service="Sentry"
          type="http_cookie"
          expiresIn="6 days"
        />
        <br />
        <CookieTable
          name="AMP_MKTG_#"
          purpose=""
          provider="sentry.io"
          service="Sentry"
          type="http_cookie"
          expiresIn="6 days"
        />
        <br />
        <CookieTable
          name="session"
          purpose="_______"
          provider="sentry.io"
          service="Sentry"
          type="http_cookie"
          expiresIn="12 days"
        />
        <br />
        <CookieTable
          name="sentry-sc"
          purpose="_______"
          provider="sentry.io"
          service="Sentry"
          type="http_cookie"
          expiresIn="180 days"
        />
        <br />
        <CookieTable
          name="gsID"
          purpose="_______"
          provider="sentry.io"
          service="Sentry"
          type="http_session"
          expiresIn="6 days"
        />
        <br />
        <CookieTable
          name="anonId"
          purpose="_______"
          provider="sentry.io"
          service="Sentry"
          type="http_session"
          expiresIn="6 days"
        />
      </Box>
      <Divider sx={{ my: 11 }} />
      <Box component="section">
        <Typography variant="h3">
          How can I control cookies on my browser?
        </Typography>
        <br />
        <Typography>
          As the means by which you can refuse cookies through your web browser
          controls vary from browser to browser, you should visit your browser's
          help menu for more information. The following is information about how
          to manage cookies on the most popular browsers:
        </Typography>
        <br />
        <List>
          <ListItem>
            <SiteLink href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies">
              Chrome
            </SiteLink>
          </ListItem>
          <ListItem>
            <SiteLink href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
              Internet Explorer
            </SiteLink>
          </ListItem>
          <ListItem>
            <SiteLink href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US">
              Firefox
            </SiteLink>
          </ListItem>
          <ListItem>
            <SiteLink href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac">
              Safari
            </SiteLink>
          </ListItem>
          <ListItem>
            <SiteLink href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd">
              Edge
            </SiteLink>
          </ListItem>
          <ListItem>
            <SiteLink href="https://help.opera.com/en/latest/web-preferences/">
              Opers
            </SiteLink>
          </ListItem>
        </List>
        <br />
        <Typography>
          In addition, most advertising networks offer you a way to opt out of
          targeted advertising. If you would like to find out more information,
          please visit:
        </Typography>
        <br />
        <List>
          <ListItem>
            <SiteLink href="http://www.aboutads.info/choices/">
              Digital Advertising Alliance
            </SiteLink>
          </ListItem>
          <ListItem>
            <SiteLink href="https://youradchoices.ca/">
              Digital Advertising Alliance of Canada
            </SiteLink>
          </ListItem>
          <ListItem>
            <SiteLink href="http://www.youronlinechoices.com/">
              European Interactive Digital Advertising Alliance
            </SiteLink>
          </ListItem>
        </List>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">
          What about other tracking technologies, like web beacons?
        </Typography>
        <br />
        <Typography>
          Cookies are not the only way to recognize or track visitors to a
          website. We may use other, similar technologies from time to time,
          like web beacons (sometimes called "tracking pixels" or "clear gifs").
          These are tiny graphics files that contain a unique identifier that
          enables us to recognize when someone has visited our Website or opened
          an email including them. This allows us, for example, to monitor the
          traffic patterns of users from one page within a website to another,
          to deliver or communicate with cookies, to understand whether you have
          come to the website from an online advertisement displayed on a
          third-party website, to improve site performance, and to measure the
          success of email marketing campaigns. In many instances, these
          technologies are reliant on cookies to function properly, and so
          declining cookies will impair their functioning.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">
          Do you use Flash cookies or Local Shared Objects?
        </Typography>
        <br />
        <Typography>
          Websites may also use so-called "Flash Cookies" (also known as Local
          Shared Objects or "LSOs") to, among other things, collect and store
          information about your use of our services, fraud prevention, and for
          other site operations.
        </Typography>
        <br />
        <Typography>
          If you do not want Flash Cookies stored on your computer, you can
          adjust the settings of your Flash player to block Flash Cookies
          storage using the tools contained in the{" "}
          <SiteLink href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html">
            Website Storage Settings Panel
          </SiteLink>
          . You can also control Flash Cookies by going to the{" "}
          <SiteLink href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html">
            Global Storage Settings Panel
          </SiteLink>{" "}
          and following the instructions (which may include instructions that
          explain, for example, how to delete existing Flash Cookies (referred
          to "information" on the Macromedia site), how to prevent Flash LSOs
          from being placed on your computer without your being asked, and (for
          Flash Player 8 and later) how to block Flash Cookies that are not
          being delivered by the operator of the page you are on at the time).
        </Typography>
        <br />
        <Typography>
          Please note that setting the Flash Player to restrict or limit
          acceptance of Flash Cookies may reduce or impede the functionality of
          some Flash applications, including, potentially, Flash applications
          used in connection with our services or online content.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">Do you serve targeted advertising?</Typography>
        <br />
        <Typography>
          Third parties may serve cookies on your computer or mobile device to
          serve advertising through our Website. These companies may use
          information about your visits to this and other websites in order to
          provide relevant advertisements about goods and services that you may
          be interested in. They may also employ technology that is used to
          measure the effectiveness of advertisements. They can accomplish this
          by using cookies or web beacons to collect information about your
          visits to this and other sites in order to provide relevant
          advertisements about goods and services of potential interest to you.
          The information collected through this process does not enable us or
          them to identify your name, contact details, or other details that
          directly identify you unless you choose to provide these.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">
          How often will you update this Cookie Policy?
        </Typography>
        <br />
        <Typography>
          We may update this Cookie Policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal, or regulatory reasons. Please therefore revisit
          this Cookie Policy regularly to stay informed about our use of cookies
          and related technologies.
        </Typography>
        <br />
        <Typography>
          The date at the top of this Cookie Policy indicates when it was last
          updated.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">
          Where can I get further information?
        </Typography>
        <br />
        <Typography>
          If you have any questions about our use of cookies or other
          technologies, please email us at{" "}
          <SiteLink href={`mailto:${INQUIRIES_EMAIL}`}>
            {INQUIRIES_EMAIL}
          </SiteLink>
        </Typography>
      </Box>
    </Stack>
  );
}

export default CookiePolicy;
