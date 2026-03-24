import { fetchPollasActivas } from "@/lib/api";
import { Polla } from "@/lib/types";
import React, { createContext, useEffect } from "react";

export  type PollaProps={
pollas: Polla[] | null;
 loading: boolean,polla:Polla|null,
 setPolla?: React.Dispatch<React.SetStateAction<Polla | null>>;
}  

const PollasContext = createContext<PollaProps>({ pollas: null, loading: true,polla:null });

interface PollasProviderProps {
    children: React.ReactNode;
}


export default function PollasProvider({ children }: PollasProviderProps) {
    const [loading, setLoading] = React.useState(true)
    const [pollas, setPollas] = React.useState<Polla[] | null>(null)
    const [polla, setPolla] = React.useState<Polla | null>(null)


    useEffect(() => {
        const response = fetchPollasActivas(1).then((data) => {
            if (data) {
                //console.log('pollas',data)
                setPollas(data)
            }
        }).catch((error) => {
            console.log("error fetching pollas", error)
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    return (
        <PollasContext.Provider value={{ pollas, loading,polla }}>
            {children}
        </PollasContext.Provider>)

}

export const usePollas = () => React.useContext(PollasContext);
