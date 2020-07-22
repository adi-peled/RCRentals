<template>
  <section>
    <div class="car-filter flex col align-center">
      <div class="btns flex">
        <button @click="toggleTypeSort">Type</button>
        <button @click="togglePriceSort">Price</button>
        <button @click="toggleModelSort">Model</button>
        <!-- <button @click="toggleFiltersort">Filter</button> -->
      </div>
      <div class="sorts flex col align-center"  v-if="sort.seeType||sort.seePrice||sort.seeModel">
        <!-- <div >
            <span>Search Location</span>
            <input
              @change="setFilter"
              type="text"
              placeholder="enter city"
              class="location"
              v-model="filterBy.location"
            />
        </div>-->
        <div class="type" v-if="sort.seeType">
          <span>Type:</span>
          <el-select
            class="select-type"
            @change="setFilter"
            v-model="filterBy.tag"
            placeholder="Select"
          >
            <el-option
              class="capi"
              v-for="item in tagsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div v-if="sort.seePrice">
          <span>Price range: ${{filterBy.rangePrice[0]}} - ${{filterBy.rangePrice[1]}}</span>
          <div class="block flex align-center">
            <el-slider
              class="el-slider"
              @change="setFilter"
              v-model="filterBy.rangePrice"
              range
              show-stops
              :max="3000"
            ></el-slider>
          </div>
          <div class="flex space-between">
            <span class="min">min:{{filterBy.rangePrice[0]}}$</span>
            <span>max:{{filterBy.rangePrice[1]}}$</span>
          </div>
        </div>

        <div v-if="sort.seeModel">
          <span>Model: {{filterBy.rangeModel[0]}} - {{filterBy.rangeModel[1]}}</span>

          <div class="block flex flex align-center">
            <span class="min">min:2000</span>
            <el-slider
              class="el-slider"
              :min="2000"
              @change="setFilter"
              v-model="filterBy.rangeModel"
              range
              show-stops
              :max="2021"
            ></el-slider>
            <span>max: 2021</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "car-filter",
  data() {
    return {
      sort: {
        seePrice: false,
        seeModel: false,
        seeType: false
      },
      filterBy: {
        location: "",
        model: "",
        tag: "",
        rangePrice: [0, 3000],
        rangeModel: [2000, 2021],
        available: ""
      },
      tagsOptions: [
        {
          value: "",
          label: "All"
        },
        {
          value: "exotic",
          label: "Exotic"
        },
        {
          value: "classic",
          label: "Classic"
        },
        {
          value: "minivan",
          label: "Minivan"
        },
        {
          value: "vans",
          label: "Vans"
        },
        {
          value: "trucks",
          label: "Trucks"
        }
      ]
    };
  },
  computed: {
    cars() {
      return this.$store.getters.cars;
    }
  },
  created() {
    console.log(this.$route.params.category);
    if (!this.$route.params.category) {
      console.log("noda");
      this.filterBy.tag = "";
    } else {
      this.filterBy.tag = this.$route.params.category;
    }
    this.setFilter();
  },
  methods: {
    setFilter() {
      console.log(this.filterBy);
      this.$emit("filter", this.filterBy);
    },
    togglePriceSort() {
      this.sort.seePrice = !this.sort.seePrice;
    },
    toggleModelSort() {
      this.sort.seeModel = !this.sort.seeModel;
    },
    toggleTypeSort() {
      this.sort.seeType = !this.sort.seeType;
    },
    toggleFiltersort() {
      this.sort.seeType = !this.sort.seeType;
      this.sort.seeModel = !this.sort.seeModel;
      this.sort.seePrice = !this.sort.seePrice;
    }
  },
  components: {}
};
</script>