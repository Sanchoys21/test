import {defineStore} from 'pinia'
import apiClient from "@/plugins/apiClient.js";

export const useMovieStore = defineStore('Movies', {
    state: () => ({
        input: "",
        results: [],

        genres: [],

        trending: [],
        topRated: [],
    }),
    actions: {
        async getMovies() {
            const [trendingData, topRatedData] = await Promise.all([
                apiClient.get('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'),
                apiClient.get('discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200')
            ])
            this.trending = trendingData.data.results
            this.topRated = topRatedData.data.results
        },
        async searchMovies() {
            if (!this.input) {
                this.results = []
            } else {
                const searchResponse = await apiClient.get(`https://api.themoviedb.org/3/search/movie?query=${this.input}&include_adult=false&language=en-US&page=1`)
                this.results = searchResponse.data.results;
                // console.log(searchResponse.data.results);
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
                this.results = []
            } else {
                let query = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=50&with_genres=${this.genres.at(0)}`

                if (this.genres.length > 1) {
                    for (let i = 1; i < this.genres.length; i++) {
                        query += `,${this.genres[i]}`
                    }
                }
                const searchResponse = await apiClient.get(query)
                this.results = searchResponse.data.results;
                console.log(searchResponse.data.results);
            }

        }
    }
})