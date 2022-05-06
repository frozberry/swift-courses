import { Box, Button, Typography } from "@mui/material"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import { Dispatch, SetStateAction } from "react"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import { signup } from "../../services/client/accountClient"
import FormTextField from "./FormTextField"

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>
}
const SignupForm = ({ setLoading }: Props) => {
  type FormValues = {
    name: string
    email: string
    password: string
  }

  const initialValues = {
    name: "",
    email: "",
    password: "",
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid email"),
    password: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true)
      await signup(values.name, values.email, values.password)

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/home",
      })

      setLoading(false)
    } catch (e) {
      notifyError(e)
      formikHelpers.setSubmitting(false)
      setLoading(false)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <Form noValidate>
          <Box>
            <Typography variant="subtitle2">Parent's Full Name</Typography>
            <Field
              name="name"
              placeholder="Name"
              autoComplete="name"
              size="small"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Parent's Email</Typography>
            <Field
              name="email"
              placeholder="Email"
              autoComplete="email"
              size="small"
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
              autoComplete="password"
              size="small"
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

export default SignupForm
