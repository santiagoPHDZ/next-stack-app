
import * as React from "react";
import { cn } from "@/lib/utils";

// stack
const Stack = ({
    className, children, horizontal
}: {
    className?: string, children: React.ReactNode, horizontal: boolean
}) => {
    const stackClassName = cn(className, horizontal ? "flex" : "");
    return <div className={stackClassName}>{children}</div>;
};

const HStack = ({
    className, children
}: {
    className?: string, children: React.ReactNode
}) => {
    return <Stack horizontal={true} className={className}>{children}</Stack>
};

const VStack = ({
    className, children
}: {
    className?: string, children: React.ReactNode
}) => {
    return <Stack horizontal={false} className={className}>{children}</Stack>
};

export { HStack, VStack };