import Stripe from "stripe"
import { findUserByEmail } from "./userService"
import { prisma } from "../../prisma/client"
import dayjs from "dayjs"

// eslint-disable-next-line
export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2020-08-27",
})

export const createCheckoutSession = async (item: string, email: string) => {
  let price
  if (item === "month") {
    price = process.env.STRIPE_PRICE_MONTH
  }
  if (item === "year") {
    price = process.env.STRIPE_PRICE_YEAR
  }

  const successUrl = `${process.env.FRONTEND}/home`
  const cancelUrl = `${process.env.FRONTEND}/select-plan`

  const sessionData: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {},
    success_url: successUrl,
    cancel_url: cancelUrl,
  }

  const user = await findUserByEmail(email)

  if (user?.stripeId) {
    sessionData.customer = user.stripeId as string
  } else {
    sessionData.customer_email = email
    sessionData.subscription_data = { trial_period_days: 14 }
  }

  const session = await stripe.checkout.sessions.create(sessionData)
  return { id: session.id }
}

export const getCustomerPortalUrl = async (customerId: string) => {
  const returnUrl = process.env.FRONTEND

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return portalSession.url
}

export const paymentSucceeded = async (invoice: Stripe.Invoice) => {
  console.log(`💰 Invoice status: ${invoice.status}`)
  console.log("Customer: ", invoice.customer)
  console.log("Billing reason: ", invoice.billing_reason)

  const email = invoice.customer_email as string
  const stripeId = invoice.customer as string

  const firstSubscribed = new Date()
  const subEnds = dayjs().add(14, "days").toDate()

  switch (invoice.billing_reason) {
    case "subscription_create":
      console.log("Creating new subscription")
      await prisma.user.update({
        where: { email },
        data: {
          stripeId,
          subEnds,
          firstSubscribed,
        },
      })
      break
    case "subscription_update":
      console.log("Updating existing subscription")
      break
    default:
      console.log("Error: Unknown billing reason")
  }
}
