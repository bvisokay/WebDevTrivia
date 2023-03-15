import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

// Styles
import { GlobalStyles } from "../styles/globalstyles"

// Context Files
import { GlobalContextProvider } from "../store/GlobalContext"

export const SITENAME = "WebDev Trivia"

// eslint-disable-next-line
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
      <GlobalContextProvider>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </SessionProvider>
  )
}
export default MyApp
