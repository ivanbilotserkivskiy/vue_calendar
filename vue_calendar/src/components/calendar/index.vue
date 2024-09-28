<template>
  <div class="calendar_container">
    <CalendarEventCard/>
    <CalendarTile/>
  </div>
</template>
<script setup lang="ts">
import CalendarTile from './CalendarTile.vue'
import CalendarEventCard from './EventCard.vue'
</script>
<style lang="scss" scoped>
.calendar_container {
  margin-top: 8px;
  padding: 17px 12px 16px;
  width: 100%;
  height: calc(100vh - 78px);

}
</style>