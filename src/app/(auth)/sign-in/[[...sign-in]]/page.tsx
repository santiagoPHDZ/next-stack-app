
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-slate-900 w-full h-full relative flex items-center justify-center">
      <div className="relative z-20 ">
        <SignIn />
      </div>
    </div>
  )
}