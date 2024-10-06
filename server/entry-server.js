import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, renderToString } from "vue/server-renderer";
import { mergeProps, useSSRContext, defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, createSSRApp } from "vue";
import { defineStore, createPinia } from "pinia";
import axios from "axios";
import { createRouter, createMemoryHistory } from "vue-router";
import _ from "lodash";
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1e4
});
apiClient.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$7 = {
  name: "FilmCard",
  props: {
    title: String,
    year: String,
    image: String,
    description: String,
    rating: Number,
    size: {
      validator: (value) => {
        return ["small", "medium", "large"].includes(value);
      },
      default: "medium"
    }
  },
  data() {
    return {
      isLoading: true,
      imageDataUrl: null
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
    async loadImage() {
      try {
        const store2 = useMovieStore();
        if (this.image === null) {
          this.isLoading = false;
          return;
        }
        const response = await fetch("https://image.tmdb.org/t/p/w500" + this.image);
        if (!response.ok) {
          store2.goToErrorPage(response.status);
        }
        const blob = await response.blob();
        this.imageDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        store.goToErrorPage(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["card", $props.size]
  }, _attrs))} data-v-74c33641>`);
  if ($data.isLoading) {
    _push(`<div class="loader" data-v-74c33641></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.isLoading) {
    _push(`<img${ssrRenderAttr("src", $data.imageDataUrl)} alt="poster" data-v-74c33641>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="content" data-v-74c33641><h3 class="title" data-v-74c33641>${ssrInterpolate($props.title)}</h3><p class="year" data-v-74c33641>${ssrInterpolate($props.year)}</p><p class="rating" data-v-74c33641>${ssrInterpolate($props.rating)}</p><p class="description" data-v-74c33641>${ssrInterpolate($props.description)}</p></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Film-card.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const FilmCard = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-74c33641"]]);
const _sfc_main$6 = defineComponent({
  components: { FilmCard },
  setup() {
    const store2 = useMovieStore();
    const user = useUserStore();
    return {
      store: store2,
      user
    };
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_film_card = resolveComponent("film-card");
  if (_ctx.store.loaders.main) {
    _push(`<main${ssrRenderAttrs(_attrs)} data-v-d307453a><div class="top-bar" data-v-d307453a><ul data-v-d307453a><li data-v-d307453a><a href="#" data-v-d307453a>Movies</a></li><li data-v-d307453a><a href="#" data-v-d307453a>Series</a></li><li data-v-d307453a><a href="#" data-v-d307453a>TV Shows</a></li></ul></div><section class="trending" data-v-d307453a><h2 data-v-d307453a>Trending Movies</h2><div class="movie-list" data-v-d307453a><!--[-->`);
    ssrRenderList(10, (n) => {
      _push(`<div class="loader" data-v-d307453a></div>`);
    });
    _push(`<!--]--></div></section><section class="top" data-v-d307453a><h2 data-v-d307453a>Top Rated</h2><div class="movie-list" data-v-d307453a><!--[-->`);
    ssrRenderList(10, (n) => {
      _push(`<div class="loader" data-v-d307453a></div>`);
    });
    _push(`<!--]--></div></section></main>`);
  } else if (_ctx.store.results.length) {
    _push(`<main${ssrRenderAttrs(_attrs)} data-v-d307453a><div class="top-bar" data-v-d307453a><ul data-v-d307453a><li data-v-d307453a><a href="#" data-v-d307453a>Movies</a></li><li data-v-d307453a><a href="#" data-v-d307453a>Series</a></li><li data-v-d307453a><a href="#" data-v-d307453a>TV Shows</a></li></ul></div><div class="search-list" data-v-d307453a><!--[-->`);
    ssrRenderList(_ctx.store.results, (movie, index) => {
      _push(ssrRenderComponent(_component_film_card, {
        key: index,
        title: movie.title,
        year: movie.release_date.split("-")[0],
        image: movie.backdrop_path,
        description: movie.overview,
        rating: Math.round(movie.vote_average * 10) / 10,
        size: `large`
      }, null, _parent));
    });
    _push(`<!--]--></div></main>`);
  } else {
    _push(`<main${ssrRenderAttrs(_attrs)} data-v-d307453a><div class="top-bar" data-v-d307453a><ul data-v-d307453a><li data-v-d307453a><a href="#" data-v-d307453a>Movies</a></li><li data-v-d307453a><a href="#" data-v-d307453a>Series</a></li><li data-v-d307453a><a href="#" data-v-d307453a>TV Shows</a></li></ul></div><section class="trending" data-v-d307453a><h2 data-v-d307453a>Trending Movies</h2><div class="movie-list" data-v-d307453a><!--[-->`);
    ssrRenderList(_ctx.store.trending, (movie, index) => {
      _push(ssrRenderComponent(_component_film_card, {
        key: index,
        title: movie.title,
        year: movie.release_date.split("-")[0],
        image: movie.backdrop_path,
        description: movie.overview,
        rating: Math.round(movie.vote_average * 10) / 10,
        size: `large`
      }, null, _parent));
    });
    _push(`<!--]--></div></section><section class="top" data-v-d307453a><h2 data-v-d307453a>Latest</h2><div class="movie-list" data-v-d307453a><!--[-->`);
    ssrRenderList(_ctx.store.topRated, (movie, index) => {
      _push(ssrRenderComponent(_component_film_card, {
        key: index,
        title: movie.title,
        year: movie.release_date.split("-")[0],
        image: movie.backdrop_path,
        description: movie.overview,
        rating: Math.round(movie.vote_average * 10) / 10
      }, null, _parent));
    });
    _push(`<!--]--></div></section><section class="extra" data-v-d307453a><h2 data-v-d307453a>German</h2><div class="movie-list" data-v-d307453a>`);
    if (!_ctx.user.isAuthorised) {
      _push(`<p data-v-d307453a>Visible only for Authorised users</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--[-->`);
    ssrRenderList(_ctx.store.austrian, (movie, index) => {
      _push(ssrRenderComponent(_component_film_card, {
        key: index,
        title: movie.title,
        year: movie.release_date.split("-")[0],
        image: movie.backdrop_path,
        description: movie.overview,
        rating: Math.round(movie.vote_average * 10) / 10
      }, null, _parent));
    });
    _push(`<!--]--></div></section></main>`);
  }
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/HomeView.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-d307453a"]]);
const _sfc_main$5 = defineComponent({
  name: "ErrorView",
  setup() {
    const store2 = useMovieStore();
    return {
      store: store2
    };
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_RouterLink = resolveComponent("RouterLink");
  _push(`<main${ssrRenderAttrs(_attrs)} data-v-6d455196><h1 data-v-6d455196>Something went wrong</h1><p data-v-6d455196>${ssrInterpolate(_ctx.store.error)}</p>`);
  _push(ssrRenderComponent(_component_RouterLink, {
    class: "link",
    to: "/"
  }, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Go back to Home page`);
      } else {
        return [
          createTextVNode("Go back to Home page")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</main>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/ErrorView.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ErrorView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-6d455196"]]);
const routes = [
  { path: "/", component: HomeView },
  { path: "/error", component: ErrorView }
];
const router = createRouter({
  history: createMemoryHistory(),
  // history: createMemoryHistory('/test/'),
  routes
});
const useMovieStore = defineStore("Movies", {
  state: () => ({
    input: "",
    results: [],
    genres: [],
    genresCall: [],
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
      this.loaders.user = true;
      try {
        const [trendingData, topRatedData, genresResponse] = await Promise.all([
          apiClient.get("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"),
          apiClient.get("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&vote_count.gte=200"),
          apiClient.get(`/genre/movie/list?language=en}`)
        ]);
        this.trending = trendingData.data.results;
        this.topRated = topRatedData.data.results;
        this.genres = genresResponse.data.genres;
      } catch (error) {
        console.log("error");
        await this.goToErrorPage(error);
      } finally {
        this.loaders.main = false;
        this.loaders.user = false;
      }
    },
    async searchMovies() {
      if (!this.input) {
        this.results = [];
      } else {
        this.loaders.main = true;
        try {
          const searchResponse = await apiClient.get(`/search/movie?query=${this.input}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`);
          this.results = searchResponse.data.results;
        } catch (error) {
          console.log("error");
          await this.goToErrorPage(error);
        } finally {
          this.loaders.main = false;
        }
      }
    },
    clearSearch() {
      this.results = [];
      this.input = "";
    },
    async genreButton(id) {
      if (this.genresCall.indexOf(id) === -1) {
        this.genresCall.push(id);
      } else {
        this.genresCall.splice(this.genresCall.indexOf(id), 1);
      }
      if (this.genresCall.length === 0) {
        await this.getMovies();
      } else {
        this.loaders.main = true;
        try {
          let query = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${this.genresCall.at(0)}`;
          let queryTwo = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&vote_count.gte=200&with_genres=${this.genresCall.at(0)}`;
          if (this.genresCall.length > 1) {
            for (let i = 1; i < this.genresCall.length; i++) {
              console.log(this.genresCall.at(i));
              query += `,${this.genresCall[i]}`;
              queryTwo += `,${this.genresCall[i]}`;
            }
          }
          const [trendingData, topRatedData] = await Promise.all([
            apiClient.get(query),
            apiClient.get(queryTwo)
          ]);
          console.log(trendingData.data.results);
          this.trending = trendingData.data.results;
          this.topRated = topRatedData.data.results;
        } catch (error) {
          console.log("error");
          await this.goToErrorPage(error);
        } finally {
          this.loaders.main = false;
        }
      }
    },
    async goToErrorPage(error) {
      await router.push("/error");
      this.error = error;
    },
    async getAustrian() {
      const user = useUserStore();
      await user.lock.promise;
      this.loaders.main = true;
      try {
        const result = await apiClient.get("/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_original_language=de");
        this.austrian = result.data.results;
      } catch (error) {
        await this.goToErrorPage(error);
      } finally {
        this.loaders.main = false;
      }
    }
  }
});
class AsyncLock {
  constructor(immediate = false) {
    this.resolve = void 0;
    this.reject = void 0;
    this.promise = void 0;
    if (immediate) {
      this.enable();
    }
  }
  enable() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  disable() {
    if (this.resolve) {
      this.resolve();
      this.resolve = void 0;
      this.reject = void 0;
      this.promise = void 0;
    }
  }
}
const useUserStore = defineStore("User", {
  state: () => ({
    profile: null,
    isAuthorised: false,
    isLogin: false,
    lock: new AsyncLock(true)
  }),
  actions: {
    async login(username, password) {
      const store2 = useMovieStore();
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password
          })
        });
        if (!response.ok) {
          await store2.goToErrorPage(response.status);
        }
        this.profile = await response.json();
        this.isAuthorised = true;
      } catch (error) {
        await store2.goToErrorPage(error);
      } finally {
        this.lock.disable();
      }
    }
  }
});
const _sfc_main$4 = {
  name: "LeftSidebar",
  methods: {
    openLogin() {
      const store2 = useUserStore();
      store2.isLogin = true;
    },
    isAuthorised() {
      return useUserStore().isAuthorised;
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_RouterLink = resolveComponent("RouterLink");
  _push(`<!--[--><aside class="sidebar-streaming" data-v-477edbe2></aside><aside class="sidebar" data-v-477edbe2><div class="menu" data-v-477edbe2><ul data-v-477edbe2><li data-v-477edbe2>`);
  _push(ssrRenderComponent(_component_RouterLink, {
    class: "link",
    to: "/"
  }, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-477edbe2><a href="#" data-v-477edbe2>Discovery</a></li><li data-v-477edbe2><a href="#" data-v-477edbe2>Community</a></li><li data-v-477edbe2><a href="#" data-v-477edbe2>Coming soon</a></li></ul></div><div class="library" data-v-477edbe2><ul data-v-477edbe2><li data-v-477edbe2><a href="#" data-v-477edbe2>Recent</a></li><li data-v-477edbe2><a href="#" data-v-477edbe2>Bookmarked</a></li><li data-v-477edbe2><a href="#" data-v-477edbe2>Top Rated</a></li><li data-v-477edbe2><a href="#" data-v-477edbe2>Downloaded</a></li></ul></div><div class="settings" data-v-477edbe2><ul data-v-477edbe2><li data-v-477edbe2><a href="#" data-v-477edbe2>Settings</a></li><li data-v-477edbe2><a href="#" data-v-477edbe2>Help</a></li></ul></div>`);
  if (!$options.isAuthorised()) {
    _push(`<button data-v-477edbe2>Login</button>`);
  } else {
    _push(`<button data-v-477edbe2>Logout</button>`);
  }
  _push(`</aside><!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LeftSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const LeftSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-477edbe2"]]);
const _sfc_main$3 = {
  name: "RightSidebar",
  props: {
    profile: Object,
    genres: Array
  },
  setup() {
    const store2 = useMovieStore();
    const search = _.debounce(() => {
      store2.searchMovies();
    }, 300);
    const isActive = (id) => {
      return store2.genresCall.includes(id);
    };
    const choose = (id) => {
      store2.genreButton(id);
    };
    return {
      store: store2,
      search,
      isActive,
      choose
    };
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<aside${ssrRenderAttrs(mergeProps({ class: "sidebar-right" }, _attrs))} data-v-1638a336>`);
  if ($setup.store.loaders.user) {
    _push(`<div class="profile" data-v-1638a336><div class="loader-profile" data-v-1638a336></div></div>`);
  } else if ($props.profile) {
    _push(`<div class="profile" data-v-1638a336><img${ssrRenderAttr("src", $props.profile.image)} alt="Profile picture" data-v-1638a336><div class="profile-data" data-v-1638a336><p class="profile-name" data-v-1638a336>${ssrInterpolate($props.profile.firstName)} ${ssrInterpolate($props.profile.lastName)}</p><p class="profile-email" data-v-1638a336>${ssrInterpolate($props.profile.email)}</p></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="search" data-v-1638a336><input type="text"${ssrRenderAttr("value", $setup.store.input)} placeholder="Search movies" data-v-1638a336></div>`);
  if ($setup.store.loaders.user) {
    _push(`<div class="loader-genres" data-v-1638a336></div>`);
  } else {
    _push(`<div class="genres" data-v-1638a336><span class="title" data-v-1638a336>genre</span><div class="list" data-v-1638a336><!--[-->`);
    ssrRenderList($props.genres, (genre) => {
      _push(`<div class="${ssrRenderClass({ active: $setup.isActive(genre.id) })}" data-v-1638a336>${ssrInterpolate(genre.name)}</div>`);
    });
    _push(`<!--]--></div></div>`);
  }
  _push(`</aside>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RightSidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const RightSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-1638a336"]]);
const _sfc_main$2 = {
  props: {
    isVisible: Boolean
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.isVisible) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))} data-v-47456384><div class="content" data-v-47456384>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Modal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-47456384"]]);
const _sfc_main$1 = {
  components: { Modal },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const store2 = useUserStore();
      try {
        await store2.login(this.username, this.password);
        store2.isLogin = false;
      } catch (error) {
        store2.goToErrorPage(error);
      }
    },
    close() {
      const store2 = useUserStore();
      store2.isLogin = false;
    },
    isVisible() {
      const store2 = useUserStore();
      return store2.isLogin;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Modal = resolveComponent("Modal");
  _push(ssrRenderComponent(_component_Modal, mergeProps({
    isVisible: $options.isVisible()
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<button class="close" data-v-51f8c16b${_scopeId}>×</button><form data-v-51f8c16b${_scopeId}><div data-v-51f8c16b${_scopeId}><label data-v-51f8c16b${_scopeId}>Username</label><input${ssrRenderAttr("value", $data.username)} type="text" required data-v-51f8c16b${_scopeId}></div><div data-v-51f8c16b${_scopeId}><label data-v-51f8c16b${_scopeId}>Password</label><input${ssrRenderAttr("value", $data.password)} type="password" data-v-51f8c16b${_scopeId}></div><button class="submit" type="submit" data-v-51f8c16b${_scopeId}>Login</button></form>`);
      } else {
        return [
          createVNode("button", {
            class: "close",
            onClick: $options.close
          }, "×", 8, ["onClick"]),
          createVNode("form", {
            onSubmit: withModifiers($options.login, ["prevent"])
          }, [
            createVNode("div", null, [
              createVNode("label", null, "Username"),
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => $data.username = $event,
                type: "text",
                required: ""
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, $data.username]
              ])
            ]),
            createVNode("div", null, [
              createVNode("label", null, "Password"),
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => $data.password = $event,
                type: "password"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, $data.password]
              ])
            ]),
            createVNode("button", {
              class: "submit",
              type: "submit"
            }, "Login")
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-51f8c16b"]]);
const _sfc_main = defineComponent({
  methods: { useUserStore },
  components: { Login, RightSidebar, LeftSidebar },
  setup() {
    const store2 = useMovieStore();
    store2.getAustrian();
    return {
      store: store2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LeftSidebar = resolveComponent("LeftSidebar");
  const _component_Login = resolveComponent("Login");
  const _component_RouterView = resolveComponent("RouterView");
  const _component_RightSidebar = resolveComponent("RightSidebar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-e17d0c6b>`);
  _push(ssrRenderComponent(_component_LeftSidebar, null, null, _parent));
  if (_ctx.useUserStore().isLogin) {
    _push(ssrRenderComponent(_component_Login, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
  _push(ssrRenderComponent(_component_RightSidebar, {
    profile: _ctx.useUserStore().profile,
    genres: _ctx.store.genres
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e17d0c6b"]]);
function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(router);
  const store2 = useMovieStore();
  store2.getMovies();
  return { app };
}
async function render() {
  const { app } = createApp();
  const ctx = {};
  const html = await renderToString(app, ctx);
  return { html };
}
export {
  render
};
