<template>
<section>
    <ul v-if="usersList">
        <li @click="getChat(user)" v-for="user in usersList" :key="user._id" :user="user">{{user.fullName}}</li>
    </ul>
      <chat-io :chat="chat" :carOwner="selectedUser" v-if="chat"  ></chat-io>
</section>
</template>

<script>
import socket from "../main-services/socketService.js";
import chatIo from '../components/chat-io.cmp.vue'

export default {
name:'userList',
data(){
    return{
        usersList:null,
        filter:'',
        selectedUser:null,
        chat:null
    }
},
async created(){
  
  socket.setup()
  socket.on('messege recieved',chat=>{

    this.chat=[chat]
  })
  this.usersList= await this.$store.dispatch({ type: "loadUsers", filterBy: this.filter });
    socket.on("gotChat",chat=>{
    this.chat=chat;
    })
},
methods:{
  getChat(user){
    this.selectedUser=user;
    var chat={
        usersIds:[this.loggedInUser._id,user._id],
        user1:{fullName:this.loggedInUser.fullName,_id:this.loggedInUser._id,imgUrl:this.loggedInUser.imgUrl},
        user2:{fullName:user.fullName,_id:user._id,imgUrl:user.imgUrl},
        msgs:[]
      }
      socket.emit("get chat", chat);
    },
    
},
computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }


},
    components:{
      chatIo
    }
}
</script>

<style>

</style>