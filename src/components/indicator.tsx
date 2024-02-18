
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type IndicatorType = {
    header: string,
    caption: string,
    color: string,
    icon: any
}

const statusIndicators: Record<string, IndicatorType> = {
    ["error"]: {
        header: "Error",
        caption: '¡Se produjo un error! Inténtalo de nuevo.',
        color: 'text-destructive',
        icon: AlertCircle
    },
    ["usageLimit"]: {
        header: "Limite",
        caption: 'El plan llega a su límite de uso, contacta al asesor.',
        color: 'text-yellow-400',
        icon: AlertCircle
    },
    ["success"]: {
        header: 'Éxito',
        caption: '¡Asombroso, la tarea se completó con éxito!',
        color: 'text-green-400',
        icon: CheckCircle
    },
    ["loading"]: {
        header: 'Cargando',
        caption: 'Esto no llevará mucho tiempo.',
        color: '',
        icon: Loader2
    },
    ["unauth"]: {
        header: 'No autenticado',
        caption: 'Necesitas iniciar sesión',
        color: 'text-destructive',
        icon: AlertCircle
    }
}

interface IndicatorProps {
    status: "error" | "success" | "loading" | "unauth" | "usageLimit";
    className?: string
}

const Indicator = ({ status, className }: IndicatorProps) => {

    const indicator = statusIndicators[status];

    if (!indicator) {
        return null;
    }

    return (
        <div className={className}>
            <div className="w-full flex items-center justify-center">
                <div className="max-w-xs aspect-square flex flex-col items-center justify-center gap-4 text-center">
                    <indicator.icon className={cn("h-8 w-8", indicator.color, status === "loading" ? "animate-spin" : "")} />
                    <h5 className="font-semibold text-xl">{indicator.header}</h5>
                    <p className="text-sm text-muted-foreground">{indicator.caption}</p>
                </div>
            </div>
        </div>
    );
}

export default Indicator;
