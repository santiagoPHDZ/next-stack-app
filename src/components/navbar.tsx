"use client"

import Link from "next/link"
import NavbarContainer from "./containers/navbar-container"
import { HStack } from "./stack"
import { Text } from "./text"
import { Button } from "./ui/button"
import { MoveUpRight } from "lucide-react"
import { useClerk } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "./ui/avatar"
import { user } from "@prisma/client"
import { ThemeToggle } from "./theme-toggle"

const NavBar = ({ user }: { user: user | null }) => {

    const { signOut } = useClerk()

    return (
        <nav>
            <NavbarContainer className="border-b top-0 z-30 bg-background">
                <HStack className="w-full h-14 items-center justify-between">
                    <Link
                        href="/"
                    >
                        <Text level={1} className="text-base font-semibold">
                            Next Stack App
                        </Text>
                    </Link>

                    <HStack className="items-center justify-center space-x-2">
                        {
                            user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="h-9 w-9 rounded-full">
                                            <AvatarImage src={user.imageUrl ?? ""} className=" rounded-full" />
                                            <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    href="/dashboard"
                                >
                                    <Button variant="link" className=" font-light">
                                        Get started
                                        <MoveUpRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            )
                        }

                        <ThemeToggle />
                    </HStack>
                </HStack>
            </NavbarContainer>
        </nav>
    )
}

export default NavBar