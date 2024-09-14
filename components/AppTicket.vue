<script lang="ts" setup>
import type { Ticket } from '~/types/types'

const props = defineProps<{
  ticket: Ticket
}>()
const emits = defineEmits(['edit', 'delete'])
function editTicket(ticket:Ticket){
  emits('edit', ticket)
}
</script>
<template>
  <v-card class="mb-2">
    <v-card-title>{{ ticket.name }}</v-card-title>
    <v-card-text>{{ ticket.description }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="editTicket(ticket)">edit</v-btn>
      <v-btn color="error">delete</v-btn>
    </v-card-actions>
  </v-card>
</template>