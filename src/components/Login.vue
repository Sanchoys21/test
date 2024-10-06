<script>

import Modal from "@/components/Modal.vue";
import {useUserStore} from "@/stores/user.js";

export default {
  components: {Modal},
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async login() {
      const store = useUserStore();
      try {
        await store.login(this.username, this.password);
        store.isLogin = false;
      } catch (error) {
        store.goToErrorPage(error)
      }
    },
    close() {
      const store = useUserStore();
      store.isLogin = false;
    },
    isVisible() {
      const store = useUserStore();
      return store.isLogin;
    }
  }
}
</script>

<template>
  <Modal :isVisible="isVisible()">
    <button class="close" @click="close">&times;</button>
    <form @submit.prevent="login">
      <div>
        <label>Username</label>
        <input v-model="username" type="text" required/>
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password"/>
      </div>

      <button class="submit" type="submit">Login</button>
    </form>
  </Modal>
</template>

<style scoped>
.close {
  border: none;
  background: #1A171E;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

input {
  width: 96%;
  padding: 5px;
  border-radius: 8px;
  background-color: white;
}

.submit {
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  background-color: #6F6E74;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
  color: white;
}

.submit:hover {
  background-color: #414044;
}
</style>