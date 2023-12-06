import NavBar from "@/components/navbar"
import { getUser } from "@/lib/services/user"

const Layout = async ({children}: {children: React.ReactNode}) => {

  const user = await getUser()

  return (
    <main>
        <NavBar user={user}/>
        {children}
    </main>
  )
}

export default Layout
