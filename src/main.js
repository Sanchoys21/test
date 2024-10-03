import {createSSRApp} from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "@/router.js";
import {useMovieStore} from "@/stores/movies.js";

export async function createApp() {
    const app = createSSRApp(App)
    const pinia = createPinia();

    app.use(pinia)
    app.use(router)
    const store = useMovieStore(pinia);
    await store.getMovies();

    return {app}
}
