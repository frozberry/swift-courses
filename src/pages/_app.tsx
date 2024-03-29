import { CacheProvider, EmotionCache } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import PlausibleProvider from "next-plausible"
import { AppProps } from "next/app"
import Head from "next/head"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import createEmotionCache from "../lib/createEmotionCache"
import "../styles.css"
import theme from "../styles/theme"
const queryClient = new QueryClient()

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { ...pageProps },
  } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Swift Badminton</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <PlausibleProvider domain="app.swiftbadminton.com">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster />
            <Component {...pageProps} />
          </ThemeProvider>
        </PlausibleProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </CacheProvider>
  )
}
