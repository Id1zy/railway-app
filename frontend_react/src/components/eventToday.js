import { getEvents } from "../api/axiosEvent";

export const loadTodayEvents = async () => {
  try {
    const response = await getEvents();
    const events = response.data.results;
    const today = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.start_date_time);
      return (
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    });
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    return [];
  }
};