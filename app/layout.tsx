import { ReactNode } from "react"
import type { Metadata } from "next"

import { Footer, Navbar } from "@/components"
import './globals.css'

export const metadata: Metadata = {
    title: "Flexibble",
    description: "Showcase and discover remarkable developer projects",
}


export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}