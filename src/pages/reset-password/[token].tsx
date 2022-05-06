import { Box, Button, Container, Typography } from "@mui/material"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import Link from "next/link"
import * as yup from "yup"
import FormTextField from "../../components/forms/FormTextField"

type FormValues = {
  password: string
}

const initialValues = {
  password: "",
}

const validationSchema = yup.object().shape({
  password: yup.string().required("Required"),
})

const onSubmit = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>
) => {
  alert(values.password)
  formikHelpers.setSubmitting(false)
}

export default function App() {
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
        onSubmit={onSubmit}
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
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Already have an account? <Link href="/login">Login here</Link>
      </Typography>
    </Container>
  )
}
