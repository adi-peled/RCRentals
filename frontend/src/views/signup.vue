<template>
  <section class="flex signup-section">
    <form class="flex signup-form" @submit.prevent="onSignUp">
      <h2>Let’s get started</h2>
      <div class="flex">
        <div class="form-halfRow">
          <label>First Name</label>
          <input v-model="fname" type="text" />
        </div>
        <div class="form-halfRow">
          <label>Last Name</label>
          <input v-model="lname" type="text" />
        </div>
      </div>
      <p class="signup-form-caption">Enter your name as it appears on your drivers license</p>
      <div>
        <label>Email</label>
        <input v-model="email" class="signup-form-group" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" class="signup-form-group" type="password" />
      </div>
      <label>
        <input class="form-checkbox" type="checkbox" /> I agree to the
        <button class="button-link">terms of service</button> and
        <button class="button-link">privacy policy.</button>
      </label>
      <label>
        <input class="form-checkbox" type="checkbox" /> Yes, send me deals, discounts and updates!
      </label>
      <button class="signup-button">Sign Up</button>
    </form>
  </section>
</template>

<script>
import {eventBus} from '../main-services/eventBus.js'
export default {
  name: "signup",
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: ""
    };
  },
  methods: {
    onSignUp() {
      var user = {
        fullName: this.fname + " " + this.lname,
        email: this.email,
        password: this.password,
        createdAt: Date.now(),
        isAdmin: false,
        imgUrl: null,
        orders: [],
        favCars: []
      };
      this.$store.dispatch({ type: "signUp", userCred: user });
       eventBus.$emit('sendSwal','Signed Up')
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>