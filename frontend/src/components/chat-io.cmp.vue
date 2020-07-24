<template>
  <section class="chat">
   
    <div>
      <ul v-if="msgs">
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
import {utils} from '../main-services/utils.js'
export default {
  props:['chat','carOwner'],
  name: "chat",
  data() {
    return {
      msg: "",
      filterBy: {
        name: ""
      }
    };
  },
  async created() {
    this.chatToRender=this.chat;
    socket.on('messege recieved',chat=>this.chatToRender=chat)
    socket.on("chat recivedMsg", this.addMsg);
    this.setFilter();
  },
  methods: {
    addMsg(msg) {
      this.msgs.unshift(msg);
    },
    sendMsg(ev) {
      var msg = {
        id:utils.getRandomId(),
        chatId:this.chat._id,
        from: {
          fullName: this.loggedInUser.fullName,
          _id: this.loggedInUser._id
        },
        to:{
          fullName:this.carOwner.fullName,
          _id:this.carOwner._id
        },
        txt: this.msg,
        createdAt: Date.now()
      };
      this.chat[0].msgs.unshift(msg)
      socket.emit("chat message", this.chat[0]);
      this.msg = "";
    },
    setFilter() {
      this.$store.dispatch({ type: "loadUsers", filterBy: this.filterBy });
    }
  },
  components: {
    usersList
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    msgs(){
      return  this.chatToRender[0].msgs
    }
  }
};
</script>

<style>
</style>