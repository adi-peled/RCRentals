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
          <span>Sort By Model</span>
          <el-select
            class="select-type"
            @change="setFilter"
            v-model="filterBy.model"
            placeholder="Select"
          >
            <el-option
              v-for="item in modelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>Sort By Price</span>

          <el-select
            class="select-type"
            @change="setFilter"
            v-model="filterBy.price"
            placeholder="Select"
          >
            <el-option
              v-for="item in priceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
        price: "",
        available: ""
      },
      modelOptions: [
        {
          value: "asc",
          label: "Old To New"
        },
        {
          value: "desc",
          label: "New To Old"
        }
      ],
      priceOptions: [
        {
          value: "asc",
          label: "Low To High"
        },
        {
          value: "desc",
          label: "High To Low"
        }
      ],
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
  methods: {
    setFilter() {
      this.$emit("filter", this.filterBy);
    }
  },
  components: {}
};
</script>