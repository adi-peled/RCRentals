<template>
  <section class="profile-cars">
    <h1>Requests</h1>
    <div v-for="order in orders" :order="order" :key="order._id" class="order-list flex">
      <img :src="order.car.imgUrl.url" />
      <div class="request-details flex column">
        <div class="flex column">
          <span class="capi">From: {{order.buyer.fullName}}</span>
          <span>Contact: {{order.buyer.email}}</span>
          <span>Pickup date: {{changeDateForm(order.pickupDate)}}</span>
          <span>Return date {{changeDateForm(order.returnDate)}}</span>
          <span>Total sum: ${{order.price}}</span>
        </div>
        <div class="order-btn flex" v-if="order.status==='pending'">
          <button class="accept-btn" @click="updateOrderStatus(order,'accept')">accept</button>
          <button class="decline-btn" @click="updateOrderStatus(order,'decline')">decline</button>
        </div>
        <div
          class="order-status"
          :class="{accept:isAccept(order),decline:isDecline(order)}"
          v-else
        >{{order.status}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import orderService from "../services/order-service.js";
export default {
  name: "requested-orders",
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.orders = this.info.requestedOrders;
    var pendingOrders = this.orders.filter(
      (order) => order.status === "pending"
    );
    var answerOrders = this.orders.filter(
      (order) => order.status !== "pending"
    );
    if (!pendingOrders) pendingOrders = [];
    if (!answerOrders) answerOrders = [];

    let sortedOrders = pendingOrders.concat(answerOrders).sort((o1, o2) => {
      let o1CreatedAt = o1.createdAt ? o1.createdAt : -Infinity;
      let o2CreatedAt = o2.createdAt ? o2.createdAt : -Infinity;
      return o2CreatedAt - o1CreatedAt;
    });
    this.orders = sortedOrders;
  },
  methods: {
    updateOrderStatus(order, status) {
      order.status = status;
      this.$store.dispatch({ type: "saveOrder", order });
    },
    changeDateForm(date) {
      var idx = date.indexOf("T");
      var miniDate = date.substring(0, idx);
      return miniDate;
    },
    isAccept(order) {
      return order.status === "accept";
    },
    isDecline(order) {
      return order.status === "decline";
    },
  },
  computed: {},
};
</script>

<style>
</style>