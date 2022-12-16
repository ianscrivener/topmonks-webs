import * as aws from "@pulumi/aws";
import { contactFormLambdaRole } from "../../../lambda-resources";

export const hookamonkContactFormLambda = new aws.lambda.CallbackFunction(
  "hookamonk-contact-form",
  {
    runtime: aws.lambda.Runtime.NodeJS14dX,
    role: contactFormLambdaRole,
    async callback(event: any) {
      let body;
      if (event.body !== null && event.body !== undefined) {
        if (event.isBase64Encoded) {
          body = JSON.parse(Buffer.from(event.body, "base64").toString("utf8"));
        }
      } else {
        body = JSON.parse(event.body);
      }

      const message = `New newsletter subscriber: ${body.email}`;

      const ses = new aws.sdk.SES({ region: "eu-west-1" });

      const receivers = [
        "sales@hookamonk.com",
        "pavel.trnka@topmonks.com",
        "jakub.dusek@topmonks.com"
      ];
      const sender = "sales@hookamonk.com";
      await ses
        .sendEmail({
          Destination: {
            ToAddresses: receivers
          },
          ReplyToAddresses: [body.email],
          Message: {
            Body: {
              Text: {
                Data: message,
                Charset: "UTF-8"
              }
            },
            Subject: {
              Data: `Hookamonk.com Newsletter Form"`,
              Charset: "UTF-8"
            }
          },
          Source: sender
        })
        .promise();

      return {
        statusCode: 202,
        body: "Accepted",
        headers: {
          "Access-Control-Allow-Headers":
            "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods": "OPTIONS,POST",
          "Access-Control-Allow-Origin": "*"
        }
      };
    }
  }
);
