import { Box, Button, Container, Typography } from "@mui/material"
import axios from "axios"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import toast from "react-hot-toast"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import FormTextField from "./FormTextField"

export default function App() {
  type FormValues = {
    email: string
  }

  const initialValues = {
    email: "",
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      await axios.post("/api/emails?type=password-reset", {
        email: values.email,
      })
      toast.success(
        "Please check your email for a link to reset your password."
      )
    } catch (e) {
      notifyError(e)
    }
    formikHelpers.setSubmitting(false)
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Forgot your password?</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Box>
              <Typography variant="subtitle2">Email</Typography>
              <Field
                name="email"
                placeholder="Email"
                size="small"
                component={FormTextField}
                fullWidth
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={formikProps.isSubmitting}
              sx={{ mt: 2 }}
            >
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
