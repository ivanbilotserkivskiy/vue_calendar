<template>
  <v-dialog v-model="eventModal.dialog" max-width="400">
    <v-card>
      <v-card-title class="modal-title">
        Event Details
        <v-icon @click="eventModal.closeModal" icon="mdi-close"></v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="eventForm" v-model="formValid">
          <v-text-field
            label="Title"
            v-model="form.title"
            :rules="[rules.required, rules.max30]"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.start"
            label="Start Time"
            prepend-icon="mdi-calendar"
            readonly
            @click="openStartDialog"
          ></v-text-field>
          <v-text-field
            v-model="form.end"
            label="End Time"
            prepend-icon="mdi-calendar"
            readonly
            @click="openEndDialog"
          ></v-text-field>
          <v-dialog
            v-model="dialogStartTime"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="330px"
          >
            <v-time-picker v-model="form.startTime" format="24hr"></v-time-picker>
            <v-spacer></v-spacer>
            <div class="date-actions">
              <v-btn color="primary" @click="dialogStartTime = false">Cancel</v-btn>
              <v-btn color="primary" @click="setEventStartTime">OK</v-btn>
            </div>
          </v-dialog>

          <v-dialog
            v-model="dialogEndTime"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="330px"
          >
            <v-time-picker v-model="form.endTime" format="24hr"></v-time-picker>
            <v-spacer></v-spacer>
            <div class="date-actions">  
              <v-btn color="primary" @click="dialogEndTime = false">Cancel</v-btn>
              <v-btn color="primary" @click="setEventEndTime">OK</v-btn>
            </div>
          </v-dialog>

          <v-textarea
            label="Notes"
            v-model="form.notes"
            :rules="[rules.required, rules.max30]"
            required
          ></v-textarea>
          
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
        v-if="calendarEventsStore.selectedEvent"
        color="secondary"
        @click="removeSelectedEvent"
        >Discard</v-btn
        >
        <v-btn v-else color="secondary" @click="closeEventModal">Cancel</v-btn>
        <v-btn color="primary" @click="saveEvent">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { useEventModalStore } from '../../store/eventModal.store.ts'
import { useCalendarEventsStore } from '../../store/calendarEvents.store.ts'
import { nanoid } from 'nanoid'
import { FormEvent } from '../../types/calendar.types.ts';

const calendarEventsStore = useCalendarEventsStore()

const eventModal = useEventModalStore() 

const formValid = ref(false)
const eventForm = ref()

const dialogStartTime = ref(false)
const dialogEndTime = ref(false)

const openStartDialog = () => { 
  dialogEndTime.value = false
  dialogStartTime.value = true
}

const openEndDialog = () => {
  dialogStartTime.value = false
  dialogEndTime.value = true
}

const setEventStartTime = () => {
  const timeString = form.value.start.split('')
  timeString.splice(11, 5, form.value.startTime)
  form.value.start = timeString.join('')
  dialogStartTime.value = false
}

const setEventEndTime = () => {
  const timeString = form.value.end.split('')
  timeString.splice(11, 5, form.value.endTime)
  form.value.end = timeString.join('')
  dialogEndTime.value = false
}

const removeSelectedEvent = () => {
  if (!calendarEventsStore.selectedEvent?.id) return
  calendarEventsStore.removeEvent(calendarEventsStore.selectedEvent.id)
  calendarEventsStore.setSelectedEvent(null)
  clearEvent()
  eventModal.closeModal()
}

const getEventId = () => nanoid()
const defaultForm = {
  id: getEventId(),
  title: '',
  start: '',
  end: '',
  notes: '',
  endTime: '',
  startTime: ''
}

const closeEventModal = () => {
  eventModal.closeModal()
  calendarEventsStore.setSelectedEvent(null)
}

const rules = {
  required: (value: string) => !!value || 'Required.',
  max30: (value: string) => value.length < 31 || 'The max amount of characters is 30'
}

const saveEvent = async () => {
  const isFormValid = await eventForm.value.validate()
  if (!isFormValid.valid) return;
  if (calendarEventsStore.selectedEvent) {
    updateEvent()
    calendarEventsStore.setSelectedEvent(null)
  } else {
    createEvent()
  }

  clearEvent()
}

const createEvent = () => {
  calendarEventsStore.addEvent(form.value)
}

const clearEvent = () => {
  eventModal.closeModal()
  form.value = defaultForm
  form.value.id = nanoid()
}

const updateEvent = () => {
  calendarEventsStore.updateEvent(form.value)
}

const form = ref<FormEvent>(defaultForm)

watch(
  () => eventModal.selectedDate,
  () => {
    form.value = {
      ...form.value,
      start: eventModal.selectedDate.start,
      end: eventModal.selectedDate.end
    }
  }
)

watch(
  () => calendarEventsStore.selectedEvent,
  () => {
    if (!calendarEventsStore.selectedEvent) return
    form.value = {
      ...form.value,
      id: calendarEventsStore.selectedEvent.id,
      title: calendarEventsStore.selectedEvent.title,
      notes: (calendarEventsStore.selectedEvent.extendedProps.notes || calendarEventsStore.selectedEvent.notes) || '',
      start: calendarEventsStore.selectedEvent.start,
      end: calendarEventsStore.selectedEvent.end
    }
  }
)
</script>
<style lang="scss" scoped>
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.date-actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
