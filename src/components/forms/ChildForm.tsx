import { Box, Button, Typography } from "@mui/material"
import dayjs from "dayjs"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import toast from "react-hot-toast"
import * as yup from "yup"
import notifyError from "../../lib/notifyError"
import { updateProfile } from "../../services/client/profileClient"
import FormTextField from "./FormTextField"

type Props = {
  firstName: string
  lastName: string
  dob: string
  gender: string
}

const ChildForm = ({ firstName, lastName, dob, gender }: Props) => {
  type FormValues = {
    firstName: string
    lastName: string
    dob: string
    gender: string
  }

  const initialValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    dob: dob ? dayjs(dob).format("YYYY-MM-DD") : "",
    gender: gender || "",
  }

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    dob: yup.string().required("Required"),
    gender: yup.string().required("Required"),
  })

  const onSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      updateProfile(values.firstName, values.lastName, values.dob, "male")
      toast.success("Details updated succesfully")
      formikHelpers.setSubmitting(false)
      console.log(values)
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
        <Form noValidate autoComplete="off">
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0 }}>
              First name
            </Typography>
            <Field
              name="firstName"
              autoComplete="name"
              size="small"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Last name</Typography>
            <Field
              name="lastName"
              // placeholder="lastName"
              autoComplete="email"
              size="small"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Date of birth</Typography>
            <Field
              name="dob"
              type="date"
              size="small"
              component={FormTextField}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box sx={{}}>
            <Typography variant="subtitle2">Gender</Typography>
            <label style={{ marginRight: 20 }}>
              <Field type="radio" name="gender" value="male" /> Male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" /> Female
            </label>
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

export default ChildForm
