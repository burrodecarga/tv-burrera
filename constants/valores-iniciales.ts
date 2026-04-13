import { obtenerDiaYMes } from "@/utils/date";

export type TypePolla = {
  nombre: string;
  fecha: Date;
  fecha_de_cierre: Date;
  hora_de_cierre: Date;
  hipodromo?: string;
  precio?: number;
  carrera1_dist: number | null;
  carrera1_ejem: number | null;
  carrera1_hor: Date | null;
  carrera2_dist: number | null;
  carrera2_ejem: number | null;
  carrera2_hor: Date | string | null;
  carrera3_dist: number | null;
  carrera3_ejem: number | null;
  carrera3_hor: Date | null;
  carrera4_dist: number | null;
  carrera4_ejem: number | null;
  carrera4_hor: Date | null;
  carrera5_dist: number | null;
  carrera5_ejem: number | null;
  carrera5_hor: Date | null;
  carrera6_dist: number | null;
  carrera6_ejem: number | null;
  carrera6_hor: Date | null;
  condicion: number;
};

const { nombreDePolla } = obtenerDiaYMes(new Date());
export const PollaInicial = {
  nombre: nombreDePolla,
  fecha: new Date(),
  fecha_de_cierre: new Date(),
  hora_de_cierre: new Date(),
  hipodromo: "La Rinconada",
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
  condicion: 0,
};
