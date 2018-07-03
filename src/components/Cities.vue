<template>
  <div class="">
      <vue-fuse
          :keys="keys"
          :list="citiesData"
          :defaultAll="true"
          :threshold="0.2"
          event-name="fuseResultsUpdated"
      >
      </vue-fuse>

      <div
          class="bracket-container"
          v-for="bracket, index in brackets"
          v-if="shouldRenderBracket(index)"
          :key="index"
      >
          <h2
              class="bracket-price"
          >
              {{bracket}}
          </h2>

          <div
              class="city"
              v-for="city,el in filteredCities[index]"
              :key="el"
          >
              <p>{{city.cost}} - {{city.area}}, {{city.country}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Cities',
  computed: {
    filteredCities: function () {
      let vm = this;

      return vm.brackets.map((val, index) => {
        let bracketCities = [];

        for (let city of vm.results) {
          const next = vm.brackets[index + 1];
          // It's a bit dense because we're doing multiple checks to eliminate
          // redundant iterations.
          if (next && city.cost >= val) {
            if (city.cost >= val && city.cost < next) {
              bracketCities.push(city);
            } else if (city.cost >= next) {
              break;
            }
          } else if (!next && city.cost >= val) {
            bracketCities.push(city);
          }
        }
        return bracketCities;
      });
    },
  },

  created: function () {
    this.$on('fuseResultsUpdated', (results) => {
      this.results = results;
    });
  },

  data: function () {
    return {
      brackets: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 2000, 3000],
      keys: ['cost', 'area', 'continent', 'country'],
      results: [],
    };
  },

  methods: {
    shouldRenderBracket: function (i) {
      return this.filteredCities[i].length !== 0;
    },
  },

  props: {
    citiesData: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style scoped lang="scss">
.bracket-container {
    position: relative;

    .bracket-price {
        text-align: left;
        margin: 0;
        padding: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>
