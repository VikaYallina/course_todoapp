<template>
  <div>
    <TodoGroup v-for="group in groups"
               v-bind:key="group.id"
               v-bind:group="group"
               v-on:click.native="emitEvent(group.id)"
    >{{ group.id }}
    </TodoGroup>

  </div>
</template>

<script>
import TodoGroup from "@/components/TodoGroup/TodoGroup";
// import NewGroup from "@/components/TodoGroup/NewGroup";
export default {
  name: "GroupList",
  components: { TodoGroup},
  computed:{
    groups(){
      return this.$store.getters.getGroups;
    }
  },
  methods:{
    emitEvent(id){
      this.$emit('got_id', id)
    }
  }
}
</script>

<style scoped>

</style>