import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { Provider } from "next-auth/client"

// Styles
import { GlobalStyles } from "../styles/globalstyles"

// Context Files
import { GlobalContextProvider } from "../store/GlobalContext"

export const SITENAME: string = "WebDev Trivia"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <GlobalContextProvider>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </Provider>
  )
}
export default MyApp
