<template>
  <section class="chat">
    <div class="chat-search">
    
      <input  @input="setFilter" v-model="filterBy.name" placeholder="Search Chat" type="text" />
      <users-list @chatSelected="filterMsg"></users-list>
    </div>
    <div>
      <ul>
        <li v-for="(msg,idx) in msgs" :msg="msg" :key="idx">
          <p>
            <span class="capi">{{msg.from.fullName}}</span>
            : {{msg.txt}}
          </p>
        </li>
      </ul>
    </div>
    <form @submit.prevent="sendMsg">
      <input autofocus v-model="msg" type="text" />
      <button>Send</button>
    </form>
  </section>
</template>

<script>
import socket from "@/main-services/socketService.js";
import usersList from "./users-list.cmp.vue";
export default {
  name: "chat",
  data() {
    return {
      msg: "",
      msgs: [],
      filterBy: {
        name: ""
      }
    };
  },
  async created() {
    socket.setup();
    this.$store.dispatch({ type: "getChatHistory" });
    socket.on("chat recivedMsg", this.addMsg);
    this.setFilter();
  },
  methods: {
    addMsg(msg) {
      this.msgs.unshift(msg);
    },
    filterMsg(id){
    socket.on("gotChatHistory", msgs => (this.msgs = msgs.reverse()));        
    },
    sendMsg(ev) {
      var msg = {
        from: {
          fullName: this.loggedInUser.fullName,
          id: this.loggedInUser._id
        },
        txt: this.msg,
        createdAt: Date.now()
      };
      socket.emit("chat message", msg);
      this.msg = "";
    },
    setFilter() {
      console.log("filter");
      this.$store.dispatch({ type: "loadUsers", filterBy: this.filterBy });
    }
  },
  components: {
    usersList
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