<template>
  <ul v-if="users">
    <li v-for="user in users" :key="user._id">
      <p @click="selectChat(user._id)" class="user-name">{{user.fullName}}</p>
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
      return this.$store.getters.users;
    }
  },
  methods: {
    selectChat(id) {
        this.$emit("chatSelected",id);
    }
  }
};
</script>

<style>
</style>