import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { GA_TRACKING_ID } from "../lib/analytics"

// Styles
import { GlobalStyles } from "../styles/globalstyles"

// Context Files
import { GlobalContextProvider } from "../store/GlobalContext"

export const SITENAME = "WebDev Trivia"
const isProd = process.env.NODE_ENV === "production"

// eslint-disable-next-line
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProd) {
        window.gtag("config", GA_TRACKING_ID, {
          page_path: url
        })
      }
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

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
