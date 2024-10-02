import { createSSRApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "@/router.js";
import {createVuetify} from "vuetify";
import 'vuetify/styles'
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";

export function createApp() {
    const app = createSSRApp(App)

    const vuetify = createVuetify({
        ssr: true,
    })

    app.use(createPinia())
    app.use(router)
    app.use(vuetify)
    return { app }
}
