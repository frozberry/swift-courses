import { createTheme, responsiveFontSizes } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Palette {
    lightBlue: Palette["primary"]
    beige: Palette["primary"]
  }
  interface PaletteOptions {
    lightBlue: PaletteOptions["primary"]
    beige: PaletteOptions["primary"]
  }
}

let theme = createTheme({
  palette: {
    // primary: {
    //   main: "#556cd6",
    // },
    // secondary: {
    //   main: "#19857b",
    // },
    // error: {
    //   main: red.A400,
    // },
    // background: {
    //   default: "#0F1B35",
    // },
    lightBlue: {
      main: "#D8E2FC",
    },
    beige: {
      main: "#FFEEE2",
    },
  },
  typography: {
    fontFamily: "Inter",
    body1: {
      // fontSize: "1.25rem",
      // lineHeight: 1.8,
      // marginBottom: 24,
      // fontFamily: "Inter",
    },
    h1: {
      letterSpacing: 1.5,
      textAlign: "center",
      marginTop: "1vh",
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      textAlign: "center",
      fontWeight: "bold",
    },
    h3: {
      // fontSize: "1.75rem",
      marginBottom: 24,
      alignSelf: "flex-start",
      fontWeight: "bold",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
