<template>
  <div id="nav">
    <AppLink id="logo" :to="{ name: 'home' }">Travel Application</AppLink>
    <AppLink
      v-for="dest in destinations"
      :to="{
        name: 'destination-show',
        params: { id: dest.id, slug: dest.slug },
      }"
      :key="dest.id"
    >
      {{ dest.name }}
    </AppLink>
    <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
    <AppLink to="https://vueschool.io">Vue School</AppLink>
  </div>
</template>

<script>
import sourceData from "@/data.json";

export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
};
</script>
