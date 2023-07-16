import "./globals.css";
import { Header, SessionWrapper } from "@/components";
import type { Metadata } from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: "DALL-E 3.0",
    description: "Generate amazing images leveraging Dalle AI and share with your community"
}

const RootLayout: React.FC<{children: React.ReactNode}> = ({children}) =>  {

    return (
        <html lang="en">
            <body>
                <SessionWrapper>
                    <Header />
                    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
                        {children}
                    </main>
                </SessionWrapper>
            </body>
        </html>
    )
}

export default RootLayout;