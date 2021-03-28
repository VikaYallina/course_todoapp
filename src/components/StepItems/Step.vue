<template>
  <li class="step">{{step.text}}</li>
</template>

<script>
export default {
  name: "Step",
  props:{
    step:{
      type: Object,
      required: true
    },
    index: Number
  },
}
</script>

<style>
.step{
  padding: 10px;
  margin-bottom: 0.5rem;
  border: 0.5px solid #999;
  border-radius: 5px;
  color: #34495e;
  font-weight: bold;
}
</style>