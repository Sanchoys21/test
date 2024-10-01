import {defineStore} from 'pinia'
import apiClient from "@/plugins/apiClient.js";
import router from "@/router.js";
import {useUserStore} from "@/stores/user.js";

export const useMovieStore = defineStore('Movies', {
    state: () => ({
        input: "",
        results: [],
        genres: [],
        trending: [],
        austrian: [],
        topRated: [],
        error: "",

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
                    apiClient.get('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&vote_count.gte=200')
                ])
                this.trending = trendingData.data.results
                this.topRated = topRatedData.data.results
            } catch (error) {
                console.log('error');
                await this.goToErrorPage(error)
            } finally {
                this.loaders.main = false;
                await this.getAustrian();
            }
        },
        async searchMovies() {
            if (!this.input) {
                this.results = []
            } else {
                this.loaders.main = true;
                try {
                    const searchResponse = await apiClient.get(`/search/movie?query=${this.input}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`)
                    this.results = searchResponse.data.results;
                } catch (error) {
                    console.log('error');
                    await this.goToErrorPage(error)
                } finally {
                    this.loaders.main = false;
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
                    console.log(this.genres.at(0))
                    let query = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${this.genres.at(0)}`
                    let queryTwo = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&vote_count.gte=200&with_genres=${this.genres.at(0)}`

                    if (this.genres.length > 1) {
                        for (let i = 1; i < this.genres.length; i++) {
                            console.log(this.genres.at(i))
                            query += `,${this.genres[i]}`
                            queryTwo += `,${this.genres[i]}`
                        }
                    }
                    console.log(query)
                    const [trendingData, topRatedData] = await Promise.all([
                        apiClient.get(query),
                        apiClient.get(queryTwo)
                    ])
                    console.log(trendingData.data.results)
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
        async getAustrian() {
            const user = useUserStore();
            await user.lock.promise;
            this.loaders.main = true;
            try {
                const result = await apiClient.get('/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_original_language=de')
                this.austrian = result.data.results
            } catch (error) {
                await this.goToErrorPage(error)
            } finally {
                this.loaders.main = false;
            }
        }
    },
})