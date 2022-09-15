import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import sourceData from "@/data.json";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/protected",
    name: "protected",
    components: {
      default: () =>
        import(/* webpackChunkName: protected */ "@/views/ProtectedView.vue"),
      LeftSidebar: () =>
        import(/* webpackChunkName: sidebar */ "@/components/LeftSidebar.vue"),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () =>
      import(/* webpackChunkName: invoices */ "@/views/InvoicesView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: login */ "@/views/LoginView.vue"),
  },
  {
    path: "/example/:id(\\d+)*",
    component: () =>
      import(/* webpackChunkname: login */ "@/views/LoginView.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination-show",
    component: () =>
      import(
        /* webpackChunkName: "destination" */ "@/views/DestinationShow.vue"
      ),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    beforeEnter(to) {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );
      if (!exists)
        return {
          name: "NotFound",
          parmas: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience",
        component: () =>
          import(
            /* webpackChunkName: experience */ "@/views/ExperienceShow.vue"
          ),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: notfound */ "@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  /*  Change default active class name:
    linkActiveClass: "active-link",
  */
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      })
    );
  },
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !window.user) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
