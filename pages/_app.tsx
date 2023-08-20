import type { AppProps } from "next/app"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import GlobalStyle from "../styles/globalCss"
import { useEffect } from "react"
import { useRecoilSnapshot } from "recoil"

function DebugObserver(): React.ReactNode {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    console.debug("The following atoms were modified:")
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DebugObserver />
      <Head key="head">
        <title>PokeDex</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/path_to_your_favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
