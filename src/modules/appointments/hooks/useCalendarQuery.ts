import { useQuery } from "@tanstack/react-query";
import { calendarConstantKey } from "../constants/calendarConstant";
import CalendarServices from "../services/calendar.service";

export const useCalendarQuery = (start: Date, end: Date) => {
  return useQuery({
    queryKey: [calendarConstantKey, start, end],

    queryFn: () =>
      CalendarServices.getCalendar({
        start,
        end,
      }),

    staleTime: 1000 * 60,
  });
};
