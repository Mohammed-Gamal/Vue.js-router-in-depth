<template>
  <div class="home">
    <h1>All destinations</h1>

    <!-- !: Navigation error  -->
    <button @click="triggerRouterError">Trigger Router Error</button>

    <!-- !: Dynamic router -->
    <div class="dynamic-route">
      <button @click="addDynamicRoute">Add Dynamic Route</button>
      <router-link to="/dynamic">Visit Dynamic Route</router-link>
    </div>

    <div class="destinations">
      <router-link
        v-for="dest in destinations"
        :key="dest.id"
        :to="{
          name: 'destination-show',
          params: { id: dest.id, slug: dest.slug },
        }"
      >
        <h2>{{ dest.name }}</h2>
        <img :src="`/images/${dest.image}`" :alt="dest.name" />
      </router-link>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import { isNavigationFailure, NavigationFailureType } from "vue-router";

export default {
  name: "HomeView",
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
  methods: {
    async triggerRouterError() {
      const navigationFailure = await this.$router.push("/");

      // duplicated navigation
      if (
        isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)
      ) {
        console.log(navigationFailure.to);
        console.log(navigationFailure.from);
      } else {
        console.log("All is well");
      }
    },
    addDynamicRoute() {
      this.$router.addRoute({
        path: "/dynamic",
        name: "dynamic",
        component: () =>
          import(/* webpackChunkName: login */ "@/views/LoginView.vue"),
      });
    },
  },
};
</script>
