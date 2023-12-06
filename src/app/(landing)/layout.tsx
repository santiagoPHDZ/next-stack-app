import MainContainer from "@/components/containers/main-container"
import NavBar from "@/components/navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="w-screen h-screen">
            <NavBar user={null} />
            <MainContainer>
                {children}
            </MainContainer>
        </main>
    )
}

export default Layout
