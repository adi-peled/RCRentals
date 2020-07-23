<template>
  <ul>
      <li v-for="user in userList" :key="user._id" ><p @click="log(user.fullName)" class="user-name">{{user.fullName}}</p></li>
  </ul>
</template>

<script>
export default {
name:'usersList',
props:['userName'],

data(){
    return {
        users:[{fullName:'shalom',_id:1121},{fullName:'Abu',_id:1211},{fullName:'Koki',_id:12111}]
    }
},
computed:{
    userList(){
        return this.users.filter(user=>user.fullName.toLowerCase().includes(this.userName))
    }
},
methods:{
    log(name){
        console.log(name);
    }
}

}
</script>

<style>

</style>