<template>
  <section class="add-car-section">
    <form class="add-car-form" @submit.prevent="addCar">
      <div class="flex first-div-caradd">
        <el-upload
          ref="upload"
          :limit="5"
          v-model="fileList"
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-change="onUploadImg"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
        <div>
          <el-select v-model="car.tag" placeholder="Tag">
            <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="add-car-drop">
        <label>Car Condition</label>
        <el-select v-model="car.condition" placeholder="Condition">
          <el-option
            v-for="item in conditions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="add-car-drop">
        <label>Car Model</label>
        <el-select v-model="car.model" placeholder="Model">
          <el-option
            v-for="item in years"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="add-car-input">
        <Label>Car Company</Label>
        <el-input placeholder="Company" v-model="car.vendor.company"></el-input>
      </div>
      <div class="add-car-input">
        <Label>Car Searies</Label>
        <el-input placeholder="Searies" v-model="car.vendor.searies"></el-input>
      </div>
      <div class="add-car-input">
        <Label>Car Price $/Day</Label>
        <el-input-number v-model="car.price" :min="1"></el-input-number>
      </div>
      <div class="add-car-input">
        <Label>Car Description (optional)</Label>
        <el-input placeholder="Descrition" v-model="car.desc"></el-input>
      </div>
      <button>List Car</button>
    </form>
  </section>
</template>
<script>
import { eventBus } from "../main-services/eventBus.js";
import { uploadImg } from "../main-services/imgUpload.service.js";
export default {
  data() {
    return {
      tags: [
        {
          value: "sport",
          label: "Sport",
        },
        {
          value: "exotic",
          label: "Exotic",
        },
        {
          value: "vintage",
          label: "Vintage",
        },
        {
          value: "luxury",
          label: "Luxury",
        },
        {
          value: "custom",
          label: "Custom",
        },
        {
          value: "converitible",
          label: "Converitible",
        },
        {
          value: "SUV",
          label: "SUV",
        },
        {
          value: "trucks",
          label: "Trucks",
        },
        {
          value: "minivan",
          label: "Minivan",
        },
      ],
      carTag: "",
      conditions: [
        {
          value: "bad",
          label: "Bad",
        },
        {
          value: "decent",
          label: "Decent",
        },
        {
          value: "good",
          label: "Good",
        },
        {
          value: "best",
          label: "Best",
        },
      ],
      car: {
        tag: "",
        condition: "",
        model: "",
        disabledDates: {
          ranges: [],
        },
        vendor: {
          company: "",
          searies: "",
        },
        price: 200,
        desc: "",
        imgsUrl: [],
      },
      fileList: [],
    };
  },
  methods: {
    async onUploadImg(file, fileList) {
      console.log(file);
      var img = await uploadImg(file.raw);
      img.uid = file.raw.uid;
      this.car.imgsUrl.push(img);
    },
    addCar() {
      if (this.car.imgsUrl.length < 5) {
        console.log(this.car.imgsUrl.length);
        eventBus.$emit("sendSwal", "Please use 5 pictures ", "warning");
        return;
      }
      if (
        !this.car.imgsUrl ||
        !this.car.tag ||
        !this.car.condition ||
        !this.car.price ||
        !this.car.vendor.searies ||
        !this.car.vendor.company ||
        !this.car.model
      ) {
        eventBus.$emit("sendSwal", "Please fill the form ", "warning");
        return;
      }
      (this.car.features = {
        seatsCount: 4.0,
        doorsCount: 4.0,
        kpl: 12.0,
      }),
        (this.car.city = "LA");
      (this.car.owner = {
        _id: this.loggedInUser._id,
        fullName: this.loggedInUser.fullName,
        imgUrl: this.loggedInUser.imgUrl,
      }),
        (this.car.reviews = []);
      this.$store.dispatch({ type: "saveCar", car: this.car });
      eventBus.$emit("sendSwal", "Listed", "success");
      this.resetCar();
      this.$refs.upload.clearFiles();
    },
    handleRemove(file, fileList) {
      var idx = this.car.imgsUrl.findIndex((img) => img.uid === file.raw.uid);
      this.car.imgsUrl.splice(idx, 1);
    },
    resetCar() {
      this.car = {
        tag: "",
        condition: "",
        model: "",
        vendor: {
          company: "",
          searies: "",
        },
        disabledDates: {
          ranges: []
        },
        price: 200,
        desc: "",
        imgsUrl: [],
      };
    },
  },
  computed: {
    years() {
      var years = [];
      for (var i = 1970; i < 2021; i++) {
        years.push({ value: i, label: i });
      }
      return years;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
<style>
</style>