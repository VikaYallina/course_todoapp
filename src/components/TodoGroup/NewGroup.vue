<template>
  <v-list-item>
    <v-list-item-action>
      <v-text-field label="New group"
                    @keydown.enter="createGroup"
                    v-model="newTodo.groupTitle"
      >
        <v-icon
            slot="append"
            color="red"
        >
          mdi-plus
        </v-icon>

      </v-text-field>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
name: "NewGroup",
  data(){
    return {
      newTodo:{
        groupTitle: "",
        userId: this.$store.getters["auth/getUserId"],
      }
    }
  },
  methods:{
    createGroup(){
      this.$store.dispatch("addGroup",this.newTodo);
      this.newTodo.groupTitle = "";
    }
  }
}

</script>

<style scoped>

</style>