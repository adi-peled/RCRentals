<template>
  <section class="profile flex">
    <div class="profile-nav">
      <div class="flex align-center user-info">
        <img
          v-if="!loggedInUser || !loggedInUser.imgUrl"
          src="../assets/default-user.jpg"
          width="85"
          height="85"
        />
        <img v-else :src="loggedInUser.imgUrl" width="85" height="85" />
        <div>
          <h1 class="capi">{{loggedInUser.fullName}}</h1>
          <!-- <h2>{{loggedInUser.email}}</h2> -->
          <div>
            <h3>Owned cars: {{ownedCars.length}}</h3>
            <h3>Requests: {{orders.length}}</h3>
            <h3>Total deals: ${{requests}}</h3>
          </div>
        </div>
      </div>
      <div class="flex wrap inner-nav">
        <div class="column profile-router" @click="addCar">
          <div>
            <i class="el-icon-circle-plus-outline"></i>
            List your car
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="column profile-router" @click="getFavCars">
          <div>
            <i class="el-icon-star-on"></i>
            My favorite cars
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <!-- <div class="column profile-router" @click="getOwnedCars">
          <div>
            <i class="el-icon-coordinate"></i>
            My cars
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>-->
        <div  class="column profile-router" @click="getUserOrders">
          <div >
            <i class="el-icon-s-order"></i>
            Booked cars
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="column profile-router" @click="getRequestedOrders">
          <div>
            <i class="el-icon-collection"></i>
            Pending requests
            <span>({{orders.length}})</span>
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="profile-info">
      <component :is="tab" :info="info" class="profile-cars"></component>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import favoriteCars from "../components/favorite-cars.cmp.vue";
import ownedCars from "../components/owned-cars.cmp.vue";
import userOrders from "../components/user-orders.cmp.vue";
import requestedOrders from "../components/requested-orders.cmp.vue";
import addCar from "../components/add-car.cmp.vue";
import { eventBus } from "../main-services/eventBus.js";
export default {
  name: "profile",
  data() {
    return {
      tab: "",
      info: {},
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    orders() {
      return this.$store.getters.orders
        .filter((order) => order.owner.fullName === this.loggedInUser.fullName)
        .filter((order) => order.status === "pending");
    },
    ownedCars() {
      return this.$store.getters.cars.filter(
        (car) => this.loggedInUser._id === car.owner._id
      );
    },
    requests() {
      return this.$store.getters.orders
        .filter(
          (order) =>
            order.status === "accept" &&
            order.owner.fullName === this.loggedInUser.fullName
        )
        .reduce((acc, order) => acc + order.price, 0);
    },
  },
  methods: {
    getFavCars() {
      this.tab = "favoriteCars";
      this.info.favCars = this.loggedInUser.favCars;
    },
    addCar() {
      this.tab = "addCar";
    },

    async getOwnedCars() {
      const cars = await this.$store.getters.cars;
      this.ownedCars = cars.filter(
        (car) => this.loggedInUser._id === car.owner._id
      );
      this.tab = "ownedCars";
      this.info.ownedCars = this.ownedCars;
    },
    async getUserOrders() {
      const orders = await this.$store.getters.orders;
      this.info.orders = orders.filter(
        (order) => order.buyer.fullName === this.loggedInUser.fullName
      );
      this.tab = "userOrders";
    },
    async getRequestedOrders() {
      const orders = await this.$store.getters.orders;
      this.info.requestedOrders = orders.filter(
        (order) => order.owner.fullName === this.loggedInUser.fullName
      );
      this.tab = "requestedOrders";
    },
  },
  created() {
    this.$store.dispatch({ type: "loadCars" });
    this.$store.dispatch({ type: "getOrders" });
    if (this.$route.params.id === "addcar") {
      this.addCar();
    }
  },

  //  const orders = this.$store.getters.orders;
  //   this.info.requestedOrders = orders.filter(
  //     order => order.owner.fullName === this.loggedInUser.fullName
  //   );
  //   const requests = this.info.requestedOrders;

  components: {
    favoriteCars,
    ownedCars,
    userOrders,
    requestedOrders,
    addCar,
  },
  mounted() {},
};
</script>
<style>
</style>