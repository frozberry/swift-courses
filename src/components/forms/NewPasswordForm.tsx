import { Box, Button, Typography } from "@mui/material"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import { signIn } from "next-auth/react"
import { Dispatch, SetStateAction } from "react"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import FormTextField from "./FormTextField"

type Props = {
  email: string
  setLoading: Dispatch<SetStateAction<boolean>>
}

const NewPasswordForm = ({ email, setLoading }: Props) => {
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
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true)

      // await setNewPassword(values.password)

      await signIn("credentials", {
        email,
        password: values.password,
        callbackUrl: "/",
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

export default NewPasswordForm
