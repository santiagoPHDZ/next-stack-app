
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { VStack } from "./stack";
import { Text } from "./text";
import { cn } from "@/utils/utils";

export type IndicatorType = {
    header: string,
    caption: string,
    color: string,
    icon: any
}

const statusIndicators: Record<string, IndicatorType> = {
    ["error"]: {
        header: "Error",
        caption: 'Error occurred! Please try again.',
        color: 'text-destructive',
        icon: AlertCircle
    },
    ["success"]: {
        header: 'Success',
        caption: 'Amazing, the task compleated succesfully!',
        color: 'text-green-400',
        icon: CheckCircle
    },
    ["loading"]: {
        header: 'Loading',
        caption: 'This wont take long.',
        color: '',
        icon: Loader2
    },
    ["unauth"]: {
        header: 'Unauthenticated',
        caption: 'Need to log in',
        color: 'text-destructive',
        icon: AlertCircle
    },
};

interface IndicatorProps {
    status: "error" | "success" | "loading" | "unauth";
}

const Indicator = ({ status }: IndicatorProps) => {

    const indicator = statusIndicators[status];

    if (!indicator) {
        return null;
    }

    return (
        <div className="w-full flex items-center justify-center">
            <VStack className="max-w-xs aspect-square flex flex-col items-center justify-center gap-4">
                <indicator.icon className={cn("h-8 w-8", indicator.color, status === "loading" ? "animate-spin" : "")} />
                <Text level={2} className="font-semibold text-xl">{indicator.header}</Text>
                <Text level={0} className="text-sm text-muted-foreground">{indicator.caption}</Text>
            </VStack>
        </div>
    );
}

export default Indicator;
