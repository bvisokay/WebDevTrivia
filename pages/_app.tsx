import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { Provider } from "next-auth/client"

// Styles
import { GlobalStyles } from "../styles/globalstyles"

// Context Files
import { GlobalContextProvider } from "../store/GlobalContext"

export const SITENAME = "WebDev Trivia"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
