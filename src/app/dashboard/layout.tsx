import NavBar from "@/components/navbar"

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        <NavBar/>
        {children}
    </main>
  )
}

export default Layout
