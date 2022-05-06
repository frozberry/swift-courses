import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import toast from "react-hot-toast"
import notifyError from "../../lib/notifyError"

const stripePublic = process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
const url = "/api/stripe"
const stripePromise = loadStripe(stripePublic)

type StripeSession = {
  id: string
}

export const stripeCheckout = async (item: string, email: string) => {
  const stripe = await stripePromise

  const checkoutData = {
    item,
    email,
  }
  try {
    const response = await axios.post<StripeSession>(
      `${url}/checkout`,
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
  } catch (e) {
    notifyError(e)
  }
}

export const stripePortalUrl = async (customerId: string) => {
  try {
    const response = await axios.post<{ url: string }>(
      `${url}/customer-portal`,
      {
        customerId,
      }
    )
    return response.data.url
  } catch (e) {
    notifyError(e)
  }
}
