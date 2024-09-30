<script>
import {useUserStore} from "@/stores/user.js";

export default {
  name: "LeftSidebar",
  methods: {
    openLogin() {
      const store = useUserStore();
      store.isLogin = true;
    },
    isAuthorised() {
      return useUserStore().isAuthorised;
    }
  },
}
</script>

<template>
  <aside class="sidebar-streaming">
    <!--      icons-->
  </aside>
  <aside class="sidebar">
    <div class="menu">
      <ul>
        <li>
          <RouterLink class="link" to="/">Home</RouterLink>
        </li>
        <li><a href="#">Discovery</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Coming soon</a></li>
      </ul>
    </div>
    <div class="library">
      <ul>
        <li><a href="#">Recent</a></li>
        <li><a href="#">Bookmarked</a></li>
        <li><a href="#">Top Rated</a></li>
        <li><a href="#">Downloaded</a></li>
      </ul>
    </div>
    <div class="settings">
      <ul>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Help</a></li>
      </ul>
    </div>
    <button v-if="!isAuthorised()" @click="openLogin">Login</button>
<!--    <button v-else @click="logout">Logout</button>-->
    <button v-else>Logout</button>
  </aside>
</template>

<style scoped>
.sidebar-streaming {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5%;
  padding-top: 5%;
}

.sidebar {
  background: #1A171E;
  width: 10%;
  display: flex;
  flex-direction: column;
  padding: 5% 20px 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar li a, .sidebar li .link {
  text-decoration: none;
  color: #6F6E74;
  border: none;
  cursor: pointer;
}

.menu, .library {
  border-bottom: #6F6E74 1px solid;
}

button {
  border: none;
  cursor: pointer;
  padding: 0;
  background: #1A171E;
  color: #6F6E74;
  text-align: left;
  margin: auto 0 0;
}

</style>
