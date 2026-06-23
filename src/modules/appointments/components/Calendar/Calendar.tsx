import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { useState } from "react";
import { useCalendarQuery } from "../../hooks/useCalendarQuery";
import { useDialogStore } from "@/store/useDialogStore";
import { AppointmentFormDialog } from "../AppointmentFormDialog";
import { EventDropArg } from "@fullcalendar/core/index.js";
import { useAppointmentQuery } from "../../hooks/useAppointmentQuery";

export default function Calendar() {
  const { openDialog } = useDialogStore();
  const { update } = useAppointmentQuery();
  const handleEventClick = (info: { event: { title: string } }) => {
    alert(`Evento: ${info.event.title}`);
  };
  const [range, setRange] = useState({
    start: "",
    end: "",
  });
  const calendarQuery = useCalendarQuery(
    new Date(range.start),
    new Date(range.end),
  );
  const handleEventMove = (info: EventResizeDoneArg | EventDropArg) => {
    update.mutate({
      id: info.event.id,
      data: {
        startAt: info.event.start?.toISOString(),
        endAt: info.event.end?.toISOString(),
      },
      alert: false,
    });
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      height="auto"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="timeGridWeek"
      slotMinTime="08:00:00"
      slotMaxTime="20:00:00"
      nowIndicator={true}
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      editable={true}
      locale={esLocale}
      eventClick={handleEventClick}
      allDaySlot={false}
      dateClick={(info) =>
        openDialog({ title: "Agregar cita" }, () => (
          <AppointmentFormDialog
            data={{
              id: "",
              title: "",
              notes: "",
              clientId: "",
              userId: "",
              status: "SCHEDULED",
              appointmentType: "CONSULTATION",
              createdAt: "",
              updatedAt: "",
              startAt: info.dateStr,
              endAt: new Date(
                info.date.getTime() + 30 * 60 * 1000,
              ).toISOString(),
            }}
          />
        ))
      }
      datesSet={(info) => {
        setRange({
          start: info.startStr,
          end: info.endStr,
        });
      }}
      events={calendarQuery.data || []}
      eventResize={handleEventMove}
      eventDrop={handleEventMove}
    />
  );
}
