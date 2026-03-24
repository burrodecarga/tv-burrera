


export function getFecha(fechaISO: string): string {
const fechaObj = new Date(fechaISO);
// Fecha (ej: 27/10/2023)
const fechaLocal = fechaObj.toLocaleDateString();
return fechaLocal
}

export function getHora(fechaISO: string): string {
const fechaObj = new Date(fechaISO);

// Hora (ej: 10:30:00 AM - depende de la zona horaria local)
const horaLocal = fechaObj.toLocaleTimeString();
return horaLocal
}


// Obtener componentes específicos
/* const anio = fechaObj.getFullYear();
const mes = fechaObj.getMonth() + 1; // Meses de 0-11, sumamos 1
const dia = fechaObj.getDate();
const horas = fechaObj.getHours();
const minutos = fechaObj.getMinutes();
 */