<template>
<section>
    <div>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="flex modal-container">
              <form @submit.prevent="onSendForm" class="modal-form">
                <h1>Contact Details</h1>
                  <div>
                  <label>eMail :</label>
                  <input v-model="order.email" type="text">
                  </div>
                  <div>
                  <label>Full Name :</label>
                  <input v-model="order.fullName" type="text">
                  </div>
                  <p v-if="wrong" style="color:red">Please Insert Full Name and eMail</p>
                  <div class="price-div">
                  Total Price: ${{totalPrice}}
                  <button class="modal-default-button">Book Now </button>
                  <button @click="$emit('close')">Exit </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
</section>


      

</template>

<script>
import { eventBus } from "../main-services/eventBus.js";
export default {

    props:['totalPrice'],
  data(){
      return{
          showModal: false,
          order:{
              fullName:'',
              email:''
          },
          wrong:false
        }
     } ,
     methods:{
         onSendForm(){
             if(!this.order.fullName||!this.order.email){
                 this.wrong=true;
                 return
             }
             this.$emit('close',this.order)
     }

     }
  }

</script>

<style>

</style>