<template>
  <section>
    <div class="filter-container flex">
      <div class="car-filter flex">
        <div>
          <span>Search Location</span>
          <input
            @change="setFilter"
            type="text"
            placeholder="enter city"
            class="location"
            v-model="filterBy.location"
          />
        </div>
        <div>
          <span>price:</span>
          <span>${{filterBy.rangePrice[0]}} - ${{filterBy.rangePrice[1]}}</span>

          <div class="block">
            <el-slider
              @change="setFilter"
              v-model="filterBy.rangePrice"
              range
              show-stops
              :max="3000"
            ></el-slider>
          </div>
        </div>
        <div>
          <span>model:</span>
          <span>{{filterBy.rangeModel[0]}} - {{filterBy.rangeModel[1]}}</span>

          <div class="block">
            <el-slider
              :min="2000"
              @change="setFilter"
              v-model="filterBy.rangeModel"
              range
              show-stops
              :max="2021"
            ></el-slider>
          </div>
        </div>
        <div>
          <span>Sort By Type</span>

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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "car-filter",
  data() {
    return {
      filterBy: {
        location: "",
        model: "",
        tag: "",
        rangePrice: [150, 1200],
        rangeModel: [2006, 2018],
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
    this.filterBy.tag = this.$route.params.category;
    this.setFilter();
  },
  methods: {
    setFilter() {
      this.$emit("filter", this.filterBy);
      console.log(this.$route.params.category);
      if (this.filterBy.tag === "") return;
      if (this.$route.params.category !== this.filterBy.tag) {
        this.$router.push(`${this.filterBy.tag}`);
      }
    }
  },
  components: {}
};
</script>