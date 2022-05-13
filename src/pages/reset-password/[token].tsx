import { Box, Button, Container, Typography } from "@mui/material"
import { User } from "@prisma/client"
import axios from "axios"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import * as yup from "yup"
import FormTextField from "../../components/forms/FormTextField"
import notifyError from "../../lib/notifyError"

type FormValues = {
  password: string
}

const initialValues = {
  password: "",
}

const validationSchema = yup.object().shape({
  password: yup.string().required("Required"),
})

const onSubmit = async (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>,
  token: string
) => {
  try {
    const res = await axios.put<User>("/api/users/reset-password", {
      newPassword: values.password,
      token,
    })

    await signIn("credentials", {
      email: res.data.email,
      password: values.password,
      callbackUrl: "/",
    })
  } catch (e) {
    notifyError(e)
    formikHelpers.setSubmitting(false)
  }
}

export default function App() {
  const router = useRouter()
  const { token } = router.query as { token: string }
  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Reset password</Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Enter your new password
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          onSubmit(values, formikHelpers, token)
        }
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Box>
              <Typography variant="subtitle2">Password</Typography>
              <Field
                name="password"
                placeholder="********"
                type="password"
                size="small"
                component={FormTextField}
                fullWidth
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              disabled={formikProps.isSubmitting}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
