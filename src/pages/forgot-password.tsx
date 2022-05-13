import { Container, Typography } from "@mui/material"
import ContactForm from "../components/forms/ContactForm"
import Header from "../components/header/Header"

export default function App() {
  return (
    <>
      <Container maxWidth="sm">
        <ContactForm />
      </Container>
    </>
  )
}
