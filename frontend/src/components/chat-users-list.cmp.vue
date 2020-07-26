<template>
<section class="chat-page">
    <ul v-if="usersList" class="users-ul">
        <li class="chat-li capi" @click="getChat(user)" v-for="user in usersList" :key="user._id" :user="user"> 
          <!-- <img :src="user.imgUrl" alt="">  -->
            <img v-if="!user || !user.imgUrl|| !(user.imgUrl.length > 7)" src="../assets/default-user.jpg" width="85" height="85" />
            <img v-else :src="user.imgUrl" />
          {{user.fullName}}</li>
    </ul>
    <div class="chat-div">
   <h1 v-if="selectedUser" class="chat-head flex align-center capi">
      <img v-if="!selectedUser || !selectedUser.imgUrl|| !(selectedUser.imgUrl.length > 7)" src="../assets/default-user.jpg" width="85" height="85" />
      <img v-else :src="selectedUser.imgUrl" width="85" height="85" />
     {{selectedUser.fullName}} :</h1>
      <chat-io :chat="chat" :carOwner="selectedUser" v-if="chat"></chat-io>

    </div>
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
    if(this.chat._id!==chat._id){
      return
    }
    this.chat=chat
  })
    this.usersList= await this.$store.dispatch({ type: "loadUsers", filterBy: this.filter });
    socket.on("gotChat",chat=>{
    this.chat=chat[0];
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
    },
    


},
    components:{
      chatIo
    }
}
</script>

<style>

</style>