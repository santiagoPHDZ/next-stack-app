import NavBar from "@/components/navbar"


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-screen h-screen">
            <NavBar />
            {children}
        </main>
    )
}

export default Layout
