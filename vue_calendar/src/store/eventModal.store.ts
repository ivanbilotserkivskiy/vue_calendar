import { defineStore } from "pinia"
import { ref } from "vue"

export const useEventModalStore = defineStore('eventModel', () => {
  const dialog = ref(false)
  
  const selectedDate = ref({
    start: '',
    end: ''
  })

  const setSelectedDate = (startTime: string, endTime: string) => {
    selectedDate.value = {
      start: startTime,
      end: endTime
    }
  }

  const openModal = () => {
    dialog.value = true
  }
  
  const closeModal = () => {
    dialog.value = false
  }
  
  return { dialog, openModal, closeModal, selectedDate, setSelectedDate }
})