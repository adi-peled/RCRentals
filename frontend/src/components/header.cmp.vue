<template>
  <section class="app-header flex">
    <router-link class="flex" to="/">
      <div @click.prevent="toggle" class="screen" :class="{'menu-open': open}"></div>
      <img class="header-logo-img" src="@/assets/logo.png" />
      <span class="logo-name">RCRentals</span>
    </router-link>
<<<<<<< HEAD
     <button @click="toggle" class="btn-menu">☰</button>
    <!-- <div class="flex nav"  :class="{'menu-open': open}"> </div> -->
    <div  @click="toggle" class="flex nav"  :class="{'menu-open': open}">
=======
    <button @click="toggle" class="btn-menu">☰</button>
    <div class="flex nav" :class="{'menu-open': open}"></div>
    <div @click="toggle" class="flex nav" :class="{'menu-open': open}">
>>>>>>> 3c1fbbe1ee50883e167b7a879f8831dab748c4de
      <button @click="addCar">List your car</button>
      <router-link to="/about">About</router-link>
      <router-link to="/car/  ">All Cars</router-link>
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
  // created(){
  //   this.id=this.loggedInUser._id
  // },
  methods: {
    addCar(){
      this.$router.push({ path: 'profile/addcar', params: { userId: this.loggedInUser._id } })

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