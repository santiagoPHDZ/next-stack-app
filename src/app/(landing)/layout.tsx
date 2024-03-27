
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Metadata } from "next"

// Metadata
export const metadata: Metadata = {
    title: 'FUTURA',
    description: 'We build the future',
}

const RootLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <main className="w-screen h-screen overflow-y-scroll bg-black">

            <div className=" bg-white">
                <div className="bg-secondary/40">
                    <Navbar />
                    <div className="w-full flex items-center justify-center">
                        <div className="max-w-5xl w-full px-6 pb-44">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default RootLayout;