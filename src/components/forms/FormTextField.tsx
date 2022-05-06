import { FieldProps, getIn } from "formik"
import TextField, { TextFieldProps } from "@mui/material/TextField"

// Intended to be specified via the `component` prop in a Formik <Field> component
const FormTextField: React.FC<FieldProps & TextFieldProps> = (props) => {
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, ...rest } = props

  return (
    <TextField
      variant="outlined"
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      {...rest}
      {...field}
    />
  )
}

export default FormTextField
