<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { UserFormData } from '~/types/types'
import state from '~/store/state';

  const form = ref(null)
  const props = defineProps<{
    dialogVisible: boolean,
    user: UserFormData
  }>()
  const emits = defineEmits(['save', 'close'])

  const title = computed (() => props.user.type === 'create' ? 'Create user' : 'Update user')
  
  function save() {
    if (form.value.validate()) {
      emits('save', props.user)
    }
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
        <v-text-field v-model="user.name" label="Name" required></v-text-field>
        <v-text-field v-model="user.email" label="Email" required></v-text-field>
        <v-text-field v-model="user.password" label="Password" required></v-text-field>
        <v-btn color="primary" @click="save" class="mr-2">Save</v-btn>
        <v-btn @click="cancel">cancel</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
 </v-dialog>
</template>