import { Box, Button, Typography } from "@mui/material"
import axios from "axios"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import toast from "react-hot-toast"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import FormTextField from "./FormTextField"

const ContactForm = () => {
  type FormValues = {
    name: string
    email: string
    message: string
  }

  const initialValues = {
    name: "",
    email: "",
    message: "",
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid email"),
    message: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      await axios.post("/api/emails?type=contact", {
        name: values.name,
        email: values.email,
        message: values.message,
      })

      toast.success("Thank you for your message, we'll be in touch shortly")
      formikHelpers.resetForm()
    } catch (e) {
      notifyError(e)
      formikHelpers.setSubmitting(false)
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
            <Typography variant="subtitle2">Name</Typography>
            <Field
              name="name"
              placeholder="Name"
              size="small"
              autoComplete="name"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Email</Typography>
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
            <Typography variant="subtitle2">Message</Typography>
            <Field
              name="message"
              placeholder="Message"
              size="small"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
              multiline={true}
              minRows={6}
              maxRows={30}
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

export default ContactForm
