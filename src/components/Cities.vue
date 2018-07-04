<template>
  <div class="grid">
    <div class="col-12 search">
      <vue-fuse
        :keys="keys"
        :list="citiesData"
        :threshold="0.2"
        :tokenize="true"
        :matchAllTokens="true"
        :findAllMatches="true"
        :minMatchCharLength="3"
        :location="0"
        :distance="100"
        :maxPatternLength="32"
        eventName="fuseResultsUpdated"
      >
      </vue-fuse>
    </div>


    <div class="col-12">
      <div
        v-bind:class="['bracket-container', 'grid', 'lvl-' + (index + 1)]"
        v-for="(bracket, index) in brackets"
        :key="index"
        v-if="shouldRenderBracket(index)"
      >
        <div class="col-1">
          <h2
            class="bracket-price"
          >
            {{bracket}}
          </h2>
        </div>

        <div class="col-11 grid-2_sm-1">
          <div
            :class="['city', 'col']"
            v-for="(city,el) in filteredCities[index]"
            :key="el"
          >
            <div class="title">
              <span class="area">{{city.area}}</span>
              <span class="cost"><sup>{{city.cost}}</sup></span>
            </div>
            <div class="location">
              <span class="country">{{city.country}}, </span>
              <span class="continent">{{city.continent}}</span>
            </div>
          </div>
        </div>
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
        let filtered = vm.brackets.map( () => []);

        for (let city of vm.results) {
          for (let i in vm.brackets) {
            i = parseInt(i);

            if((i + 1) === vm.brackets.length) {
              if (city.cost >= vm.brackets[i]) {
                filtered[i].push(city)
              }
            } else {
              if (city.cost >= vm.brackets[i] && city.cost < vm.brackets[i + 1]) {
                filtered[i].push(city)
              }
            }
          }
        }

        return filtered;
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
        keys: ['area', 'continent', 'country'],
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
    }

    .city {

      .title {
        padding-bottom: 0.3rem;

        .area {
          font-size: 1.4rem;
          padding-right: 0.3rem;
        }
        .cost {
          font-size: 0.8rem;
          font-weight: 300;
          opacity: 0.8;
        }
      }

      .location {
        font-size: 0.9rem;
        opacity: 0.6;

        .country {
        }
      }
    }
  }
</style>
