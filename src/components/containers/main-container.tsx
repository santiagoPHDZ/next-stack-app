
import { MAIN_H, MAIN_W } from "@/utils/constants";
import { cn } from "@/utils/utils";
import { ReactNode } from "react";

const MainContainer = ({ className, children }: { className?: string, children: ReactNode }) => {
    return (
        <div className={cn(MAIN_H, MAIN_W, "flex px-[24px]", className)}>
            {children}
        </div>
    );
}

export default MainContainer;