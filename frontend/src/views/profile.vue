<template>
  <section class="profile">
    <div class="profile-nav">
      <img src="../assets/default-user.jpg" width="150" />
      <h1>Welcome {{loggedInUser.fullName}}</h1>
      <h2>{{loggedInUser.email}}</h2>
      <div>
        <div class="col profile-router" @click="addCar">
          <div>
            <i class="el-icon-circle-plus-outline"></i>
            List your car
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="col profile-router" @click="getFavCars">
          <div>
            <i class="el-icon-star-on"></i>
            My favorite cars
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="col profile-router" @click="getOwnedCars">
          <div>
            <i class="el-icon-coordinate"></i>
            My cars
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="col profile-router" @click="getUserOrders">
          <div>
            <i class="el-icon-s-order"></i>
            My orders
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="col profile-router" @click="getRequestedOrders">
          <div>
            <i class="el-icon-collection"></i>
            Requested orders
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="profile-info">
      <component :is="tab" :info="info" class="profile-cars"></component>
    </div>
  </section>
</template>

<script>
import favoriteCars from "../components/favorite-cars.cmp.vue";
import ownedCars from "../components/owned-cars.cmp.vue";
import userOrders from "../components/user-orders.cmp.vue";
import { carService } from "../services/car-service.js";
import userService from "../services/user-service.js";
import orderService from "../services/order-service.js";
import requestedOrders from "../components/requested-orders.cmp.vue";
import addCar from "../components/add-car.cmp.vue";
import { eventBus } from "../main-services/eventBus.js";
export default {
  name: "profile",
  data() {
    return {
      tab: "",
      info: {}
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    async getFavCars() {
      this.tab = "favoriteCars";
      this.info.favCars = this.loggedInUser.favCars;
    },
    async addCar() {
      this.tab = "addCar";
    },

    async getOwnedCars() {
      const cars = await carService.query();
      this.ownedCars = cars.filter(
        car => this.loggedInUser._id === car.owner._id
      );
      this.tab = "ownedCars";
      this.info.ownedCars = this.ownedCars;
    },
    async getUserOrders() {
      const orders = await orderService.query();
      this.info.orders = orders.filter(
        order => order.buyer.fullName === this.loggedInUser.fullName
      );
      this.tab = "userOrders";
    },
    async getRequestedOrders() {
      const orders = await orderService.query();
      this.info.requestedOrders = orders.filter(
        order => order.owner.fullName === this.loggedInUser.fullName
      );
      this.tab = "requestedOrders";
    }
  },
  created() {
    this.$store.dispatch({ type: "loadCars" });
  },
  components: {
    favoriteCars,
    ownedCars,
    userOrders,
    requestedOrders,
    addCar
  }
};
</script>
<style>
</style>