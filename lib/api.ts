import { Database } from "@/db_types"
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

export const downloadAvatar = async (path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) throw error;
    const fr = new FileReader();
    fr.readAsDataURL(data);
    return new Promise((resolve) => {
      fr.onload = () => {
        resolve(fr.result as string);
      };
    });
  } catch (err) {
    console.log("error", err);
    return "";
  }
};



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

export const fetchBilleteras=async (userId: string) => {
  const { data, error }=await supabase
    .from("billeteras")
    .select("*")
    .eq("id_user", userId)
  if (error) {
    console.log("error", error) 
    return []
  } else {
    //console.log(data)
    return data
  }
}

export type TypeFectchBilleteras=Awaited<ReturnType<typeof fetchBilleteras>>
export type TypeFectchBilletera=TypeFectchBilleteras[number]



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

export const fetchPlataformas=async () => {
  const { data, error }=await supabase
    .from("plataformas")
    .select("id,moneda,tasa,fecha,simbolo,plataforma")
    .eq("activa", 1)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type Plataformas=Awaited<ReturnType<typeof fetchPlataformas>>
export type Plataforma=Plataformas[number]

export const fetchApuestasById=async (userId: string) => {
  const { data, error }=await supabase
    .from("apuestas")
    .select("*")
    .eq("user_id", userId)
  if (error) {
    console.log("error", error) 
    return []
  } else {
    //console.log(data)
    return data
  }
}

export type ApuestasById=Awaited<ReturnType<typeof fetchApuestasById>>
export type ApuestaById=ApuestasById[number]


export const addTransaccion=async (transaccion: Database['public']['Tables']['transacciones']['Insert']) => {
const { data, error } = await supabase
  .from('transacciones')
  .insert([
    transaccion
  ])
  .select()

  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }

}

export const fechCarrerasByPolla=async (idPolla: string) => {
  const { data, error }=await supabase.from("carreras").select("*").eq("polla_id", idPolla)
  if(error){
    console.log("error", error)
    return []
  }
  return data

}

export type CarrerasByPollaId=Awaited<ReturnType<typeof fechCarrerasByPolla>>

export const fetchHipodromos=async () => {
  const { data, error }=await supabase.from("hipodromos").select("*")
  if(error){
    console.log("error", error)
    return []
  }
  //console.log('HIPODROMOS',data)
  return data
}

export type Hipodromos=Awaited<ReturnType<typeof fetchHipodromos>>
export type Hipodromo=Hipodromos[number]
