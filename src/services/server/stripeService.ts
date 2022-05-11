import { User } from "@prisma/client"
import Stripe from "stripe"
import { CourseCode } from "../../lib/types"
import { prisma } from "../../prisma/client"
import { createUser, findUserByEmail } from "./userService"

// eslint-disable-next-line
export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2020-08-27",
})

export const createCheckoutSession = async (
  user: User,
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
    if (course === "kotc") {
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

  const successUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
  const cancelUrl = process.env.NEXT_PUBLIC_VERCEL_URL!

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
    payment_intent_data: {
      setup_future_usage: "on_session",
    },
  }

  if (user.stripeId) {
    sessionData.customer = user.stripeId
  } else {
    sessionData.customer_email = user.email
  }

  const session = await stripe.checkout.sessions.create(sessionData)
  return { id: session.id }
}

export const paymentSucceeded = async (
  checkoutSession: Stripe.Checkout.Session
) => {
  const { customer } = checkoutSession as { customer: string }
  const stripeCustomer = (await stripe.customers.retrieve(
    customer
  )) as Stripe.Customer
  const { id, email, name } = stripeCustomer

  const lineItems = await stripe.checkout.sessions.listLineItems(
    checkoutSession.id
  )

  console.log(checkoutSession)
  console.log(stripeCustomer)
  const courses = lineItems.data.map((item) => item.description)
  const ff = courses.includes("Footwork Fastlane") || undefined
  const pp = courses.includes("Power Pathway") || undefined
  const kotc = courses.includes("King of the Court") || undefined

  const existingUser = await prisma.user.findUnique({
    where: { email: email! },
  })

  if (existingUser) {
    const savedUser = await prisma.user.update({
      where: { email: email! },
      data: {
        ff,
        pp,
        kotc,
        stripeId: id,
      },
    })

    if (!savedUser.name) {
      await prisma.user.update({
        where: { email: email! },
        data: {
          name,
        },
      })
    }
    return
  }

  await createUser(name!, email!, ff, pp, kotc)
}

export const getCheckoutUser = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const { customer } = session as { customer: string }

  const stripeCustomer = (await stripe.customers.retrieve(
    customer
  )) as Stripe.Customer
  const { email } = stripeCustomer
  const user = (await findUserByEmail(email!)) as User

  if (user.passwordSet) {
    return
    //todo
  }

  return user
}
