<template>
  <v-list-item link >
    <v-list-item-content>
      <v-list-item-title v-if="!state.edit_mode">
        {{ group.groupTitle }}
      </v-list-item-title>
      <v-list-item-title
          v-else>
        <v-text-field v-model="group.groupTitle"></v-text-field>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action >
      <v-btn icon @click="editGroup()">
        <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-btn icon @click="deleteGroup">
      <v-icon color="grey lighten-1">mdi-information</v-icon>
    </v-btn>
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
        edit_mode:false,
        text_edit:this.group.groupTitle
      }
    }
  },
  methods:{
    editGroup(){
      if (this.state.edit_mode){
        console.log(this.group);
        const editGroup={
          "item":{
            "groupTitle":this.group.groupTitle,
            "createdOn":this.group.groupDateCreated,
            "userId":this.group.groupUser.id
          },
          "id":this.group.id
        }

        this.$store.dispatch('editGroup',editGroup);
      }
      this.state.edit_mode = !this.state.edit_mode;
    },

    deleteGroup(){
      this.$store.dispatch('deleteGroup',this.group.id);
    }
  }
}
</script>

<style scoped>

</style>