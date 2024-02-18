
import Navbar from "@/components/dashboard-navbar"
import Indicator from "@/components/indicator"
import { apiServer } from "@/trpc/server"
import { Metadata } from "next"

// Metadata
export const metadata: Metadata = {
  title: 'Next Stack App',
  description: 'The best way to get started',
}

const RootLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {

  const { user } = await apiServer.user.getCurrent.query()

  if (!user) {
      return <Indicator status="unauth" />
  }

  return (
    <main className="w-screen h-screen bg-secondary/40 overflow-y-scroll">
      <Navbar user={user} />
      <div className="w-full flex items-center justify-center">
        <div className="max-w-5xl w-full px-6 pb-20">
          {children}
        </div>
      </div>
    </main>
  );
}

export default RootLayout;
