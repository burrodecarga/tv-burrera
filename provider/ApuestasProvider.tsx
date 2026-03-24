import { Apuesta, Polla } from "@/lib/types";
import React, { createContext } from "react";

type ApuestasData = {
    polla: Polla | null;
    setPolla?: React.Dispatch<React.SetStateAction<Polla | null>>;
    savePolla?: () => Promise<void>
    apuesta: Apuesta | null;
    saveApuesta?: () => Promise<void>
    loading: boolean;

}
const ApuestasContext = createContext<ApuestasData>({ apuesta: null, loading: true, polla: null });

interface ApuestasProviderProps {
    children: React.ReactNode;
}


export default function ApuestasProvider({ children }: ApuestasProviderProps) {
    const [loading, setLoading] = React.useState(true)
    const [apuesta, setApuesta] = React.useState<Apuesta | null>(null)
    const [polla, setPolla] = React.useState<Polla | null>(null)

    const saveApuesta = async () => { }
    const savePolla = async () => { }

    return (
        <ApuestasContext.Provider value={{ apuesta: null, loading: true, polla: null, saveApuesta, savePolla,setPolla }} >
            {children}
        </ApuestasContext.Provider>)

}

export const useApuestas = () => React.useContext(ApuestasContext);
