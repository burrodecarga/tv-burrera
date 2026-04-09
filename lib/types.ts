import { Database, Tables } from "@/db_types";
import { Database as Datab } from "@/db_types_linked";
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Polla = Database["public"]["Tables"]["pollas"]["Row"];
export type Billetera = Database["public"]["Tables"]["billeteras"]["Row"];
export type Apuesta = Database["public"]["Tables"]["apuestas"]["Row"];
export type Transaccion = Database["public"]["Tables"]["transacciones"]["Row"];
export type Retirado = Database["public"]["Tables"]["retirados"]["Row"];
export type Ganador = Database["public"]["Tables"]["ganadores"]["Row"];
export type RelacionRetirados =
  Database["public"]["Tables"]["pollas"]["Relationships"];

export type Transacciones = Tables<"transacciones">;
export type User = Datab["auth"]["Tables"]["users"]["Row"];

export type UserWithProfile = User & { profile: Profile };
export type UserWithProfileAndBilletera = UserWithProfile & {
  billetera: Billetera;
};
export type UserWithProfileAndBilleteraAndTransacciones =
  UserWithProfileAndBilletera & { transacciones: Transaccion[] };
export type pollaConApuestas = Polla & { apuestas: Apuesta[] };
export type apuestaConPolla = Apuesta & { polla: Polla };
export type TransaccionConBilletera = Transaccion & { billetera: Billetera };
export type TransaccionConBilleteraYProfile = TransaccionConBilletera & {
  billetera: Billetera & { profile: Profile };
};
export type TransaccionConBilleteraYProfileYUser =
  TransaccionConBilleteraYProfile & {
    billetera: Billetera & { profile: Profile & { user: User } };
  };
export type TransaccionConBilleteraYProfileYUserYTransacciones =
  TransaccionConBilleteraYProfileYUser & {
    billetera: Billetera & {
      profile: Profile & { user: User & { transacciones: Transaccion[] } };
    };
  };
export type TransaccionConBilleteraYProfileYUserYTransaccionesYPolla =
  TransaccionConBilleteraYProfileYUserYTransacciones & {
    billetera: Billetera & {
      profile: Profile & { user: User & { transacciones: Transaccion[] } };
    } & { polla: Polla };
  };
export type UserWithTransacciones = User & { transacciones: Transaccion[] };
export type UserWithApuestas = User & { apuestas: Apuesta[] };

export type MODO = "date" | "time" | "datetime";
export type TIPO =
  | "FECHA_DE_POLLA"
  | "FECHA_DE_CIERRE"
  | "HORA_DE_CIERRE"
  | "CARRERA";

export type POLLA = {
  nombre: string;
  fecha: Date;
  fecha_de_cierre: Date;
  hora_de_cierre?: Date;
  hipodromo?: string;
  precio?: number;
  carrera1_dist: number | null;
  carrera1_ejem: number | null;
  carrera1_hor: string | null;
  carrera2_dist: number | null;
  carrera2_ejem: number | null;
  carrera2_hor: string | null;
  carrera3_dist: number | null;
  carrera3_ejem: number | null;
  carrera3_hor: string | null;
  carrera4_dist: number | null;
  carrera4_ejem: number | null;
  carrera4_hor: string | null;
  carrera5_dist: number | null;
  carrera5_ejem: number | null;
  carrera5_hor: string | null;
  carrera6_dist: number | null;
  carrera6_ejem: number | null;
  carrera6_hor: string | null;
};

export const INITIAL_POLLA: POLLA = {
  nombre: "Polla INICIAL",
  fecha: new Date(),
  fecha_de_cierre: new Date(),
  hora_de_cierre: new Date(),
  hipodromo: "",
  precio: 0,
  carrera1_dist: null,
  carrera1_ejem: null,
  carrera1_hor: null,
  carrera2_dist: null,
  carrera2_ejem: null,
  carrera2_hor: null,
  carrera3_dist: null,
  carrera3_ejem: null,
  carrera3_hor: null,
  carrera4_dist: null,
  carrera4_ejem: null,
  carrera4_hor: null,
  carrera5_dist: null,
  carrera5_ejem: null,
  carrera5_hor: null,
  carrera6_dist: null,
  carrera6_ejem: null,
  carrera6_hor: null,
};
