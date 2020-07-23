<template>
  <ul v-if="users">
    <li v-for="user in users" :key="user._id">
      <p @click="log(user.fullName)" class="user-name">{{user.fullName}}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "usersList",
  props: ["userName"],

  data() {
    return {};
  },
  created() {},
  computed: {
    userList() {
      return this.users.filter(user =>
        user.fullName.toLowerCase().includes(this.userName)
      );
    },
    users() {
      console.log(this.$store.getters.users);
      return this.$store.getters.users;
    }
  },
  methods: {
    log(name) {
      console.log(name);
    }
  }
};
</script>

<style>
</style>