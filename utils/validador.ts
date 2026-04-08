export function validarCarrera(car: any, dis: any, hor: any): boolean {
  if (!car || !dis || !hor) return false;
  // Regex para hh:mm am/pm (espacio opcional, case-insensitive)
  const regex = /^([1-9]|1[0-2]):[0-5][0-9]/;
  const carreraValida =
    car.length !== 0 && !isNaN(Number(car)) && Number(car) > 0;
  const distanciaValida =
    dis.length !== 0 && !isNaN(Number(dis)) && Number(dis) > 0;
  const horaValida = hor.length !== 0 && regex.test(hor);
  console.log(carreraValida, distanciaValida, horaValida, hor);
  const res = carreraValida && distanciaValida;
  return res;
}
