export type Priority = 'low' | 'medium' | 'high' | 'urgent' | 'immediate'
export type Status = 'To Do' | 'In Progress' | 'Done'

export type User = {
  id: number,
  login?: string,
  name: string,
  email: string,
  password: string
}

export interface Ticket {
  id?: number,
  name: string,
  description: string,
  responsible: number | null,
  performers: number[] | null,
  status: Status,
  priority: Priority,
}

export type UserFormData = {
  id?: number
  name: string,
  email: string,
  password: string,
  type: 'edit' | 'create'
}

export interface TicketFormData extends Ticket {
  type: 'edit' | 'create',
}
