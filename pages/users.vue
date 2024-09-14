<script lang="ts" setup>
import state from '~/store/state';
import type { User, UserFormData } from '~/types/types';
import UserForm from '~/components/UserForm.vue';
let userData = reactive<UserFormData>({
  name: '',
  email: '',
  password: '',
  type: 'create'
})
const userFormVisible = ref(false)
const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Actions', value: 'actions', sortable: false }
]


function editUser(user:User) {
  userData = { ...user, type: 'edit' }
  userFormVisible.value = true
}
function saveData(data:UserFormData) {
  // add uniq email and login check
  const { type } = data
  userFormVisible.value = false
  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
    id: data.id
  } as User
  if(type === 'edit') {
    state.updateUser(userData)
  } else {
    state.createUser(userData)
  }

}
function deleteUser(user:User) {
  console.log('delete user', user)
}
function createUser() {
  userFormVisible.value = true
}
function closeForm() {
  userFormVisible.value = false
  userData ={
  name: '',
  email: '',
  password: '',
  type: 'create'
  }
}
</script>
<template>
  <div class="d-flex justify-space-between px-2 align-center">
    <h1>Users</h1>
    <v-btn color="primary" size="small" @click="createUser">add user</v-btn>
  </div>
  <v-data-table class="pa-2" :headers="headers" :items="state.users">
    <template v-slot:item.actions="{ item }">
      <v-btn size="small" @click="editUser(item)" class="mr-2">edit</v-btn>
      <v-btn color="error" size="small" @click="deleteUser(item)">Delete</v-btn>
    </template>
  </v-data-table>
  <UserForm :dialogVisible="userFormVisible" :user="userData" @save="saveData" @close="closeForm"/>

</template>