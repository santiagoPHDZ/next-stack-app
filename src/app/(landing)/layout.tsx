
import Navbar from "@/components/navbar";
import { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
    title: 'Next Stack App',
    description: 'The best way to get started',
}

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="w-screen h-screen overflow-y-auto">
            <Navbar user={null} />
            <div className="flex flex-col ">
                {children}
            </div>
        </main>
    );
}

export default Layout
