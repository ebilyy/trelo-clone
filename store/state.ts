import { reactive, toRaw } from 'vue'
import type { Ticket, Status, User, Priority } from '../types/types'
// probably it would be better to use pinia for this kind of state management
const state = reactive({
  statuses: ['To Do', 'In Progress', 'Done'] as Status[],
  tickets: [
    {
      id: 1,
      name: 'Create a new project',
      description: 'Create a new project with Vue 3 and Vite',
      responsible: 1,
      performers: [1],
      status: 'To Do',
      priority: 'low'
    },
  ] as Ticket[],
  priorities: ['low', 'medium', 'high', 'urgent', 'immediate'] as Priority[],
  currentUser: {} as User,
  users: [
    { id: 1, login:'JohnDoe', name: 'John Doe', email: 'john.doe@example.com', password: '123456' },
    { id: 2, login:'SarahConnor', name: 'Sarah Connor', email: 'sara@terminator.com', password: '123456' },
    { id: 3, login:'PaulAtreides', name: 'Paul Atreides', email: 'paul.atrides@dune.com', password: '123456' },
  ] as User[],
  // currentUser: {} as User,
  createTicket: (ticket: Ticket) => {
    ticket.id = state.tickets.length + 1
    state.tickets.push(ticket)
  },
  updateTicket: (ticket: Ticket) => {
    const tickets = toRaw(state.tickets)
    const index = tickets.findIndex(t => t.id === ticket.id)
    state.tickets[index] = ticket
  },
  updateTicketStatus: (ticketId: number, status:Status) => {
    const tickets = toRaw(state.tickets)
    const index = tickets.findIndex(t => t.id === ticketId)
    state.tickets[index].status = status
    // ticket.status = status
    // state.tickets[index] = ticket
  },
  createUser: (user: User) => {
    user.id = state.users.length + 1
    state.users.push(user)
  },
  updateUser: (user: User) => {
    const index = state.users.findIndex(u => u.id === user.id)
    state.users[index] = user
  }
  
})

export default state