<template>
  <section class="flex signup-section">
    <form @submit.prevent="onLogin" class="flex signup-form">
      <h2>Welcome Back</h2>
      <label>Email</label>
      <input v-model="email" class="signup-form-group" type="email" />
      <div>
        <label>Password</label>
        <input v-model="password" class="signup-form-group" type="password" />
        <button class="signin-button">Log In</button>
      </div>
      <div class="no-account">
        <p>Don’t have an account?</p>
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </form>
  </section>
</template>


<script>
  import {eventBus} from '../main-services/eventBus.js'
export default {
  name:'login-page',
  data() {
    return {
      password: "",
      email: ""
    };
  },
  methods: {
    async onLogin() {
      var userCred = {
        password: this.password,
        email: this.email
      };
      let user = await this.$store.dispatch({
        type: "login",
        userCred: userCred
      });
      
       eventBus.$emit('sendSwal','Logged In')
       this.$router.push("/");
    }
},

}


</script>

<style>
</style>