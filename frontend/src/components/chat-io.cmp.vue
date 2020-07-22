<template>
<section class="chat">
    <div>
        <ul>
            <li v-for="(msg,idx) in msgs" :msg="msg" :key="idx">
               <p> <span class="capi">{{msg.from.fullName}}</span> : {{msg.txt}}  </p>
            </li>
        </ul>
    </div>
    <form @submit.prevent="sendMsg">
        <input autofocus v-model="msg" type="text">
        <button>Send</button>
    </form>
</section>
</template>

<script>
import socket from '@/main-services/socketService.js'
export default {
name:'chat',
data(){
    return{
        msg:'',
        msgs:[]
    }
},
async created(){
socket.setup()
this.$store.dispatch({ type: "getChatHistory" });
socket.on('gotChatHistory',msgs=>this.msgs=msgs.reverse())
socket.on('chat recivedMsg',this.addMsg)
},
methods:{
    addMsg(msg){
        this.msgs.unshift(msg)
    },
     sendMsg(ev){
         var msg={from :{fullName:this.loggedInUser.fullName,id:this.loggedInUser._id},txt:this.msg,createdAt:Date.now()}
         socket.emit('chat message',msg)
         this.msg='';
     }
},
computed:{
      loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
}
// ,destroy(){
//     socket.terminate()
// }

}
</script>

<style>

</style>