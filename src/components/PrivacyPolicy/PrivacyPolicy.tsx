import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { INQUIRIES_EMAIL, WEBSITE_NAME } from "../../constants";
import Link from "../Link";

function PrivacyPolicy() {
  const SiteLink = ({
    href = `/`,
    children = `https://${document.location.hostname}`,
    ...props
  }: ComponentProps<typeof Link>) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  );

  return (
    <Stack textAlign="left">
      <Typography variant="h2" textAlign="center">
        PRIVACY POLICY
      </Typography>
      <Typography textAlign="center">Last updated March 09, 2023</Typography>
      <br />
      <br />
      <br />
      <Box component="section">
        <Typography>
          This privacy notice for {WEBSITE_NAME} Inc. ("
          <strong>{WEBSITE_NAME}</strong>," "<strong>we</strong>," "
          <strong>us</strong>," or "<strong>our</strong>"), describes how and
          why we might collect, store, use, and/or share ("
          <strong>process</strong>") your information when you use our services
          ("Services"), such as when you:
        </Typography>
        <List>
          <ListItem>
            Visit our website at&nbsp;
            <SiteLink />, or any website of ours that links to this privacy
            notice
          </ListItem>
          <ListItem>
            Engage with us in other related ways, including any sales,
            marketing, or events
          </ListItem>
        </List>
        <Typography>
          <strong>Questions or concerns?</strong> Reading this privacy notice
          will help you understand your privacy rights and choices. If you do
          not agree with our policies and practices, please do not use our
          Services. If you still have any questions or concerns, please contact
          us at <SiteLink />.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section">
        <Typography variant="h3">SUMMARY OF KEY POINTS</Typography>
        <br />
        <Typography fontStyle="italic">
          This summary provides key points from our privacy notice, but you can
          find out more details about any of these topics by clicking the link
          following each key point or by using our table of contents below to
          find the section you are looking for. You can also click{" "}
          <SiteLink href="#toc">here</SiteLink> to go directly to our table of
          contents.
        </Typography>
        <br />
        <Typography>
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with {WEBSITE_NAME} Inc. and
          the Services, the choices you make, and the products and features you
          use. Click <SiteLink href="#infocollect">here</SiteLink> to learn
          more.
        </Typography>
        <br />
        <Typography>
          <strong>Do we receive any information from third parties?</strong> We
          do not receive any information from third parties.
        </Typography>
        <br />
        <Typography>
          <strong>How do we process your information? </strong>We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so. Click <SiteLink href="#infouse">here</SiteLink>{" "}
          to learn more.
        </Typography>
        <br />
        <Typography>
          <strong>
            In what situations and with which parties do we share personal
            information?
          </strong>{" "}
          We may share information in specific situations and with specific
          third parties. Click <SiteLink href="#whoshare">here</SiteLink> to
          learn more.
        </Typography>
        <br />
        <Typography>
          <strong>What are your rights? </strong> Depending on where you are
          located geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information. Click{" "}
          <SiteLink href="#privacyrights">here</SiteLink> to learn more.
        </Typography>
        <br />
        <Typography>
          <strong>How do you exercise your rights? </strong>
          The easiest way to exercise your rights by contacting us at{" "}
          <SiteLink href={`mailto:${INQUIRIES_EMAIL}`}>
            {INQUIRIES_EMAIL}
          </SiteLink>
          . We will consider and act upon any request in accordance with
          applicable data protection laws.
        </Typography>
        <br />
        <Typography>
          Want to learn more about what {WEBSITE_NAME} Inc. does with any
          information we collect? Click <SiteLink href="#toc">here</SiteLink> to
          review the notice in full.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="toc">
        <Typography variant="h3">TABLE OF CONTENTS</Typography>
        <br />
        <SiteLink href="#infocollect">
          1. WHAT INFORMATION DO WE COLLECT?
        </SiteLink>
        <br />
        <SiteLink href="#infouse">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </SiteLink>
        <br />
        <SiteLink href="#legalbases">
          3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
          INFORMATION?
        </SiteLink>
        <br />
        <SiteLink href="#whoshare">
          4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </SiteLink>
        <br />
        <SiteLink href="#3pwebsites">
          5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
        </SiteLink>
        <br />
        <SiteLink href="#cookies">
          6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </SiteLink>
        <br />
        <SiteLink href="#sociallogins">
          7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
        </SiteLink>
        <br />
        <SiteLink href="#inforetain">
          8. HOW LONG DO WE KEEP YOUR INFORMATION?
        </SiteLink>
        <br />
        <SiteLink href="#infominors">
          9. DO WE COLLECT INFORMATION FROM MINORS?
        </SiteLink>
        <br />
        <SiteLink href="#privacyrights">
          10. WHAT ARE YOUR PRIVACY RIGHTS?
        </SiteLink>
        <br />
        <SiteLink href="#DNT">11. CONTROLS FOR DO-NOT-TRACK FEATURES</SiteLink>
        <br />
        <SiteLink href="#caresidents">
          12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </SiteLink>
        <br />
        <SiteLink href="#policyupdates">
          13. DO WE MAKE UPDATES TO THIS NOTICE?
        </SiteLink>
        <br />
        <SiteLink href="#contact">
          14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </SiteLink>
        <br />
        <SiteLink href="#request">
          15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </SiteLink>
      </Box>
      <br />
      <br />
      <Box component="section" id="infocollect">
        <Typography variant="h3">1. WHAT INFORMATION DO WE COLLECT?</Typography>
        <br />
        <Typography variant="h6" fontFamily="Roboto">
          Personal information you disclose to us
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> We collect personal information that you
          provide to us.
        </Typography>
        <br />
        <Typography>
          We collect personal information that you voluntarily provide to us
          when you express an interest in obtaining information about us or our
          products and Services, when you participate in activities on the
          Services, or otherwise when you contact us.
        </Typography>
        <br />
        <Typography>
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
        </Typography>
        <br />
        <Typography>
          Social Media Login Data. We may provide you with the option to
          register with us using your existing social media account details,
          like your Eve, Facebook, Twitter, or other social media account. If
          you choose to register in this way, we will collect the information
          described in the section called{" "}
          <SiteLink href="#sociallogins">
            "HOW DO WE HANDLE YOUR SOCIAL LOGINS?"
          </SiteLink>{" "}
          below.
        </Typography>
        <br />
        <Typography>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </Typography>
        <br />
        <br />
        <Typography variant="h6" fontFamily="Roboto">
          Information automatically collected
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> Some information — such as your Internet
          Protocol (IP) address and/or browser and device characteristics — is
          collected automatically when you visit our Services.
        </Typography>
        <br />
        <Typography>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </Typography>
        <br />
        <Typography>
          Like many businesses, we also collect information through cookies and
          similar technologies.
        </Typography>
        <br />
        <Typography>The information we collect includes:</Typography>
        <List>
          <ListItem>
            <Typography>
              <em> Log and Usage Data.</em> Log and usage data is
              service-related, diagnostic, usage, and performance information
              our servers automatically collect when you access or use our
              Services and which we record in log files. Depending on how you
              interact with us, this log data may include your IP address,
              device information, browser type, and settings and information
              about your activity in the Services (such as the date/time stamps
              associated with your usage, pages and files viewed, searches, and
              other actions you take such as which features you use), device
              event information (such as system activity, error reports
              (sometimes called "crash dumps"), and hardware settings).
            </Typography>
          </ListItem>
        </List>
      </Box>
      <br />
      <br />
      <Box component="section" id="infouse">
        <Typography variant="h3">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> We process your information to provide,
          improve, and administer our Services, communicate with you, for
          security and fraud prevention, and to comply with law. We may also
          process your information for other purposes with your consent.
        </Typography>
        <br />
        <Typography fontStyle="bold">
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </Typography>
        <List>
          <ListItem>
            <Typography>
              <strong>
                To save or protect an individual's vital interest.{" "}
              </strong>
              We may process your information when necessary to save or protect
              an individual's vital interest, such as to prevent harm.
            </Typography>
          </ListItem>
        </List>
      </Box>
      <br />
      <br />
      <Box component="section" id="legalbases">
        <Typography variant="h3">
          3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> We only process your personal information
          when we believe it is necessary and we have a valid legal reason
          (i.e., legal basis) to do so under applicable law, like with your
          consent, to comply with laws, to provide you with services to enter
          into or fulfill our contractual obligations, to protect your rights,
          or to fulfill our legitimate business interests.
        </Typography>
        <br />
        <Typography fontStyle="bold" sx={{ textDecoration: "underline" }}>
          If you are located in the EU or UK, this section applies to you.
        </Typography>
        <br />
        <Typography>
          The General Data Protection Regulation (GDPR) and UK GDPR require us
          to explain the valid legal bases we rely on in order to process your
          personal information. As such, we may rely on the following legal
          bases to process your personal information:
        </Typography>
        <List>
          <ListItem>
            <Typography>
              <strong>Consent.</strong> We may process your information if you
              have given us permission (i.e., consent) to use your personal
              information for a specific purpose. You can withdraw your consent
              at any time. Click <SiteLink href="#request">here</SiteLink> to
              learn more.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <strong>Legal Obligations. </strong> We may process your
              information where we believe it is necessary for compliance with
              our legal obligations, such as to cooperate with a law enforcement
              body or regulatory agency, exercise or defend our legal rights, or
              disclose your information as evidence in litigation in which we
              are involved.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <strong>Vital Interests.</strong>We may process your information
              where we believe it is necessary to protect your vital interests
              or the vital interests of a third party, such as situations
              involving potential threats to the safety of any person.
            </Typography>
          </ListItem>
        </List>
        <br />
        <Typography fontStyle="bold" sx={{ textDecoration: "underline" }}>
          If you are located in Canada, this section applies to you.
        </Typography>
        <br />
        <Typography>
          We may process your information if you have given us specific
          permission (i.e., express consent) to use your personal information
          for a specific purpose, or in situations where your permission can be
          inferred (i.e., implied consent). You can withdraw your consent at any
          time. Click <SiteLink href="#request">here</SiteLink> to learn more.
        </Typography>
        <br />
        <Typography>
          In some exceptional cases, we may be legally permitted under
          applicable law to process your information without your consent,
          including, for example:
        </Typography>
        <List>
          <ListItem>
            If collection is clearly in the interests of an individual and
            consent cannot be obtained in a timely way
          </ListItem>
          <ListItem>
            For investigations and fraud detection and prevention
          </ListItem>
          <ListItem>
            For business transactions provided certain conditions are met
          </ListItem>
          <ListItem>
            If it is contained in a witness statement and the collection is
            necessary to assess, process, or settle an insurance claim
          </ListItem>
          <ListItem>
            If we have reasonable grounds to believe an individual has been, is,
            or may be victim of financial abuse
          </ListItem>
          <ListItem>
            If it is reasonable to expect collection and use with consent would
            compromise the availability or the accuracy of the information and
            the collection is reasonable for purposes related to investigating a
            breach of an agreement or a contravention of the laws of Canada or a
            province
          </ListItem>
          <ListItem>
            If disclosure is required to comply with a subpoena, warrant, court
            order, or rules of the court relating to the production of records
          </ListItem>
          <ListItem>
            If it was produced by an individual in the course of their
            employment, business, or profession and the collection is consistent
            with the purposes for which the information was produced
          </ListItem>
          <ListItem>
            If the collection is solely for journalistic, artistic, or literary
            purposes
          </ListItem>
          <ListItem>
            If the information is publicly available and is specified by the
            regulations
          </ListItem>
        </List>
      </Box>
      <br />
      <br />
      <Box component="section" id="whoshare">
        <Typography variant="h3">
          4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> We may share information in specific
          situations described in this section and/or with the following third
          parties.
        </Typography>
        <br />
        <Typography>
          <strong>
            Vendors, Consultants, and Other Third-Party Service Providers.
          </strong>{" "}
          We may share your data with third-party vendors, service providers,
          contractors, or agents ("<strong>third parties</strong>") who perform
          services for us or on our behalf and require access to such
          information to do that work. We have contracts in place with our third
          parties, which are designed to help safeguard your personal
          information. This means that they cannot do anything with your
          personal information unless we have instructed them to do it. They
          will also not share your personal information with any organization
          apart from us. They also commit to protect the data they hold on our
          behalf and to retain it for the period we instruct. The third parties
          we may share personal information with are as follows:
        </Typography>
        <br />
        <List>
          <ListItem>
            <strong>Web and Mobile Analytics:</strong>&nbsp;Google Analytics
          </ListItem>
          <ListItem>
            <strong>Website Performance Monitoring:</strong>&nbsp;Sentry
          </ListItem>
        </List>
        <br />
        <Typography>
          We also may need to share your personal information in the following
          situations:
        </Typography>
        <br />
        <List>
          <ListItem>
            <Typography>
              <strong>Business Transfers. </strong>We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </Typography>
          </ListItem>
        </List>
      </Box>
      <br />
      <br />
      <Box component="section" id="3pwebsites">
        <Typography variant="h3">
          5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> We are not responsible for the safety of
          any information that you share with third parties that we may link to
          or who advertise on our Services, but are not affiliated with, our
          Services.
        </Typography>
        <br />
        <Typography>
          The Services may link to third-party websites, online services, or
          mobile applications and/or contain advertisements from third parties
          that are not affiliated with us and which may link to other websites,
          services, or applications. Accordingly, we do not make any guarantee
          regarding any such third parties, and we will not be liable for any
          loss or damage caused by the use of such third-party websites,
          services, or applications. The inclusion of a link towards a
          third-party website, service, or application does not imply an
          endorsement by us. We cannot guarantee the safety and privacy of data
          you provide to any third parties. Any data collected by third parties
          is not covered by this privacy notice. We are not responsible for the
          content or privacy and security practices and policies of any third
          parties, including other websites, services, or applications that may
          be linked to or from the Services. You should review the policies of
          such third parties and contact them directly to respond to your
          questions.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="cookies">
        <Typography variant="h3">
          6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> We may use cookies and other tracking
          technologies to collect and store your information.
        </Typography>
        <br />
        <Typography>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information. Specific information about
          how we use such technologies and how you can refuse certain cookies is
          set out in our Cookie Notice.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="sociallogins">
        <Typography variant="h3">
          7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong>If you choose to register or log in to our
          Services using a social media account, we may have access to certain
          information about you.
        </Typography>
        <br />
        <Typography>
          Our Services offer you the ability to register and log in using your
          third-party social media account details (like your Eve, Facebook or
          Twitter logins). Where you choose to do this, we will receive certain
          profile information about you from your social media provider. The
          profile information we receive may vary depending on the social media
          provider concerned, but will often include your name, email address,
          friends list, and profile picture, as well as other information you
          choose to make public on such a social media platform.
        </Typography>
        <br />
        <Typography>
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant Services. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use, and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="inforetain">
        <Typography variant="h3">
          8. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong>We keep your information for as long as
          necessary to fulfill the purposes outlined in this privacy notice
          unless otherwise required by law.
        </Typography>
        <br />
        <Typography>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements).
        </Typography>
        <br />
        <Typography>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="infominors">
        <Typography variant="h3">
          9. DO WE COLLECT INFORMATION FROM MINORS?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> We do not knowingly collect data from or
          market to children under 18 years of age.
        </Typography>
        <br />
        <Typography>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent's use of the Services. If we learn
          that personal information from users less than 18 years of age has
          been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at{" "}
          <SiteLink href={`mailto:${INQUIRIES_EMAIL}`}>
            {INQUIRIES_EMAIL}
          </SiteLink>
          .
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="privacyrights">
        <Typography variant="h3">10. WHAT ARE YOUR PRIVACY RIGHTS?</Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> In some regions, such as the European
          Economic Area (EEA), United Kingdom (UK), and Canada, you have rights
          that allow you greater access to and control over your personal
          information. You may review, change, or terminate your account at any
          time.
        </Typography>
        <br />
        <Typography>
          In some regions (like the EEA, UK, and Canada), you have certain
          rights under applicable data protection laws. These may include the
          right (i) to request access and obtain a copy of your personal
          information, (ii) to request rectification or erasure; (iii) to
          restrict the processing of your personal information; and (iv) if
          applicable, to data portability. In certain circumstances, you may
          also have the right to object to the processing of your personal
          information. You can make such a request by contacting us by using the
          contact details provided in the section{" "}
          <SiteLink href="#contact">
            "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
          </SiteLink>{" "}
          below.
        </Typography>
        <br />
        <Typography>
          We will consider and act upon any request in accordance with
          applicable data protection laws.
        </Typography>
        <br />
        <Typography>
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your local data protection supervisory authority. You can
          find their contact details here:{" "}
          <SiteLink
            href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
            target="_blank"
          >
            https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
          </SiteLink>
        </Typography>
        <br />
        <Typography>
          If you are located in Switzerland, the contact details for the data
          protection authorities are available here:{" "}
          <SiteLink
            href="https://www.edoeb.admin.ch/edoeb/en/home.html"
            target="_blank"
          >
            https://www.edoeb.admin.ch/edoeb/en/home.html
          </SiteLink>
          .
        </Typography>
        <br />
        <Typography>
          <strong> Withdrawing your consent:</strong> If we are relying on your
          consent to process your personal information, which may be express
          and/or implied consent depending on the applicable law, you have the
          right to withdraw your consent at any time. You can withdraw your
          consent at any time by contacting us by using the contact details
          provided in the section{" "}
          <SiteLink href="#contact">
            "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
          </SiteLink>{" "}
          below.
        </Typography>
        <br />
        <Typography>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </Typography>
        <br />
        <Typography>
          <strong>Cookies and similar technologies:</strong> Most Web browsers
          are set to accept cookies by default. If you prefer, you can usually
          choose to set your browser to remove cookies and to reject cookies. If
          you choose to remove cookies or reject cookies, this could affect
          certain features or services of our Services. To opt out of
          interest-based advertising by advertisers on our Services visit{" "}
          <SiteLink href="http://www.aboutads.info/choices/" target="_blank">
            http://www.aboutads.info/choices/
          </SiteLink>
          .
        </Typography>
        <br />
        <Typography>
          If you have questions or comments about your privacy rights, you may
          email us at{" "}
          <SiteLink href={`mailto:${INQUIRIES_EMAIL}`}>
            {INQUIRIES_EMAIL}
          </SiteLink>
          .
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="DNT">
        <Typography variant="h3">
          11. CONTROLS FOR DO-NOT-TRACK FEATURES
        </Typography>
        <br />
        <Typography>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track ("DNT") feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this privacy
          notice.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="caresidents">
        <Typography variant="h3">
          12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> Yes, if you are a resident of California,
          you are granted specific rights regarding access to your personal
          information.
        </Typography>
        <br />
        <Typography>
          California Civil Code Section 1798.83, also known as the "Shine The
          Light" law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us using the contact information provided below.
        </Typography>
        <br />
        <Typography>
          If you are under 18 years of age, reside in California, and have a
          registered account with Services, you have the right to request
          removal of unwanted data that you publicly post on the Services. To
          request removal of such data, please contact us using the contact
          information provided below and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on the Services, but
          please be aware that the data may not be completely or comprehensively
          removed from all our systems (e.g., backups, etc.).
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="policyupdates">
        <Typography variant="h3">
          13. DO WE MAKE UPDATES TO THIS NOTICE?
        </Typography>
        <br />
        <Typography fontStyle="italic">
          <strong>In Short:</strong> Yes, we will update this notice as
          necessary to stay compliant with relevant laws.
        </Typography>
        <br />
        <Typography>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated "Revised" date and the updated
          version will be effective as soon as it is accessible. If we make
          material changes to this privacy notice, we may notify you either by
          prominently posting a notice of such changes or by directly sending
          you a notification. We encourage you to review this privacy notice
          frequently to be informed of how we are protecting your information.
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="contact">
        <Typography variant="h3">
          14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </Typography>
        <br />
        <Typography>
          If you have questions or comments about this notice, you may email us
          at{" "}
          <SiteLink href={`mailto:${INQUIRIES_EMAIL}`}>
            {INQUIRIES_EMAIL}
          </SiteLink>
        </Typography>
      </Box>
      <br />
      <br />
      <Box component="section" id="request">
        <Typography variant="h3">
          15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </Typography>
        <br />
        <Typography>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it. To request to review, update,
          or delete your personal information, please fill out and submit a{" "}
          <SiteLink href="https://app.termly.io/notify/d4520545-c445-40fa-808c-1205442e2397">
            data subject access request
          </SiteLink>
          .
        </Typography>
      </Box>
    </Stack>
  );
}

export default PrivacyPolicy;
