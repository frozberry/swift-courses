import { Box, Button, Typography } from "@mui/material"
import axios from "axios"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import { Dispatch, SetStateAction } from "react"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import FormTextField from "./FormTextField"

// User already has a Google account, but tries to sign in with login
// User already has login, but tries to sign in with Google
// Account doesn't exist at all

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({ setLoading }: Props) => {
  type FormValues = {
    email: string
    password: string
  }

  const initialValues = {
    email: "",
    password: "",
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid email"),
    password: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true)
      await axios.post("/api/auth/verify-login", {
        email: values.email,
        password: values.password,
      })
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl,
      })
      setLoading(false)
    } catch (e) {
      notifyError(e)
      formikHelpers.setSubmitting(false)
      setLoading(false)
    }
  }

  const callbackUrl = "/home"

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <Form noValidate>
          <Box>
            <Typography variant="subtitle2">Parent's Email</Typography>
            <Field
              name="email"
              placeholder="Email"
              size="small"
              autoComplete="email"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Password</Typography>
            <Field
              name="password"
              placeholder="********"
              type="password"
              size="small"
              autoComplete="password"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
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
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
