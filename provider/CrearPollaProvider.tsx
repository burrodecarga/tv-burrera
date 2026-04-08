import { INITIAL_POLLA, POLLA } from "@/lib/types";
import React, { createContext, Dispatch, SetStateAction } from "react";

export  type PollaProps={
polla:POLLA;
 setPolla?: Dispatch<SetStateAction<POLLA>>;
 
}  

const CrearPollaContext = createContext<PollaProps>({ polla:INITIAL_POLLA });

interface PollasProviderProps {
    children: React.ReactNode;
}


export default function CrearPollaProvider({ children }: PollasProviderProps) {
    const [polla, setPolla] = React.useState<POLLA>(INITIAL_POLLA) 

    return (
        <CrearPollaContext.Provider value={{ polla, setPolla }}>
            {children}
        </CrearPollaContext.Provider>)

}

export const useCrearPolla = () => React.useContext(CrearPollaContext);
