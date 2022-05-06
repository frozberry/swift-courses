import { Box, Button, Typography } from "@mui/material"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import { changePassword } from "../../services/client/accountClient"
import FormTextField from "./FormTextField"

const ChangePasswordForm = () => {
  type FormValues = {
    currentPassword: string
    newPassword: string
  }

  const initialValues = {
    currentPassword: "",
    newPassword: "",
  }

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required("Required"),
    newPassword: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      await changePassword(values.currentPassword, values.newPassword)
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
            <Typography variant="subtitle2">Current password</Typography>
            <Field
              name="currentPassword"
              id="currentPassword"
              autoComplete="current-password"
              placeholder="********"
              type="password"
              size="small"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">New password</Typography>
            <Field
              name="newPassword"
              id="new-password"
              autoComplete="new-password"
              placeholder="********"
              type="password"
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
            Save
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default ChangePasswordForm
