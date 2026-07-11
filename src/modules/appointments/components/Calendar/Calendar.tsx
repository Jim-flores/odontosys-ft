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
import {
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core/index.js";
import "../../../../fullcalendar.css";
import { getAppointmentDetailQueryOptions } from "../../hooks/useDetailEventQuery";
import { useAppointmentQuery } from "../../hooks/useAppointmentQuery";
import { useQueryClient } from "@tanstack/react-query";

export default function Calendar() {
  const { openDialog } = useDialogStore();

  const { update } = useAppointmentQuery();
  const [range, setRange] = useState({
    start: "",
    end: "",
  });

  const queryClient = useQueryClient();

  const handleEventClick = async (info: EventClickArg) => {
    const data = await queryClient.ensureQueryData(
      getAppointmentDetailQueryOptions(info.event.id),
    );

    openDialog({ title: "Editar cita" }, () => (
      <AppointmentFormDialog data={data} />
    ));
  };

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
  const renderEventContent = (info: EventContentArg) => {
    const { event, timeText } = info;

    const start = event.start;
    const end = event.end;

    const duration =
      start && end ? (end.getTime() - start.getTime()) / (1000 * 60) : 0;

    const isCompact = duration <= 30;
    return (
      <div className="w-full overflow-hidden rounded-md px-1 py-0.5">
        <div className="flex items-center gap-1 text-xs">
          <span className="shrink-0 font-semibold text-slate-800 dark:text-white">
            {timeText}
          </span>

          <span className="truncate font-medium text-slate-900 dark:text-white">
            {event.title}
          </span>
        </div>

        {!isCompact && (
          <p className="mt-0.5 truncate text-[11px] text-slate-600">
            {event.extendedProps.treatment}
          </p>
        )}
      </div>
    );
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
      eventContent={renderEventContent}
    />
  );
}
