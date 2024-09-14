<script lang="ts" setup>
import type { TicketFormData } from '~/types/types'
import state from '~/store/state';
import { ref, defineProps, defineEmits, computed, toRef } from 'vue'
const form = ref(null)
const props = defineProps<{
  dialogVisible: boolean,
  ticket: TicketFormData
}>()
const emits = defineEmits(['save', 'close', 'update'])
const title = computed (() => props.ticket.type === 'create' ? 'Create ticket' : 'Update ticket')

const { ticket } = toRefs(props)
function save() {
  if (form.value.validate()) {
    emits('save', {...props.ticket})
  }
}
function updateValue(value: string, key: string) {
  console.log('updateValue', value, key)
  emits('update', key, value)
  // props.ticket[key] = value
}
function cancel() {
  emits('close')
}

</script>

<template>
  <v-dialog :model-value="dialogVisible" width="600">
    <v-card>
      <v-toolbar color="primary">
        <div class="d-flex justify-space-between w-100">
          <v-card-title>{{ title }}</v-card-title>
          <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="ticket.name" label="Title" required></v-text-field>
          <v-text-field v-model="ticket.description" label="Description" required></v-text-field>
          <v-select 
            :items="state.users" 
            label="Responsible" 
            item-title="name" 
            item-value="id" 
            required
            v-model="ticket.responsible"
            >
          </v-select>
          <v-select v-model="ticket.performers" :items="state.users" label="Performer" item-title="name" item-value="id" required multiple></v-select>
          <v-select v-model="ticket.priority" :items="state.priorities" label="Priority" required></v-select>
          <v-select v-model="ticket.status" :items="state.statuses" label="Status" required></v-select>
          <v-btn color="primary" @click="save" class="mr-2">Save</v-btn>
          <v-btn @click="cancel">cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>