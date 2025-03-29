import { ReactNode } from "react"
import type { Metadata } from "next"

import { ClientProvider, Footer, Navbar } from "@/components"
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
                    <ClientProvider>
                        {children}
                    </ClientProvider>
                </main>
                <Footer />
            </body>
        </html>
    )
}