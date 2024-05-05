export default function formatDate(fecha) {
  const fechaObj = new Date(fecha);
  const año = fechaObj.getFullYear();
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
  const dia = fechaObj.getDate().toString().padStart(2, '0');
  const hora = fechaObj.getHours().toString().padStart(2, '0');
  const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
  const segundos = fechaObj.getSeconds().toString().padStart(2, '0');
  return `${dia}/${mes}/${año}, ${hora}:${minutos}:${segundos}`;
}
