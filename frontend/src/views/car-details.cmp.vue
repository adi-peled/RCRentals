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
              <date-picker
                v-model="order.pickupDate"
                :disabled-dates="disabledDates"
                :full-month-name="false"
              ></date-picker>
            </div>
            <div>
              <label>Return Date</label>
              <date-picker
                v-model="order.returnDate"
                :disabled-dates="disabledDates"
                :full-month-name="false"
              ></date-picker>
              <p v-if="totalPrice">Total Price: ${{totalPrice}}</p>
            </div>
            <span class="free-cancellation">
              <img src="@/assets/img/like.png" /> Free cancellation
            </span>
            <button @click="toggleBookModal">Book</button>
          </div>
          {{car.owner.fulName}}
        </div>

        <button class="btn-review flex" v-if="!addingReview" @click="toggleReview">add review</button>
        <button class="btn-review flex" v-else @click="toggleReview">close</button>

        <form v-if="addingReview">
          <textarea name id cols="30" rows="10" v-model="review.txt"></textarea>
          <select v-model="review.rating">
            <option value="1">★</option>
            <option value="2">★★</option>
            <option value="3">★★★</option>
            <option value="4">★★★★</option>
            <option value="5">★★★★★</option>
          </select>
          <button class="btn-review" @click.prevent="saveReview">save</button>
        </form>
        <div v-if="car.reviews" class="Reviews">
          <h4>Reviews</h4>
          <div v-for="review in car.reviews" :key="review.id" class="review flex">
            <img src alt="userImg" />
            <div class="review-details flex">
              <div class="raiting flex">
                <span v-for="(star,idx) in review.rating" :key="idx" class="star flex">★</span>
              </div>
              <div class="flex">
                <span class="reviwer-name">{{review.byUser.fullName}}</span>

                <span class="reviwe-time">{{new Date(review.createdAt).toLocaleDateString()}}</span>
              </div>
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
import guestModal from "../components/modal.vue";
import datePicker from "vuejs-datepicker";
export default {
  name: "car-details",
  data() {
    return {
      // disabledDates: null,
      car: null,
      disabledDates: {
        range: []
      },
      bookModal: false,
      email: "",
      fullName: "",
      phoneNumber: "",
      order: {
        buyer: {},
        pickupDate: "",
        returnDate: "",
        carId: this.$route.params.id,
        status: "pending"
      },
      review: {
        rating: "",
        txt: ""
      },
      addingReview: false
    };
  },
  created() {
    const carId = this.$route.params.id;
    carService.getById(carId).then(car => (this.car = car));
    // this.disabledDates=this.car.disabledDates
  },
  methods: {
    switchImg(idx) {
      var saveImg = this.car.primaryImgUrl;
      this.car.primaryImgUrl = this.car.imgUrls[idx];
      this.car.imgUrls[idx] = saveImg;
      console.log(this.car.imgUrls, this.car.primaryImgUrl);
    },
    toggleBookModal() {
      if (!this.order.pickupDate || !this.order.returnDate) {
        eventBus.$emit("sendSwal", "Please fill the form !", "warning");
        return;
      }
      if (!this.loggedInUser) {
        this.bookModal = !this.bookModal;
      } else {
        this.order = {
          buyer: {
            email: this.loggedInUser.email,
            fullName: this.loggedInUser.fullName,
            imgUrl: this.loggedInUser.imgUrl
          },
          pickupDate: this.order.pickupDate,
          returnDate: this.order.returnDate,
          status: this.order.status
        };
        eventBus.$emit("sendSwal", "Booked !", "success");
        this.saveOrder(this.order);
      }
    },
    getImgUrl(imageName) {
      var images = require.context("../assets/cars/", false, /\.jpg$/);
      return images("./" + imageName + ".jpg");
    },
    toggleReview() {
      this.addingReview = !this.addingReview;
    },
    saveReview() {
      this.review.byUser = {
        fullName: this.loggedInUser.fullName,
        imgUrl: this.loggedInUser.imgUrl,
        email: this.loggedInUser.email
      };
      this.review.id = "r" + Math.floor(Math.random() * 999 + 1);
      this.review.createdAt = Date.now();
      this.car.reviews.push(this.review);
      console.log(this.review);
      this.$store.dispatch({ type: "saveCar", car: this.car });
    },

    saveOrder(order) {
      if (!order) {
        this.toggleBookModal();
        return;
      }
      console.log(order);

      if (!order.buyer.fullName && !order.buyer.email) {
        return;
      }
      this.order.price = this.totalPrice;
      this.order.owner = this.car.owner;
      if (!this.loggedInUser) {
        this.order.buyer.email = order.buyer.email;
        this.order.buyer.fullName = order.buyer.fullName;
      }

      var range = {
        from: order.pickupDate,
        to: order.returnDate
      };
      this.car.disabledDates.ranges.push(range);
      this.$store.dispatch({ type: "saveCar", car: this.car });
      this.$store.dispatch({
        type: "saveOrder",
        order: this.order
      });
      eventBus.$emit("sendSwal", "Booked !", "success");
      if (!this.loggedInUser) {
        this.toggleBookModal();
      }
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    totalPrice() {
      var pickupDate = new Date(this.order.pickupDate).getTime();
      var returnDate = new Date(this.order.returnDate).getTime();
      var days = (returnDate - pickupDate) / (60 * 60 * 24 * 1000);
      return this.car.price * days;
    }
  },
  components: { guestModal, datePicker }
};
</script>

<style>
</style>