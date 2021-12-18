import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"

// Context Files
import { GlobalContextProvider } from "../store/GlobalContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  )
}
export default MyApp
