 export const formatTime = (dateString) => {
    const fecha = new Date(dateString);
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; 
    const dia = fecha.getDate();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
  
    const horaFormateada = hora < 10 ? `0${hora}` : hora;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
  
    return ` ${dia}-${mes}-${año} ${horaFormateada}:${minutosFormateados} `;
  };

export const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };