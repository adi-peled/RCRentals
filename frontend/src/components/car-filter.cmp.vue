<template>
  <section>
    <div class="car-filter grid">
      <div>
      <button @click="close" class="close-btn">X</button>
        <div class="flex align-center space-between column">
          <div class="min">Price:</div>
          <div class="flex align-center">
            <span>min:${{filterBy.rangePrice[0]}}</span> 
            <el-slider
              class="el-slider"
              @change="setFilter"
              v-model="filterBy.rangePrice"
              range
              show-stops
              :max="3000"
            ></el-slider>
            <div class="max">max:${{filterBy.rangePrice[1]}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex align-center column">
          <div class="min">Model:</div>
          <div class="flex align-center">
           <span>min:1970</span> 
            <el-slider
              class="el-slider"
              :min="1970"
              @change="setFilter"
              v-model="filterBy.rangeModel"
              range
              show-stops
              :max="2021"
            ></el-slider>
            <div class="max">max: 2021</div>
          </div>
        </div>
      </div>
       <div class="search-location">
        <div>Search city:</div>
        <input @change="setFilter" type="text" placeholder="enter city" v-model="filterBy.city" />
      </div>

      <div class="type">
        <div>Type:</div>
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
  </section>
</template>

<script>
export default {
  name: "car-filter",
  data() {
    return {
      filterBy: {
        sortType: "",
        model: "",
        tag: "",
        city: "",
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
          value: "sport",
          label: "Sport"
        },
        {
          value: "converitible",
          label: "Converitible"
        },
        {
          value: "SUV",
          label: "SUV"
        },
        {
          value: "trucks",
          label: "Trucks"
        },
        {
          value: "custom",
          label: "Custom"
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
    if (!this.$route.params.category) {
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
      close() {
        this.$emit('close');
      }
  },
  components: {}
};
</script>