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
         <el-upload
          ref="upload"
          :limit="1"
          v-model="fileList"
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-change="onUploadImg"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button class="upload-btn" size="small" type="primary">Upload your profile picture</el-button>
        </el-upload>
      <label>
        <input class="form-checkbox" type="checkbox" /> I agree to the
        <button class="button-link">terms of service</button> and
        <button class="button-link">privacy policy.</button>
      </label>
      <label>
      </label>
        <input class="form-checkbox" type="checkbox" /> Yes, send me deals, discounts and updates!
      <button class="signup-button">Sign Up</button>
    </form>
  </section>
</template>

<script>
import { uploadImg } from "../main-services/imgUpload.service.js";
import {eventBus} from '../main-services/eventBus.js'
export default {
  name: "signup",
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      imgUrl: '',
      fileList: []
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
        imgUrl: this.imgUrl,
        orders: [],
        favCars: []
      };
      this.$store.dispatch({ type: "signUp", userCred: user });
       eventBus.$emit('sendSwal','Signed Up')
      this.$router.push("/");
    },
    async onUploadImg(file, fileList) {
      var img = await uploadImg(file.raw);
      img.uid = file.raw.uid;
      this.imgUrl = img.url;
    },
  }
};
</script>

<style>
</style>