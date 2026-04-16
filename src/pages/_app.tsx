import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Poor_Story, Geist, Geist_Mono } from "next/font/google";

const testFont = Poor_Story({
  variable:"--font-poor",
  weight: "400",
  subsets: ["latin"],

})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={` ${testFont.className} ${geistSans.className} ${geistMono.className}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
