import MainContainer from "@/components/containers/main-container"
import NavBar from "@/components/navbar"
import { apiServer } from "@/trpc/server";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  const user = await apiServer.user.getCurrent.query()

  return (
    <main className="w-screen h-screen">
      <NavBar user={user} />
      <MainContainer>
        {children}
      </MainContainer>
    </main>
  )
}

export default Layout
