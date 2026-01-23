export const tableConstantKey = "exampleList";

export const TICKET_CSS: Record<string, string> = {
  DIAGNOSIS: "text-(--color-diag-text) bg-(--color-diag-bg)", // en diagnóstico
  AWAITING: "text-(--color-await-text) bg-(--color-await-bg)", // espera aprobacion
  REPAIR: "text-(--color-repair-text) bg-(--color-repair-bg)", // en reparación
  READY: "text-(--color-ready-text) bg-(--color-ready-bg)", // listo para recoger
  DELIVERED: "text-(--color-deliv-text) bg-(--color-deliv-bg)", // entregado
  DECLINED: "text-(--color-decl-text) bg-(--color-decl-bg)", // cancelado
};
export const TICKET_STATUS: Record<string, string> = {
  DIAGNOSIS: "En diagnóstico", // en diagnóstico
  AWAITING: "Espera aprobación", // espera aprobacion
  REPAIR: "En reparación", // en reparación
  READY: "Listo para recoger", // listo para recoger
  DELIVERED: "Entregado", // entregado
  DECLINED: "Cancelado", // cancelado
};
export const statusData = [
  { id: "1", name: "En diagnóstico", value: "DIAGNOSIS" },
  { id: "2", name: "Espera aprobación", value: "AWAITING" },
  { id: "3", name: "En reparación", value: "REPAIR" },
  { id: "4", name: "Listo para recoger", value: "READY" },
  { id: "5", name: "Entregado", value: "DELIVERED" },
  { id: "6", name: "Cancelado", value: "DECLINED" },
];
