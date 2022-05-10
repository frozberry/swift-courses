import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import toast from "react-hot-toast"
import { CourseCode } from "../../lib/types"
import { StripeCheckoutBody } from "../../pages/api/stripe/checkout"

const stripePublic = process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
const stripePromise = loadStripe(stripePublic)

type StripeSession = {
  id: string
}

export const stripeCheckout = async (course: CourseCode) => {
  const stripe = await stripePromise
  const checkoutData: StripeCheckoutBody = { course }

  const response = await axios.post<StripeSession>(
    "/api/stripe/checkout",
    checkoutData
  )
  const session = response.data

  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  })

  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
  if (result?.error?.message) {
    toast.error(result.error.message)
  }
}
