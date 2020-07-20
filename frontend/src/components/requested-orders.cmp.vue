<template>
  <section class="profile-cars">
    <h1>Requests:</h1>
    <div v-for="request in requests" :request="request" :key="request._id" class="order-list">
      <h3>From: {{request.buyer.fullName}}</h3>
      <h3>Contact: {{request.buyer.email}}</h3>
      <h3>Pickup date: {{request.pickupDate}}</h3>
      <h3>Number of days: {{request.daysCount}}</h3>
      <h3>Total sum: ${{request.price}}</h3>
      <button>accept</button>
      <button>decline</button>
    </div>
  </section>
</template>

<script>
import orderService from "../services/order-service.js";
export default {
  props:{
    info:{
      type:Object
    }
  },
  data() {
    return {
      requests: []
    };
  },
  created() {
    this.requests = this.info.requestedOrders;
  },
};
</script>

<style>
</style>