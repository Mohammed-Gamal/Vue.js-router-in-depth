<template>
  <h1>
    This page doesn't exist, take a breath and click
    <router-link :to="{ name: 'home' }" class="here">here</router-link>
  </h1>
</template>

<style scoped>
.here {
  text-decoration: underline;
  opacity: 0.9;
}
</style>
