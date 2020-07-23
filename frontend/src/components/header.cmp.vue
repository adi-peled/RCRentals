<template>
  <section class="app-header flex">
    <router-link class="flex" to="/">
      <div @click.prevent="toggle" class="screen" :class="{'menu-open': open}"></div>
      <img class="header-logo-img" src="@/assets/logo.png" />
      <span class="logo-start">RC</span>
      <span class="logo-last">Rentals</span>
    </router-link>
    <button @click="toggle" class="btn-menu">☰</button>
    <div @click="toggle" class="flex nav" :class="{'menu-open': open}">
      <button @click="addCar">List your car</button>
      <router-link to="/car/">All Cars</router-link>
      <router-link to="/chat">Chat</router-link>
      <template v-if="!loggedInUser">
        <router-link to="/login">Log In</router-link>
        <router-link to="/signUp">Sign Up</router-link>
      </template>
      <template v-else>
        <router-link :to="'/profile/'+loggedInUser._id">My Profile</router-link>
        <button @click="logout">Log out</button>
      </template>
    </div>
  </section>
</template>
<script>
import { eventBus } from "../main-services/eventBus.js";
export default {
  name: "app-header",
  data() {
    return {
      open: false,
      id: ""
    };
  },
  created() {},
  methods: {
    addCar() {
      this.$router.push("/profile/addcar");
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>
<style>
</style>