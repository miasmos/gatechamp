import React, { ReactNode, useState } from "react";
import { Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "../Link";
import { INQUIRIES_EMAIL } from "../../constants";

type FaqQuestionProps = {
  question: string;
  children: string | ReactNode;
};

function FaqQuestion({ question, children }: FaqQuestionProps) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Stack>
      <Stack>
        <Typography variant="h4">{question}</Typography>
      </Stack>
      <Stack mt={2}>
        <Typography>{children}</Typography>
      </Stack>
    </Stack>
  );
}

function Faq() {
  return (
    <Stack textAlign="left">
      <Typography variant="h2" textAlign="center" mb={10}>
        Frequently Asked Questions
      </Typography>
      <FaqQuestion question="How up-to-date is the gate camp data?">
        Our gate camp data is real-time. This means that the second a player is
        killed near a gate, that kill is reflected on GateChamp.
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="How do you know a gate is being camped?">
        We consider a gate as camped when there has been a player kill within
        50km of a gate within the last hour.
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="Why do I need to give you access to my location?">
        We use your location to automatically synchronize your route origin as
        you are playing. Your location is only tracked when you are logged in to
        GateChamp and will be used for no other purpose.
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="Why do I need to give you access to my online status?">
        We use your online status to know when to track other information such
        as your location. Your online status is only tracked when you are logged
        into GateChamp and will be used for no other purpose.
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="Why do I need to give you access to waypoints?">
        We use waypoints to automatically push a route to the Eve client as you
        are playing. Your waypoints are only modified when you say so. Waypoints
        will be used for no other purpose.
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="Why can't I click 'Use My Location'?">
        In order to use your location, you must be logged in to both the
        GateChamp website and the Eve client with the same character.
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="Why can't I click 'Push to Eve client'?">
        In order to push to the Eve client, you must be logged in to both the
        GateChamp website and the Eve client with the same character.
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="I want to revoke permissions to my Eve account, how do I do that?">
        <>
          CCP provides their own tools to manage Third Party Applications.
          Navigate{" "}
          <Link
            href="https://community.eveonline.com/support/third-party-applications/"
            target="_blank"
          >
            here
          </Link>{" "}
          and click 'Delete Application'.
        </>
      </FaqQuestion>
      <Divider sx={{ my: 6 }} />
      <FaqQuestion question="I have a different question.">
        For all other inquiries or suggestions feel free to contact us at{" "}
        <Link
          href={`mailto:${INQUIRIES_EMAIL}`}
          fontWeight="bold"
          sx={{ textDecoration: "underline" }}
        >
          {INQUIRIES_EMAIL}
        </Link>
        .
      </FaqQuestion>
    </Stack>
  );
}

export default Faq;
