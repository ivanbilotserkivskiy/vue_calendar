import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '../composables/useLocalStorage'
import { CalendarEvent, FormEvent } from '../types/calendar.types'

export const useCalendarEventsStore = defineStore('calendarEvents', () => {
  const storage = useStorage()
  const events = ref<FormEvent[]>(storage.storageGet('calendarEvents') || [])

  const selectedEvent = ref<CalendarEvent | null>(null)
  const setEvents = (eventsData: FormEvent[]) => {
    events.value = eventsData
  }

  const addEvent = (event: FormEvent) => {
    events.value.push(event)
    storage.storageAdd('calendarEvents', event)
  }

  const updateStoreEvent = (index: number, newEvent: FormEvent) => {
    events.value[index] = newEvent
    storage.storage['calendarEvents'] = events.value
    storage.storageSet('calendarEvents')
  }

  const updateEventTime = (event: CalendarEvent) => {
    const newEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      notes: event.extendedProps.notes,
      startTime: event.startTime,
      endTime: event.endTime
    }
    const eventIndex = events.value.findIndex(ev => ev.id === event.id)
    if (eventIndex < 0) return
    updateStoreEvent(eventIndex, newEvent)
  }

  const removeEvent = (id: string) => {
    const index = events.value.findIndex(event => event.id === id)
    if (index !== -1) {
      events.value.splice(index, 1)
    }
    storage.storageRemoveById('calendarEvents', id)
  }

  const updateEvent = (formEvent: FormEvent) => {
    const eventIndex = events.value.findIndex(ev => ev.id === formEvent.id)
    if (eventIndex < 0) return

    updateStoreEvent(eventIndex, formEvent)
  }

  const setSelectedEvent = (event: CalendarEvent | null) => {
    selectedEvent.value = event
  }

  return {
    events,
    selectedEvent,
    removeEvent,
    setEvents,
    addEvent,
    setSelectedEvent,
    updateEventTime,
    updateEvent
  }
})
