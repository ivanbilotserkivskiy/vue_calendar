interface BasicEvent {
  id: string,
  title: string,
  start: string,
  end: string,
  startTime: string,
  endTime: string
}

interface EventExtendedProps {
  notes: string
}

export interface CalendarEvent extends BasicEvent {
  extendedProps: EventExtendedProps
  notes?: string
} 

export interface FormEvent extends BasicEvent {
  notes: string
}