<template>
  <v-list-item link >
    <v-list-item-content>
      <v-list-item-title v-if="!state.edit_mode">{{ group.name }}</v-list-item-title>
      <v-list-item-title v-else><v-text-field>{{group.name}}</v-text-field></v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="state.edit_mode=!state.edit_mode">
        <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
name: "TodoGroup",
  props:{
    group: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      state:{
        edit_mode:false
      }
    }
  },
  methods:{
    editGroup(){

    }
  }
}
</script>

<style scoped>

</style>