import { supabase } from "./supabase";

export const fetchPollas = async () => {
  const { data, error } = await supabase.from("pollas").select("*");
  if (error) {
    console.log("error", error);
    return [];
  } else {
    //console.log('pollas activas', data)
    return data;
  }
};

export type TypeFtchPollas = Awaited<ReturnType<typeof fetchPollas>>;
export type TypeFetchPolla = TypeFtchPollas[number];

export const fetchRetiradosByPolla = async (idPolla: string) => {
  const { data, error } = await supabase
    .from("retirados")
    .select("*")
    .eq("polla_id", idPolla)
    .order("carrera", { ascending: true });
  if (error) {
    console.log("error", error);
    return [];
  }
  return data;
};

export type TypeFetchRetiradosByPollaId = Awaited<
  ReturnType<typeof fetchRetiradosByPolla>
>;
export type TypeFetchRetiradoByPollaId = TypeFetchRetiradosByPollaId[number];

export const fetchPollasById = async (idPolla: string) => {
  const { data, error } = await supabase
    .from("pollas")
    .select("*")
    .eq("id", idPolla)
    .single();
  if (error) {
    console.log("error", error);
    return null;
  }
  return data;
};

export type TypeFetchPollasById = Awaited<ReturnType<typeof fetchPollasById>>;
