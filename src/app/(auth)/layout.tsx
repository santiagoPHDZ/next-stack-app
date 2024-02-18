
import Navbar from "@/components/navbar"
import { Metadata } from "next"

// Metadata
export const metadata: Metadata = {
    title: 'Next Stack App',
    description: 'The best way to get started',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-screen h-screen">
            <Navbar user={null} />
            <div className="w-full h-full items-center justify-center flex">
                {children}
            </div>
        </main>
    )
}

export default Layout
