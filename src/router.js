import {createMemoryHistory, createRouter} from 'vue-router'

import HomeView from './pages/HomeView.vue'
import ErrorView from './pages/ErrorView.vue'

const routes = [
    {path: '/', component: HomeView},
    {path: '/error', component: ErrorView},
]

const router = createRouter({
    history: createMemoryHistory(),
    // history: createMemoryHistory('/test/'),
    routes,
})

export default router;
