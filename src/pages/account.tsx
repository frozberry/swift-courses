import { Box, Button, Container, Divider, Typography } from "@mui/material"
import { useRouter } from "next/router"
import ChangePasswordForm from "../components/forms/ChangePasswordForm"
import ChildForm from "../components/forms/ChildForm"
import useAuthQuery from "../hooks/useAuthQuery"
import { AccountPageData } from "../lib/types"
import { getAccountPageData } from "../services/client/accountClient"
import { stripePortalUrl } from "../services/client/stripeClient"

export default function App() {
  const router = useRouter()
  const { data, escape, component } = useAuthQuery(
    "accountData",
    getAccountPageData,
    true
  )
  if (escape) return component

  const account = data as AccountPageData

  const handleBilling = async (customerId: string | null) => {
    if (!customerId) {
      router.push("/select-plan")
      return
    }
    const url = await stripePortalUrl(customerId)
    window.open(url)
  }

  return (
    <Container maxWidth="xs" sx={{ pt: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Child's details
      </Typography>
      <ChildForm
        firstName={data.firstName}
        lastName={data.lastName}
        dob={data.dob}
        gender={data.gender}
      />
      {!account.isOAuth && (
        <>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ my: 4 }}>
            <Typography variant="h2">Change password</Typography>
          </Box>
          <ChangePasswordForm />
        </>
      )}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h2" sx={{ my: 2 }}>
        Membership and billing
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Access your secure billing portal below
      </Typography>
      <Button
        variant="contained"
        size="large"
        color="primary"
        fullWidth
        onClick={() => handleBilling(account.stripeId)}
        sx={{ mt: 4, mb: 8 }}
      >
        Membership portal
      </Button>
    </Container>
  )
}
