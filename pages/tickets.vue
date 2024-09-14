<script lang="ts" setup>
import state from '~/store/state';
import AppTicketForm from '~/components/AppTicketForm.vue';
import type { TicketFormData, Ticket } from '~/types/types';
import AppTicket from '~/components/AppTicket.vue';

const ticketFormVisible = ref(false)
let currentTicketId = ref<number | null>(null)
let formTicket = reactive<TicketFormData>({
  name: '',
  description: '',
  responsible: null,
  performers: [],
  priority: 'low',
  status: 'To Do',
  type: 'create'
})

function createTicket() {
  ticketFormVisible.value = true
}

function saveTicket(ticket: TicketFormData) {
  const ticketData = {
    name: ticket.name,
    description: ticket.description,
    responsible: ticket.responsible,
    performers: ticket.performers,
    priority: ticket.priority,
    status: ticket.status,
    id: ticket.id
  } as Ticket
  if (ticket.type === 'edit') {
    state.updateTicket(ticketData)
  } else {
    state.createTicket(ticketData)
  }
  hideForm()
}
function deleteTicket(ticket: Ticket) {
  console.log('delete ticket', ticket)
}
function editTicket(ticket: Ticket) {
  formTicket.type = 'edit'
  formTicket.name = ticket.name
  formTicket.description = ticket.description
  formTicket.responsible = ticket.responsible
  formTicket.performers = ticket.performers
  formTicket.priority = ticket.priority
  formTicket.status = ticket.status
  formTicket.id = ticket.id
  ticketFormVisible.value = true
}
function hideForm() {
  ticketFormVisible.value = false
  formTicket.type = 'create'
  formTicket.name = ''
  formTicket.description = ''
  formTicket.responsible = null
  formTicket.performers = []
  formTicket.priority = 'low'
  formTicket.status = 'To Do'
}

function startDrag(e:any, ticket: Ticket) {
  currentTicketId.value = ticket.id
  console.log('startDrag', e, ticket.id, e.dataTransfer)
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move';
}

function onDrop(evt:any, list:string) {
  evt.preventDefault()
  const ticket = currentTicketId.value
  state.updateTicketStatus(ticket, list)
  currentTicketId.value = null 
}

function allowDrop(e:any) {
  e.preventDefault()
}
</script>
<template>
  <AppTicketForm :dialogVisible="ticketFormVisible" :ticket="formTicket" @save="saveTicket" @close="hideForm">
  </AppTicketForm>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn size="small" color="primary" @click="createTicket">create ticket</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="status in state.statuses" :key="status" cols="4" class="">
        <div @drop="onDrop($event, status)"  @dragover="allowDrop">
          <div class="border-thin rounded pa-2 column">
            <h2 class="text-center"> {{ status }}</h2>
            <div class="item-wrap" v-for="item in state.tickets" :key="item.id" :draggable="true"
              @dragstart="startDrag($event, item)">
              <AppTicket v-if="(item as Ticket).status === status" :ticket="(item as Ticket)" @delete="deleteTicket"
                @edit="editTicket((item as Ticket))"></AppTicket>
            </div>
          </div>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.column {
  background-color: #eee;
}
.item {
  background-color: #fff;
}

</style>