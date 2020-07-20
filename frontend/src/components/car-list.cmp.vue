
<template >
  <section class="car-list flex">
    <div class="cards-container grid">
      <car-preview
        class="car-card"
        @updateUserFavs="updateUserFavs"
        @removeCar="removeCar"
        v-for="car in cars"
        :car="car"
        :key="car._id"
      ></car-preview>
    </div>
  </section>
</template>

<script>
export default {
  name: "car-list",
  props: {
    cars: {
      type: Array
    }
  },
  methods: {
    removeCar(id) {
      this.$emit("removeCar", id);
    },
    addCar() {
      this.$router.push("/car/edit");
    },
    updateUserFavs(car, isLiked) {
      this.$emit("updateUserFavs", car, isLiked);
    }
  },
  components: {
    carPreview
  }
};
import carPreview from "./car-preview.cmp.vue";
</script>

<style>
</style>