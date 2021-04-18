<template>
  <v-list-item>
    <v-list-item-action>
      <v-text-field label="New group"
                    @keydown.enter="createGroup"
                    v-model="name"
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
      name: "",
      id: 3
    }
  },
  methods:{
    createGroup(){
      this.$store.dispatch("addGroup",this);
      this.name = "";
      this.id += 1;
    }
  }
}

</script>

<style scoped>

</style>