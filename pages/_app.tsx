import type { AppProps } from "next/app"
import Head from "next/head"
import GlobalStyle from "../styles/globalCss"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head key="head">
        <title>PokeDex</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />;
    </>
  )
}
