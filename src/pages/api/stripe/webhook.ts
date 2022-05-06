import { buffer } from "micro"
import Cors from "micro-cors"
import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import {
  paymentSucceeded,
  stripe,
} from "../../../services/server/stripeService"

const webhookSecret: string = process.env.ENDPOINT_SECRET as string

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
  const buf = await buffer(req)

  const sig = req.headers["stripe-signature"] as string | string[]

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)

    switch (event.type) {
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        paymentSucceeded(invoice)
        break
      }
      default:
        console.log(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }

    res.status(200).end()
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    if (err instanceof Error) console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    res.status(400).send(`Webhook Error: ${errorMessage}`)
    return
  }
}

export default cors(webhookHandler as any)
