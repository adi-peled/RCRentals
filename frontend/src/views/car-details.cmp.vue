<template>
  <section v-if="car">
    <div class="flex car-container">
      <div v-if="innerWidth>850">
        <div class="imgs-container grid">
          <img :class="{ small:false ,big:true}" :src="car.imgsUrl[0].url" />
          <img
            v-for="(img,idx) in car.imgsUrl.slice(1, car.imgsUrl.length)"
            :class="{small:true, big:false}"
            :src="img.url"
            :key="idx"
          />
        </div>
      </div>
      <div v-else>
        <carousel :imgs="car.imgsUrl"></carousel>
      </div>
      <div class="rest-page flex">
        <div class="car-info flex">
          <div class="details flex">
            <div>
              <span
                class="capi bold model"
              >{{car.vendor.company}} {{car.vendor.searies}} {{car.model}}</span>
              <h3>
                <span v-if="car.reviews">{{calcRating}}</span>
                <span v-else>no rating yet</span>
                <span class="star">★</span>
                <span class="capi">
                  <span class="count">({{car.reviews.length}})</span>
                  {{car.owner.fullName}}
                </span>
              </h3>
              <div class="flex feature-container">
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
                <div class="flex column location-day">
                  <div class="location">
                    <img src="@/assets/img/pin.png" alt />
                    <span class="capi">location: {{car.city}}</span>
                  </div>
                  <div class="dolar flex">
                    <img src="@/assets/img/dolar.png" al t />
                    <span>
                      Price:
                      <span class="pricer">$ {{car.price}}</span> / Day
                    </span>
                  </div>
                </div>
              </div>
              <p>{{car.desc}}</p>
            </div>
            
          </div>
          <div class="payment-details flex">
            <!-- <div class="date-pickers flex column"> -->
                  <h2>Book {{car.vendor.company}} today</h2>
              <div class="flex dates-div column">
                <!-- <div class="flex column"> -->
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
                  </div>
                <!-- </div> -->

              </div>
              <p>Distance included
              450 km
              $2.00/km fee for additional miles driven</p>
              <p>
                <span class="free-cancellation">
              <img src="@/assets/img/like.png" /> Free cancellation
            </span>
                <p>Insurance included</p>
            <div>
                Total Price:
                <span class="pricer" v-if="totalPrice">${{totalPrice}}</span>
              </p>
            </div>
              <div class="btn-book flex column">
                <button @click="toggleBookModal">Book</button>
              </div>
            <!-- </div> -->
          </div>
        </div>

        <div class="review-container flex column">
          <h4>Add a review</h4>
          <form class="review-add flex">
            <div class="add-details">
              <div class="block">
                <el-rate v-model="  review.rating" :colors="colors"></el-rate>
              </div>
              <textarea name id cols="80" rows="3" v-model="review.txt"></textarea>
            </div>
            <div class="review-btns flex">
              <button class="btn-review" @click.prevent="saveReview">save</button>
              <button class="btn-review" @click="toggleReview" hidden>close</button>
              <button @click="toggleChat" class="chat-with">Chat with owner</button>
            </div>
            <chat class="chat-details" v-if="chatting" :carOwner="car.owner" :chat="chat"></chat>
          </form>
        </div>
        <div class="flex action-btns"></div>
        <h4>Reviews</h4>

        <div v-if="car.reviews" class="reviews">
          <div v-for="review in showReviews" :key="review.id" class="review flex">
            <!-- <img class="review-img" src="@/assets/profile.jpg" /> -->
            <img
              v-if="!review.byUser.imgUrl || !(review.byUser.imgUrl.length > 7)"
              src="@/assets/profile.jpg"
              width="70"
              height="50"
            />
            <img class="user-img" v-else :src="review.byUser.imgUrl" width="50" height="50" />
            <div class="review-details flex">
              <div class="rating flex">
                <span v-for="(star,idx) in  (review.rating)" :key="idx" class="star">★</span>
              </div>
              <div class="flex review-name-date">
                <span class="reviwer-name capi">{{review.byUser.fullName}}</span>

                <span class="reviwe-time">{{new Date(review.createdAt).toLocaleDateString()}}</span>
              </div>
              <p>{{review.txt}}</p>
            </div>
          </div>
          <button
            class="btn-feedback"
            @click="showMoreReviews(true)"
            v-if="!showMore&&car.reviews.length>5"
          >See more feedback</button>
          <button
            class="btn-feedback"
            v-else-if="showMore&&car.reviews.length>5"
            @click="showMoreReviews(false)"
          >See less</button>
        </div>

        <!-- <chat class="chat-details align-self" v-if="chatting" :carOwner="car.owner" :chat="chat"></chat> -->
      </div>
    </div>

    <guest-modal :totalPrice="totalPrice" @close="saveOrder" v-if="bookModal"></guest-modal>
  </section>
</template>

<script>
import chat from "../components/chat-io.cmp.vue";
import socket from "../main-services/socketService.js";
import { carService } from "../services/car-service.js";
import { eventBus } from "../main-services/eventBus.js";
import guestModal from "../components/modal.cmp.vue";
import datePicker from "vuejs-datepicker";
import carousel from "../components/carousel.cmp.vue";
export default {
  name: "car-details",
  data() {
    return {
      chat: null,
      chatting: false,
      // disabledDates: null,
      car: null,
      disabledDates: {
        range: [],
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
        status: "pending",
      },
      review: {
        rating: null,
        txt: "",
      },
      colors: ["2D383A", "#2D383A", "#2D383A"],
      addingReview: false,
      count: 5,
      showMore: false,
      innerWidth: "",
    };
  },

  async created() {
    socket.setup();
    const carId = this.$route.params.id;
    const car = await carService.getById(carId);
    this.car = car;
    socket.on("gotChat", (chat) => (this.chat = chat));
    this.disabledDates = this.car.disabledDates;
    // this.disabledDates.ranges.push({from:Date.now()})
    window.addEventListener("load", this.updateWidth());
    window.addEventListener("resize", this.updateWidth);
    this.startChat();
  },

  methods: {
    async startChat() {
      var chat = {
        usersIds: [this.loggedInUser._id, this.car.owner._id],
        user1: {
          fullName: this.loggedInUser.fullName,
          _id: this.loggedInUser._id,
          imgUrl: this.loggedInUser.imgUrl,
        },
        user2: {
          fullName: this.car.owner.fullName,
          _id: this.car.owner._id,
          imgUrl: this.car.owner.imgUrl,
        },
        msgs: [],
      };
      socket.emit("get chat", chat);
    },
    toggleChat() {
      this.chatting = !this.chatting;
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
            imgUrl: this.loggedInUser.imgUrl,
          },
          pickupDate: this.order.pickupDate,
          returnDate: this.order.returnDate,
          status: this.order.status,
          car: {
            _id: this.car._id,
            imgUrl: this.car.imgsUrl[0],
          },
        };
        eventBus.$emit("sendSwal", "Booked !", "success");
        this.saveOrder(this.order);
        this.order = {};
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
        email: this.loggedInUser.email,
      };
      this.review.id = "r" + Math.floor(Math.random() * 999 + 1);
      this.review.createdAt = Date.now();
      this.car.reviews.push(this.review);
      this.$store.dispatch({ type: "saveCar", car: this.car });
      this.review = {};
      this.toggleReview();
    },
    showMoreReviews(boolean) {
      if (boolean) {
        this.count = this.car.reviews.length;
      } else {
        this.count = 5;
      }
      this.showMore = boolean;
    },

    saveOrder(order) {
      if (!order) {
        this.toggleBookModal();
        return;
      }

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
        to: order.returnDate,
      };
      this.car.disabledDates.ranges.push(range);
      this.$store.dispatch({ type: "saveCar", car: this.car });
      this.$store.dispatch({
        type: "saveOrder",
        order: this.order,
      });
      eventBus.$emit("sendSwal", "Booked !", "success");
      if (!this.loggedInUser) {
        this.toggleBookModal();
      }
    },
    updateWidth() {
      this.innerWidth = window.innerWidth;
    },
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
    },
    // bigImg() {
    //   return this.car.imgsUrl[0].url;
    // },
    // smallImgs() {
    //   return this.car.imgsUrl.slice(1, this.car.imgsUrl.length);
    // },
    calcRating() {
      if (!this.car.reviews.length) {
        return 0;
      }
      const sum = this.car.reviews.reduce((acc, review) => {
        acc += Number(review.rating);
        return acc;
      }, 0);
      return (sum / this.car.reviews.length).toFixed(1);
    },
    showReviews() {
      // return this.car.reviews.slice(this.car.reviews.length - this.count);
      return this.car.reviews.slice(0, this.count);
    },
  },
  components: { guestModal, datePicker, carousel, chat },
};
</script>

<style>
</style>