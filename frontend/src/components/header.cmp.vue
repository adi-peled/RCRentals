<template>
  <section class="app-header flex">
    <router-link class="flex" to="/">
      <img class="header-logo-img" src="@/assets/logo.png" />
      <span class="logo-name">RCRentals</span>
    </router-link>
    <div class="flex nav">
      <router-link to="/">List your car</router-link>
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

      <!-- <router-link to="/profile"> <img src="@/assets/default-user.jpg" alt=""> </router-link> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "app-header",
  methods: {
    logout() {
      ("ff");
      this.$store.dispatch({ type: "logout" });
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