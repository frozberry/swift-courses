import { Container, Typography } from "@mui/material"
import ContactForm from "../components/forms/ContactForm"

export default function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" sx={{ my: 4 }}>
        Please contact us to reset your password
      </Typography>
      <ContactForm />
    </Container>
  )
}
// import { Box, Button, Container, Typography } from "@mui/material"
// import axios from "axios"
// import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
// import * as yup from "yup"
// import FormTextField from "../components/forms/FormTextField"

// export default function App() {
//   type FormValues = {
//     email: string
//   }

//   const initialValues = {
//     email: "",
//   }

//   const validationSchema = yup.object().shape({
//     email: yup.string().required("Required"),
//   })

//   const onSubmit = async (
//     values: FormValues,
//     formikHelpers: FormikHelpers<FormValues>
//   ) => {
//      TODO new url
//     await axios.post("/api/emails", { email: values.email })
//     formikHelpers.setSubmitting(false)
//   }

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h2">Reset your password</Typography>
//         <Typography variant="body1" sx={{ textAlign: "center" }}>
//           Enter the email address associated with your account
//         </Typography>
//       </Box>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {(formikProps: FormikProps<FormValues>) => (
//           <Form noValidate autoComplete="off">
//             <Box>
//               <Typography variant="subtitle2">Email</Typography>
//               <Field
//                 name="email"
//                 placeholder="Email"
//                 size="small"
//                 component={FormTextField}
//                 fullWidth
//               />
//             </Box>
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               fullWidth
//               disabled={formikProps.isSubmitting}
//             >
//               Reset
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   )
// }
