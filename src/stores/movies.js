import {defineStore} from 'pinia'
import apiClient from "@/plugins/apiClient.js";
import router from "@/router.js";

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

export const useMovieStore = defineStore('Movies', {
    state: () => ({
        input: "",
        results: [],
        genres: [],
        trending: [],
        austrian: [],
        topRated: [],
        error: "",
        profile: null,
        isAuthorised: false,
        isLogin: false,
        lock: new AsyncLock(),

        loaders: {
            main: false,
            user: false
        }

    }),
    actions: {
        async getMovies() {
            this.loaders.main = true;
            try {
                const [trendingData, topRatedData] = await Promise.all([
                    apiClient.get('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'),
                    apiClient.get('discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&vote_count.gte=200')
                ])
                this.trending = trendingData.data.results
                this.topRated = topRatedData.data.results
            } catch (error) {
                console.log('error');
                await this.goToErrorPage(error)
            } finally {
                this.loaders.main = false;
                this.lock.enable()
                await this.getAustrian();
            }
        },
        async searchMovies() {
            if (!this.input) {
                this.results = []
            } else {
                this.loaders.main = true;
                try {
                    const searchResponse = await apiClient.get(`https://api.themoviedb.org/3/search/movie?query=${this.input}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`)
                    this.results = searchResponse.data.results;
                } catch (error) {
                    console.log('error');
                    await this.goToErrorPage(error)
                } finally {
                    this.loaders.main = false;
                    this.lock.disable();
                }
            }
        },
        clearSearch() {
            this.results = []
            this.input = ''
        },
        async genreButton(id) {
            if (this.genres.indexOf(id) === -1) {
                this.genres.push(id)
            } else {
                this.genres.splice(this.genres.indexOf(id), 1)
            }

            if (this.genres.length === 0) {
                await this.getMovies()
            } else {
                this.loaders.main = true;
                try {

                    let query = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${this.genres.at(0)}`
                    let queryTwo = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&vote_count.gte=200&with_genres=${this.genres.at(0)}`

                    if (this.genres.length > 1) {
                        for (let i = 1; i < this.genres.length; i++) {
                            query += `,${this.genres[i]}`
                            queryTwo += `,${this.genres[i]}`
                        }
                    }
                    const [trendingData, topRatedData] = await Promise.all([
                        apiClient.get(query),
                        apiClient.get(queryTwo)
                    ])
                    this.trending = trendingData.data.results
                    this.topRated = topRatedData.data.results
                    // const searchResponse = await apiClient.get(query)
                    // this.results = searchResponse.data.results;
                    // console.log(searchResponse.data.results);
                } catch (error) {
                    console.log('error');
                    await this.goToErrorPage(error);
                } finally {
                    this.loaders.main = false;
                }
            }

        },
        goToErrorPage(error) {
            router.push("/error");
            this.error = error;
        },
        async login(username, password) {
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
                    this.goToErrorPage(response.status);
                }

                this.profile = await response.json();
                this.isAuthorised = true;
                await this.getAustrian();
            } catch (error) {
                this.goToErrorPage(error);
            }
        },
        async getAustrian() {
            console.log("in")
            await this.lock.enable();
            console.log("hin")
            this.loaders.main = true;
            try {
                const result = await apiClient.get('/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_original_language=de')
                console.log(result.data.results)
                this.austrian = result.data.results
            } catch (error) {
                console.log('error');
                await this.goToErrorPage(error)
            } finally {
                this.loaders.main = false;
            }
        }
    },
})