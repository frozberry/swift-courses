import Stripe from "stripe"
import { CourseCode } from "../../lib/types"
import { prisma } from "../../prisma/client"
import { findUserByEmail } from "./userService"

// eslint-disable-next-line
export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2020-08-27",
})

export const createCheckoutSession = async (
  email: string,
  course: CourseCode,
  isIndia: boolean
) => {
  let price

  if (isIndia) {
    if (course === "ff") {
      price = process.env.FF_PRICE_INR
    }
    if (course === "pp") {
      price = process.env.FF_PRICE_INR
    }
    if (course === "pp") {
      price = process.env.KOTC_PRICE_INR
    }
  } else {
    if (course === "ff") {
      price = process.env.FF_PRICE_GBP
    }
    if (course === "pp") {
      price = process.env.PP_PRICE_GBP
    }
    if (course === "kotc") {
      price = process.env.KOTC_PRICE_GBP
    }
  }

  const successUrl = process.env.NEXT_PUBLIC_VERCEL_URL as string
  const cancelUrl = process.env.NEXT_PUBLIC_VERCEL_URL as string

  const sessionData: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {},
    success_url: successUrl,
    cancel_url: cancelUrl,
  }

  const user = await findUserByEmail(email)

  if (user?.stripeId) {
    sessionData.customer = user.stripeId
  } else {
    sessionData.customer_email = email
  }

  const session = await stripe.checkout.sessions.create(sessionData)
  return { id: session.id }
}

export const paymentSucceeded = async (
  checkoutSession: Stripe.Checkout.Session
) => {
  const { customer_email } = checkoutSession
  const lineItems = await stripe.checkout.sessions.listLineItems(
    checkoutSession.id
  )

  const courses = lineItems.data.map((item) => item.description)
  const ff = courses.includes("Footwork Fastlane")
  const pp = courses.includes("Power Pathway")
  const kotc = courses.includes("King of the Court")

  await prisma.user.update({
    where: { email: customer_email! },
    data: {
      ff,
      pp,
      kotc,
    },
  })
}
