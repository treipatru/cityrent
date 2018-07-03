<template>
  <div class="">
      <div
          class="bracket-container"
          v-for="bracket, index in brackets"
          :key="index"
      >
          <h2
              class="bracket-price"
          >
              {{bracket}}
          </h2>

          <div class="city"
               v-for="city,index in filteredCities[index]"
               :key="index"
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

        for (let city of vm.citiesData) {
          const next = vm.brackets[index + 1];

          if (next) {
            if (city.cost >= val && city.cost < next) {
              bracketCities.push(city);
            }
          } else {
            if (city.cost >= val) {
              bracketCities.push(city);
            }
          }
        }
        return bracketCities;
      });
    },
  },
  data: function () {
    return {
      brackets: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 2000, 3000],
    };
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
