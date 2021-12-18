import type { AppProps } from "next/app"
import Layout from "../components/Layout"

// Styles
import { GlobalStyles } from "../styles/globalstyles"

// Context Files
import { GlobalContextProvider } from "../store/GlobalContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  )
}
export default MyApp
