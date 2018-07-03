<template>
  <div class="">
    <vue-fuse
      :keys="keys"
      :list="citiesData"
      :threshold="0.4"
      event-name="fuseResultsUpdated"
    >
    </vue-fuse>

    <div
      v-bind:class="['bracket-container', 'lvl-' + (index + 1)]"
      v-for="(bracket, index) in brackets"
      :key="index"
      v-if="shouldRenderBracket(index)"
    >
      <h2
        class="bracket-price"
      >
        {{bracket}}
      </h2>

      <div
        class="city"
        v-for="(city,el) in filteredCities[index]"
        :key="el"
      >
        <span class="cost">{{city.cost}} </span>
        <span class="area">{{city.area}} </span>
        <span class="country">{{city.country}} </span>
        <span class="continent">{{city.continent}}</span>
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
  $colors-background:  #ffe17e #b66cf7 #00f18d #ff6fc5 #01af46
                       #b596ff #5ba300 #208fff #d9fc6b #ffa3c9
                       #75fbff #e05f3d #00adae #b9728b #95a872;

  .bracket-container {
    position: relative;

    @each $current-color in $colors-background {
      $i: index($colors-background, $current-color);
      &.lvl-#{$i} {
        background: $current-color;
        color: #424242;
        padding: 1.3rem 0 1.5rem 0;
      }
    }

    .bracket-price {
      text-align: left;
      margin: 0;
      padding: 0;
      position: absolute;
      left: 0.5rem;
      top: 1rem;
    }

    .city {
    }
  }
</style>
