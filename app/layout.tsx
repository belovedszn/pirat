import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
const body = Inter({ subsets:["latin"], variable:"--font-body" })
const display = Space_Grotesk({ subsets:["latin"], variable:"--font-display", weight:["500","700"] })
export const metadata = { title:"Firstlight — capital for the stage before the spotlight", description:"Investor showcase prototype. Not a real investment platform." }
export default function RootLayout({ children }:{ children:React.ReactNode }) {
  return <html lang="en" className={`${body.variable} ${display.variable}`}><body>{children}</body></html>
}
