"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { MoveUpRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const routes = [
    {
        label: "Documentos",
        href: "/documents",
    },
    {
        label: "Uso",
        href: "/metrics",
    },
]

const Navbar = () => {

    const path = usePathname()
    const pathSegments = path.split('/')
    const firstPathSegment = `/${pathSegments[1]}`

    return (
        <nav className="border-b top-0 z-30 bg-background w-full">

            <div className=" flex items-center justify-between h-16 px-6">

                <div className="flex items-center justify-center space-x-4">
                    <Link href="/">
                        {/* <h1 className="flex text-xl font-black text-black">
                            FUTURA
                        </h1> */}
                            <Image
                                src="/futura.png" // Assuming futura.png is in the public directory
                                alt="FUTURA"
                                width={100} // Adjust width as needed
                                height={50} // Adjust height as needed
                            />
                    </Link>

                    <p className=" text-base text-muted-foreground font-light">
                        We build the future
                    </p>
                </div>

                <Link
                    href="/documents"
                >
                    <Button>
                        Join Us <MoveUpRight className="ml-2 w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* <div className=" h-10 flex px-3">
                {
                    routes.map((route) => (
                        <div key={route.href} className={cn(firstPathSegment === route.href ? "border-b-2 border-primary" : "hover:border-b hover:border-primary/80 hover:text-primary/80 text-muted-foreground", " ease-in-out transition-colors")}>
                            <Link href={route.href} className=" text-sm font-medium py-4 px-3">
                                {route.label}
                            </Link>
                        </div>
                    ))
                }
            </div> */}
        </nav >
    );
}

export default Navbar;