"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { user } from "@prisma/client";
import { MoveUpRight } from "lucide-react";

const Navbar = ({ user }: { user: user | null }) => {

    return (
        <nav className="border-b top-0 z-30 bg-background w-full">

            <div className=" flex items-center justify-between h-16 px-6">
                <Link href="/">
                    <h1 className="flex text-xl font-extrabold">
                        <div className=" font-black text-primary-brand">NEXT</div> <div className=" font-semibold text-primary-brand/70">APP</div>
                    </h1>
                </Link>

                <div className="flex space-x-4">
                    {
                        user ? (
                            <Link
                                href="/properties"
                            >
                                <Button>
                                    Portal <MoveUpRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <Link
                                    href="/dashboard"
                                >
                                    <Button>
                                        Empezar <MoveUpRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;