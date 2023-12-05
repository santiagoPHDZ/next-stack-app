import MainContainer from "@/components/containers/main-container"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-screen h-screen">
            <MainContainer className="items-center justify-center flex">
                {children}
            </MainContainer>
        </main>
    )
}

export default Layout
