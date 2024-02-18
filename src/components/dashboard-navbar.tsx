
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useClerk } from "@clerk/nextjs"
import { useToast } from "./ui/use-toast"
import { user } from "@prisma/client";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const routes = [
    {
        label: "Dashboard",
        href: "/dashboard",
    },
]

interface Props {
    user: user,
}

const Navbar = ({ user }: Props) => {

    const path = usePathname()
    const pathSegments = path.split('/')
    const firstPathSegment = `/${pathSegments[1]}`

    const { toast } = useToast()

    const { signOut } = useClerk()

    return (
        <nav className="border-b top-0 z-30 bg-background w-full">

            <div className=" flex items-center justify-between h-16 px-6">
                <Link href="/">
                    <h1 className="flex text-xl font-extrabold">
                        <div className=" font-black text-primary-brand">NEXT</div> <div className=" font-semibold text-primary-brand/70">APP</div>
                    </h1>
                </Link>

                <div className="flex space-x-4">
                    <Button variant="outline">
                        Contact Us
                    </Button>

                    <ThemeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 rounded-full">
                                <AvatarImage src={""} />
                                <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => signOut()}>Cerrar sesión</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className=" h-10 flex px-3">
                {
                    routes.map((route) => (
                        <div key={route.href} className={cn(firstPathSegment === route.href ? "border-b-2 border-primary" : "hover:border-b hover:border-primary/80 hover:text-primary/80 text-muted-foreground", " ease-in-out transition-colors")}>
                            <Link href={route.href} className=" text-sm font-medium py-4 px-3">
                                {route.label}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </nav>
    );
}

export default Navbar;