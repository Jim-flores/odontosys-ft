import { apiClient } from "@/utils/apiClient";
import { CalendarEvent, CalendarQuery } from "../interfaces/types";
interface Props {
  days: CalendarQuery;
}
class CalendarServices {
  static getCalendar = async ({ days }: Props) => {
    const { data } = await apiClient.get<CalendarEvent[]>(
      "/appointments/calendar",
      {
        params: {
          start: days.start.toISOString(),
          end: days.end.toISOString(),
        },
      },
    );
    return data;
  };
  static moveEvent = async (id: string, days: CalendarQuery) => {
    const { data } = await apiClient.patch(`/appointments/${id}/move`, {
      start: days.start.toISOString(),
      end: days.end.toISOString(),
    });
    return data;
  };
}

export default CalendarServices;
