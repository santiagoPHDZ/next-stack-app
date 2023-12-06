import MainContainer from "@/components/containers/main-container"
import NavBar from "@/components/navbar"
import { getUser } from "@/server/services/user"

const Layout = async ({ children }: { children: React.ReactNode }) => {

  const user = await getUser()

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
