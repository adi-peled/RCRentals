<template>
  <section>
    <div class="car-filter flex  align-center">

        <div class="type" >
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
        <div >
          <div class="block flex align-center">
            <span class="min">min:{{filterBy.rangePrice[0]}}$</span>
            <el-slider
              class="el-slider"
              @change="setFilter"
              v-model="filterBy.rangePrice"
              range
              show-stops
              :max="3000"
            ></el-slider>
            <span>max:{{filterBy.rangePrice[1]}}$</span>
          </div>
         
        </div>

        <div >

          <div class="block flex flex align-center">
            <span class="min">min:2000</span>
            <el-slider
              class="el-slider"
              :min="1970"
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
        rangeModel: [1970, 2021],
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
      this.$emit("filter", this.filterBy);
    },

  },
  components: {}
};
</script>