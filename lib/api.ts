import { supabase } from "./supabase"
import { Apuesta } from "./types"


export const fetchProfile=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("username,full_name,phone, avatar_url, id")
    .eq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export const fetchProfiles=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("username, avatar_url, id")
    .neq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type Users=Awaited<ReturnType<typeof fetchProfiles>>
export type User=Users[number]


export const fetchPollasActivas=async (condicion:number) => {
  //console.log(condicion)
  const { data, error }=await supabase
    .from("pollas")
    .select("*")
    .eq("condicion", condicion)
  if (error) {
    console.log("error", error)
    return []
  } else {
    //console.log('pollas activas', data)
    return data
  }
}

export type PollasActivas=Awaited<ReturnType<typeof fetchPollasActivas>>
export type PollaActiva=PollasActivas[number]

export const fetchBilletera=async (userId: string) => {
  const { data, error }=await supabase
    .from("billeteras")
    .select("*")
    .eq("id_user", userId)
  if (error) {
    console.log("error", error)    
  } else {
    return data
  }
}

export type TypeFectchBilleteras=Awaited<ReturnType<typeof fetchBilletera>>

export const addApuesta=async (apuesta: Apuesta) => {
const { data, error } = await supabase
  .from('apuestas')
  .insert([
    apuesta
  ])
  .select()

  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }

}


export const fetchTasasDeCambio=async () => {
  const { data, error }=await supabase
    .from("tasas")
    .select("id,moneda,tasa,fecha")
    .eq("activa", 1)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type TasasDeCambio=Awaited<ReturnType<typeof fetchTasasDeCambio>>
export type TasaDeCambio=TasasDeCambio[number]
