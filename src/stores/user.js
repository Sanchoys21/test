import {defineStore} from 'pinia'
import {useMovieStore} from "@/stores/movies.js";

export class AsyncLock {
    constructor(immediate = false) {
        this.resolve = undefined
        this.reject = undefined
        this.promise = undefined

        if (immediate) {
            this.enable()
        }
    }

    enable() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }

    disable() {
        if (this.resolve) {
            this.resolve();
            this.resolve = undefined
            this.reject = undefined
            this.promise = undefined
        }
    }
}

export const useUserStore = defineStore('User', {
    state: () => ({
        profile: null,
        isAuthorised: false,
        isLogin: false,
        lock: new AsyncLock(true),

    }),
    actions: {
        async login(username, password) {
            const store = useMovieStore();
            try {
                const response = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({

                        username: username,
                        password: password,
                    }),
                });

                if (!response.ok) {
                    store.goToErrorPage(response.status);
                }

                this.profile = await response.json();
                this.isAuthorised = true;
            } catch (error) {
                store.goToErrorPage(error);
            } finally {
                this.lock.disable();
            }
        },
    },
})