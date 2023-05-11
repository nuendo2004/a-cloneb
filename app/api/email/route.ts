import {
  SESClient,
  CloneReceiptRuleSetCommand,
  SendEmailCommand,
} from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

const client = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY || "",
  },
});

const POST = async (req: Request) => {
  const body = await req.json();
  const { email, emailBody } = body;

  const Source = process.env.NEXT_PUBLIC_EMAIL_ACCOUNT || "";
  const sendEmailCommand = new SendEmailCommand({
    Destination: {
      CcAddresses: [Source],
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data:
            emailBody.length > 0
              ? `<h2>${emailBody}</h2>`
              : "<h1>Thank you for choosing AcloneB, You reservation is successfully booked</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "Receipt for your trip",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Your trip with A_CloneB",
      },
    },
    Source,
    ReplyToAddresses: [
      /* more items */
    ],
  });

  try {
    await client.send(sendEmailCommand);
  } catch (e) {
    console.error("Failed to send email.");
  }
  return;
};

export { POST };
