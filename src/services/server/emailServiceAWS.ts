import AWS from "aws-sdk"
import { passwordResetUrl } from "./accountService"

const SES_CONFIG = {
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
  region: "us-east-2",
}

const AWS_SES = new AWS.SES(SES_CONFIG)

const sendPasswordResetEmailAWS = (userId: string, email: string) => {
  const resetUrl = passwordResetUrl(userId)
  const templateObject = { url: resetUrl }
  const templateJson = JSON.stringify(templateObject)

  const params = {
    Source: "Swift Badminton <noreply@swiftbadminton.com>",
    Template: "SwiftPasswordReset",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: templateJson,
  }
  return AWS_SES.sendTemplatedEmail(params).promise()
}

export default sendPasswordResetEmailAWS
