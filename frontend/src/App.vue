<template>
  <div>
    <app-header></app-header>

      <router-view></router-view>
      <chat class="chat" v-if="chatting"></chat>
      <div class="chatimg" @click="toggleChat"><img  src="@/assets/img/chat.png" alt=""></div>
      <app-footer></app-footer>
  </div>
</template>
<script>
  import Swal from 'sweetalert2'
  import appHeader from './components/header.cmp.vue'
  import appFooter from './components/footer.cmp.vue'
  import {eventBus} from './main-services/eventBus.js'
  import chat from './components/chat-io.cmp.vue'
export default {
  components: {
    appHeader,
    appFooter,
    chat
  },
  data(){
    return {
      chatting:false
    }
  },
  created(){

     eventBus.$on('sendSwal',this.swalMsg)

  },methods:{
    swalMsg(msg,sentIcon){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },

})
Toast.fire({
  icon: sentIcon,
  title: msg
})
},
  toggleChat(){
    this.chatting=!this.chatting
  }
    
}
}
</script>>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
