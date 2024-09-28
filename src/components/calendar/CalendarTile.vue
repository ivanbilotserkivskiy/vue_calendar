<template>
  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEventModalStore } from '../../store/eventModal.store.ts'
import { useCalendarEventsStore } from '../../store/calendarEvents.store.ts'
import { CalendarEvent } from '../../types/calendar.types.ts'

const calendarEvents = useCalendarEventsStore()
const eventModal = useEventModalStore()

const fullCalendar = ref(null)

const emit = defineEmits(['open-modal'])

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridDay',
  scroll: true,
  height: 'auto',
  width: 'auto',
  editable: true,
  selectable: true,
  weekends: true,
  allDaySlot: true,
  nowIndicator: true,
  nowIndicatorClassNames: ['now-bar'],
  slotLabelInterval: '02:00:00',
  slotDuration: '01:00:00',
  views: {
    timeGridDay: {},
    day: {
      titleFormat: { weekday: 'long', month: 'short', day: 'numeric' }
    },
    week: {
      titleFormat: { month: 'short', day: 'numeric' }
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false
    }
  },
  buttonIcons: false,
  headerToolbar: {
    left: 'today,prev,next',
    center: 'title',
    end: 'dayGridMonth,timeGridWeek,timeGridDay,agenda'
  },
  customButtons: {
    agenda: {
      text: 'agenda',
      click: function () {
        alert('clicked custom agenda')
      }
    }
  },
  events: calendarEvents.events,
  eventColor: '#3B86FF',
  eventTextColor: '#FFF',
  eventTimeFormat: false,
  select: function (selectionInfo: { startStr: string; endStr: string }) {
    eventModal.openModal()
    eventModal.setSelectedDate(selectionInfo.startStr, selectionInfo.endStr)
  },
  eventDrop: function (info: { event: CalendarEvent }) {
    calendarEvents.updateEventTime(info.event)
  },
  eventResize: function (info: { event: CalendarEvent }) {
    calendarEvents.updateEventTime(info.event)
  },
  eventClick: function (info: { event: CalendarEvent | null }) {
    calendarEvents.setSelectedEvent(info.event)
    eventModal.openModal()
  }
})
</script>

<style>
.fc-direction-ltr .fc-timegrid-now-indicator-arrow {
  display: none;
}

.fc .fc-timegrid-now-indicator-arrow {
  position: absolute;
  z-index: 40;
  margin-top: -10px;
  border-style: solid;
  border-color: #3b86ff;
}

.fc .fc-timegrid-now-indicator-line {
  position: absolute;
  z-index: 4;
  left: 0;
  right: 0;
  margin-top: -2px;
  border-style: solid;
  border-color: #3b86ff;
  border-color: var(— fc-now-indicator-color, #f2cb05);
  border-width: 2px 0 0;
}
.fc .fc-timegrid-now-indicator-line::before {
  content: '';
  top: 5px;
  border-width: 4px;
  position: absolute;
  z-index: 40;
  margin-top: -10px;
  border-style: solid;
  border-radius: 50px;
  border-color: #3b86ff;
}

.fc .fc-timegrid-slot {
  background-color: #f5f6fa;
}

.fc .fc-timegrid-slot {
  border-bottom: none;
}
.fc .fc-timegrid-slot-minor {
  border-top: none;
}
/* common borders */

.fc-theme-standard td,
.fc-theme-standard th {
  border: 1px solid #eaf0f4;
}

/* left col in timegrid with labels*/
.fc-direction-ltr .fc-timegrid-slot-label-frame {
  margin-bottom: -100%;
  text-align: center;
  font: normal normal normal 13px/20px Source Sans Pro;
  letter-spacing: 0px;
  color: #4d4f5c;
  text-transform: uppercase;
}

td.fc-timegrid-slot.fc-timegrid-slot-label.fc-scrollgrid-shrink,
td.fc-timegrid-slot.fc-timegrid-slot-label.fc-timegrid-slot-minor {
  background-color: #fff;
}

table colgroup {
  height: 135px !important;
}
.fc-timegrid-event .fc-event-time {
  display: none;
}
.fc-v-event .fc-event-title {
  padding-inline: 20px;
}

.fc .fc-daygrid-day-frame {
  background-color: #fff;
}
.fc .fc-daygrid-day-number {
  color: #43425d;
}
.fc .fc-daygrid-event-harness {
  padding-left: 20px;
  padding-top: 10px;
  margin-top: 2px;
  border-radius: 4px;
}
.fc-daygrid-dot-event .fc-event-title {
  color: #fff;
}
.fc-direction-ltr .fc-daygrid-event .fc-event-time,
.fc-daygrid-event-dot {
  display: none;
}

.fc .fc-daygrid-body-natural .fc-daygrid-day-events {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.fc .fc-col-header-cell-cushion {
  color: #a3a6b4;
}
th.fc-col-header-cell {
  height: 45px;
  vertical-align: middle;
  font: normal normal normal 18px Source Sans Pro;
  letter-spacing: 0px;
  border: none;
  border-bottom: 1px solid #f5f6fa;
  background-color: #f5f6fa;
}
.fc .fc-timegrid-axis-frame {
  text-align: center;
  font: normal normal normal 13px/20px Source Sans Pro;
  letter-spacing: 0px;
  color: #4d4f5c;
  text-transform: uppercase;
  background-color: #fff;
  color: #4d4f5c;
}
th.fc-timegrid-axis {
  background-color: #f5f6fa;
  border-right: none;
}
</style>
