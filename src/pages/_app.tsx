import type { AppProps } from 'next/app'
import './styles.css'
import "@fontsource/press-start-2p"; // Defaults to weight 400
import "@fontsource/vt323"
import "@fontsource-variable/teko"
import "@fontsource/press-start-2p/400.css"; // Specify weight

export default function App({ Component, pageProps }: AppProps) {
  return (
		<Component {...pageProps} />
		)
}
