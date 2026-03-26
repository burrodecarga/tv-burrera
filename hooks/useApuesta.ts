import {  fetchBilleteras, TypeFectchBilleteras, } from "@/lib/api";
import { Polla } from "@/lib/types";
import { useEffect, useState } from "react";
import { useUserInfo } from "./userContext";

export const useApuesta = () => {

  
  const [disponibilidad, setDisponibilidad] = useState<TypeFectchBilleteras>()

  const {session}= useUserInfo()
  const [pollaInfo, setPollaInfo] = useState<Polla | null>(null)
  const [carrera1, setCarrera1] = useState(0)
  const [carrera2, setCarrera2] = useState(0)
  const [carrera3, setCarrera3] = useState(0)
  const [carrera4, setCarrera4] = useState(0)
  const [carrera5, setCarrera5] = useState(0)
  const [carrera6, setCarrera6] = useState(0)


  useEffect(()=>{
  const getDisponibilidad =async ()=>{    
  if(session?.user.id){
    const result = await fetchBilleteras(session.user.id)
    setDisponibilidad(result)
      }}
      getDisponibilidad()
    },[])
  

  return {
    pollaInfo,
    setPollaInfo,
    disponibilidad,
    carrera1, setCarrera1,
    carrera2, setCarrera2,
    carrera3, setCarrera3,      
    carrera4, setCarrera4,
    carrera5, setCarrera5,
    carrera6, setCarrera6,
  }

}