import { Tables } from "@/db_types";
import { Database } from "@/db_types_linked";

export type Profile=Tables<"profiles">
export type Polla=Tables<"pollas">
export type Apuesta=Tables<"apuestas">
export type Billetera=Tables<"billeteras">
export type Transaccion=Tables<"transacciones">
export type User=Database["auth"]["Tables"]["users"]["Row"]
export type UserWithProfile = User & { profile: Profile }
export type UserWithProfileAndBilletera = UserWithProfile & { billetera: Billetera }
export type UserWithProfileAndBilleteraAndTransacciones = UserWithProfileAndBilletera & { transacciones: Transaccion[] }
export type pollaConApuestas = Polla & { apuestas: Apuesta[] }
export type apuestaConPolla = Apuesta & { polla: Polla }
export type TransaccionConBilletera = Transaccion & { billetera: Billetera }
export type TransaccionConBilleteraYProfile = TransaccionConBilletera & { billetera: Billetera & { profile: Profile } }
export type TransaccionConBilleteraYProfileYUser = TransaccionConBilleteraYProfile & { billetera: Billetera & { profile: Profile & { user: User } } }
export type TransaccionConBilleteraYProfileYUserYTransacciones = TransaccionConBilleteraYProfileYUser & { billetera: Billetera & { profile: Profile & { user: User & { transacciones: Transaccion[] } } } }
export type TransaccionConBilleteraYProfileYUserYTransaccionesYPolla = TransaccionConBilleteraYProfileYUserYTransacciones & { billetera: Billetera & { profile: Profile & { user: User & { transacciones: Transaccion[] } } } & { polla: Polla } }  
export type UserWithTransacciones = User & { transacciones: Transaccion[] }
export type UserWithApuestas = User & { apuestas: Apuesta[] }
