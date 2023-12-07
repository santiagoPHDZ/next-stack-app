
import { NAVBAR_H } from "@/utils/constants";
import { cn } from "@/utils/utils";
import { ReactNode } from "react";

const NavbarContainer = ({ className, children }: { className?: string, children: ReactNode }) => {
    return (
        <div className={cn(NAVBAR_H, "px-[24px]", className)}>
            {children}
        </div>
    );
}

export default NavbarContainer;
