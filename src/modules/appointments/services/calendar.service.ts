import { apiClient } from "@/utils/apiClient";
import { CalendarEvent, CalendarQuery } from "../interfaces/types";

class CalendarServices {
  static getCalendar = async ({ start, end }: CalendarQuery) => {
    const { data } = await apiClient.get<CalendarEvent[]>(
      "/appointments/calendar",
      {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
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
