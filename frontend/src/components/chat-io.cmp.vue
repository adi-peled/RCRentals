<template >
  <section class="chat">
    <div>
      <ul v-if="chat" >
        <li  v-for="(msg,idx) in msgs" :msg="msg" :key="idx">
          <p :class="{fromme:isFromMe(msg)}">
            <span class="capi" v-if="!isFromMe(msg)">{{msg.from.fullName}}:</span>
            {{msg.txt}}
            <img v-if="!msg.from.url" src="../assets/default-user.jpg" class="msg-img" width="85" height="85" />
            <img v-else :src="msg.from.url" class="msg-img" width="50" height="50" /> 
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
      },
      changeChat:[]
    };
  },
  async created() {
    this.changeChat=this.chat
     socket.on('messege recieved',chat=>{
    this.changeChat=chat
  })
    socket.on("chat recivedMsg", this.addMsg);
    this.setFilter();
  },
  methods: {
    addMsg(msg) {
      if(msg.from._id!==this.carOwner._id){
        return
      }
      this.msgs.unshift(msg);
    },
       isFromMe(msg){
      return msg.from._id===this.loggedInUser._id
    },
    sendMsg(ev) {
      var msg = {
        id:utils.getRandomId(),
        chatId:this.chat._id,
        from: {
          fullName: this.loggedInUser.fullName,
          _id: this.loggedInUser._id,
          url: this.loggedInUser.imgUrl
        },
        to:{
          fullName:this.carOwner.fullName,
          _id:this.carOwner._id
        },
        txt: this.msg,
        createdAt: Date.now()
      };
      this.chat.msgs.unshift(msg)
      socket.emit("chat message", this.chat);
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
      
      return this.chat.msgs
    }
  }
};
</script>

<style>
</style>