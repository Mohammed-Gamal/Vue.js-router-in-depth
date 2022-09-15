<template>
  <the-navigation />
  <div class="container">
    <!-- Sidebar -->
    <router-view
      v-slot="{ Component }"
      name="LeftSidebar"
      class="view left-sidebar"
    >
      <Transition name="moveUp">
        <component :is="Component" :key="$route.path"></component>
      </Transition>
    </router-view>

    <!-- Main -->
    <router-view v-slot="{ Component }" class="main-view">
      <Transition name="moveUp">
        <component :is="Component" :key="$route.path"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";

export default {
  components: {
    TheNavigation,
  },
};
</script>

<style>
.moveUp-enter-active {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.moveUp-leave-active {
  animation: moveUp 0.3s ease-in;
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-400px);
  }
}

.container {
  display: flex;
}

.left-sidebar {
  width: 30%;
}

.main-view {
  width: 100%;
}
</style>
