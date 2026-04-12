export function getFecha(fechaISO: string): string {
  const fechaObj = new Date(fechaISO);
  // Fecha (ej: 27/10/2023)
  const fechaLocal = fechaObj.toLocaleDateString();
  return fechaLocal;
}

export function getHora(fechaISO: string): string {
  const fechaObj = new Date(fechaISO);
  // Hora (ej: 10:30:00 AM - depende de la zona horaria local)
  const horaLocal = fechaObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  return horaLocal;
}

export function getHoraAMPM(fechaISO: string): string {
  const fechaObj = new Date(fechaISO);
  // Hora (ej: 10:30:00 AM - depende de la zona horaria local)
  const horaLocal = fechaObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return horaLocal;
}

export function getHoraT(fechaISO: string): string {
  const [hours, minutes, seconds] = fechaISO.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), Number(seconds));

  const time12 = date.toLocaleTimeString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  return time12;
}

// Obtener componentes específicos
/* const anio = fechaObj.getFullYear();
const mes = fechaObj.getMonth() + 1; // Meses de 0-11, sumamos 1
const dia = fechaObj.getDate();
const horas = fechaObj.getHours();
const minutos = fechaObj.getMinutes();
 */

export function obtenerDiaYMes(fecha: Date) {
  const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "long" });
  const mes = fecha.toLocaleDateString("es-ES", { month: "long" });
  const diaNumero = fecha.getDate(); // Opcional: número del día

  const nombreDePolla = `Polla del ${diaSemana} ${diaNumero} de ${mes} de ${fecha.getFullYear()}`;
  return {
    diaSemana: diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1),
    mes: mes.charAt(0).toUpperCase() + mes.slice(1),
    diaNumero,
    nombreDePolla,
  };
}

// Ejemplo de uso:
const hoy = new Date();
const resultado = obtenerDiaYMes(hoy);
//console.log(`Hoy es ${resultado.diaSemana}, ${resultado.diaNumero} de ${resultado.mes}`);
// Salida aproximada: "Hoy es lunes, 6 de abril de 2026"

export function isDateValid(dateStr: string) {
  return true;
}

export function isTimeValid(dateStr: string) {
  console.log(dateStr);
  const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
  return true;
}

export function sup(date: Date) {
  const time12 = date.toLocaleTimeString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const res = time12.replace(",", "");
  return res;
}

export function supFecha(date: Date) {
  const time12 = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const res = time12.replace(",", "");
  return res;
}
export function supHora(date: Date) {
  const time12 = date.toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const res = time12.replace(",", "");
  return res;
}
