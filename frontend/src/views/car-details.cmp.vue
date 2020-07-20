<template>
  <section v-if="car">
    <div class="flex car-container">
      <div class="imgs-container grid">
        <img :class="{ small:false ,big:true}" :src="getImgUrl(car.primaryImgUrl)" />
        <img
          v-for="(img,idx) in car.imgUrls"
          @click="switchImg(idx)"
          :class="{small:true, big:false}"
          :src="getImgUrl(car.imgUrls[idx])"
          :key="idx"
        />
      </div>
      <div class="rest-page flex">
        <div class="car-info flex">
          <div class="details">
            <div>
              <h1 class="capi">{{car.vendor.company}} {{car.vendor.series}} {{car.model}}</h1>
              <h3>
                {{car.reviews[0].rating}}
                <span class="star">★</span>
                <span class="capi">(50) {{car.owner.fullName}}</span>
              </h3>
              <div class="features grid">
                <span>
                  <img src="@/assets/img/seat.png" />
                  {{car.features.seatsCount}} seats
                </span>
                <span>
                  <img src="@/assets/img/door.png" />
                  {{car.features.doorsCount}} doors
                </span>
                <span>
                  <img src="@/assets/img/gas.png" />
                  Gas
                </span>
                <span>
                  <img src="@/assets/img/kpl.png" />
                  {{car.features.kpl}} kpl
                </span>
              </div>
              <p>{{car.desc}}</p>
            </div>
          </div>
          <div class="payment-details flex">
            <h2>location: {{car.location.city}}</h2>
            <h1>Price: $ {{car.price}} / Day</h1>
            <div>
              <label>Pick Up Date</label>
            <input v-model="order.pickupDate" type="date">
            </div>
            <div>
              <label>Return Date</label>
              <input min="20"  v-model="order.returnDate" type="date">
              <p v-if="totalPrice">
                 Total Price:  ${{totalPrice}}
                </p>
            </div>
            <span class="free-cancellation">
              <img src="@/assets/img/like.png" /> Free cancellation
            </span>
            <button @click="toggleBookModal">Book</button>
          </div>
          {{car.owner.fulName}}
        </div>
        <div class="Reviews">
          <h4>Reviews</h4>
          <div v-for="review in car.reviews" :key="review.id" class="review flex">
            <img src alt="userImg " />
            <div class="review-details flex">
                <span class="star">★</span>
              <span class="reviwer-name">{{review.byUser}}</span>

              <span class="reviwe-time">{{new Date(review.createdAt).toLocaleDateString()}}</span>
              <p>{{review.txt}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <guest-modal :totalPrice="totalPrice" @close="saveOrder" v-if="bookModal"></guest-modal>
  </section>
</template>

<script>
import { carService } from "../services/car-service.js";
import { eventBus } from "../main-services/eventBus.js";
import guestModal from '../components/modal.vue'
export default {
  name: "car-details",
  data() {
    return {
      car: null,
      bookModal: false,
      email: "",
      fullName: "",
      phoneNumber: "",
      order: {
        pickupDate: "",
        returnDate: "",
        carId: this.$route.params.id,
        status:'pending'
      }
    };
  },
  created() {
    const carId = this.$route.params.id;
    carService.getById(carId).then(car => (this.car = car));
  },
  methods: {
    switchImg(idx) {
      var saveImg = this.car.primaryImgUrl;
      this.car.primaryImgUrl = this.car.imgUrls[idx];
      this.car.imgUrls[idx] = saveImg;
      console.log(this.car.imgUrls, this.car.primaryImgUrl);
    },
    toggleBookModal() {
      if(!this.order.pickupDate||!this.order.returnDate){
         eventBus.$emit("sendSwal", "Please fill the form !",'warning');
        return
      }
      if (!this.loggedInUser) {
        this.bookModal = !this.bookModal;
      }else{
        if(!this.order.pickupDate,!this.order.returnDate){
           eventBus.$emit("sendSwal", "Please fill the form !",'warning');
          return 
        }
        this.order={
         price: this.totalPrice,
          buyer:{
            email:this.loggedInUser.email,
            fullName:this.loggedInUser.fullName,
            imgUrl:this.loggedInUser.imgUrl
          },
          pickupDate:this.order.pickupDate,
          returnDate:this.order.returnDate,
          owner:this.car.owner
        }
        console.log(this.order);
        eventBus.$emit("sendSwal", "Booked !",'success');
        this.saveOrder()
      }
    },
    getImgUrl(imageName) {
      var images = require.context("../assets/cars/", false, /\.jpg$/);
      return images("./" + imageName + ".jpg");
    },
    saveOrder(order) {
      if(!order){
        this.toggleBookModal()
        return
      }
      if(!order.fullName||!order.email){
         return
      }
      this.order.price = this.totalPrice;
      this.order.owner = this.car.owner;
      // this.order.pickupDate = this.order.pickupDate.toLocaleDateString();
      if (this.loggedInUser) {
        const user = {
          email: this.loggedInUser.email,
          fullName: this.loggedInUser.fullName,
          imgUrl: this.loggedInUser.imgUrl,
          _id: this.loggedInUser._id
        };
        this.order.buyer = user;
        this.$store.dispatch({
          type: "saveOrder",
          order: this.order
        });
      } else {
        this.order.buyer = this.guest;
        this.$store.dispatch({
          type: "saveOrder",
          order: this.order
        });
      }
      eventBus.$emit("sendSwal", "Booked !",'success');
      this.toggleBookModal();
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    totalPrice() {
      var pickupDate=new Date(this.order.pickupDate).getTime()
      var returnDate=new Date( this.order.returnDate).getTime()
      var days=(returnDate-pickupDate)/(60*60*24*1000);
      return this.car.price *days;
    }
  },
  components: {guestModal}
};
</script>

<style>
</style>