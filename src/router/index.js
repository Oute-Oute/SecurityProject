import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: () => import("../components/FeedPage.vue"),
        },
        {
            name: "register",
            path: "/register",
            component: () => import("../views/RegisterPage.vue"),
        },
        {
            name: "sign-in",
            path: "/sign-in",
            component: () => import("../views/SignInPage.vue"),
        },
        {
            name: "wishlist",
            path: "/wishlist",
            component: () => import("../components/FeedPage.vue"),
            props: { wishlistProp: true },
        },
        {
            name: "404",
            path: "/:catchAll(.*)",
            component: () => import("../views/PageNotFound.vue")
        }
    ],
});
export default router;