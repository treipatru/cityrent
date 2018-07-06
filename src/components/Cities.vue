<template>
  <div
    class="col-12"
    id="cities-cont"
    sticky-container
  >
    <div
      v-bind:class="['toolbar', 'grid-noGutter']"
      v-sticky
      sticky-offset="offset"
      sticky-side="top"
    >
      <div
        class="col-6_sm-10"
        data-push-left="off-3_sm-1"
      >
        <vue-fuse
          class="searchbox"
          ref="searchBox"
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
          inputChangeEventName="updatedSearch"
          eventName="fuseResultsUpdated"
          placeholder="Search for places..."
        >
        </vue-fuse>
      </div>
    </div>


    <div
      v-bind:class="['bracket-wrapper']"
    >
      <div
        v-bind:class="['bracket-container', 'grid', 'lvl-' + (index + 1)]"
        v-for="(bracket, index) in brackets"
        :key="index"
        v-show="shouldRenderBracket(index)"
      >
        <div class="col-1_xs-2_sm-2">
          <h2
            class="bracket-price"
          >
            ${{bracket}}
          </h2>
        </div>

        <div class="col-11_xs-10_sm-10 grid">
          <div
            :class="['city', 'col-4_xs-12_sm-6']"
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
  import _throttle from 'lodash.throttle';

  export default {
    name: 'Cities',

    computed: {
      filteredCities: function () {
        let vm = this;
        let filtered = vm.brackets.map(() => []);

        for (let city of vm.results) {
          for (let i in vm.brackets) {
            i = parseInt(i);

            if ((i + 1) === vm.brackets.length) {
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
      this.$on('updatedSearch', (str) => {
        if (str.length > 0 && str.length < 3) {
          console.log('waiting');
        } else {
          console.log('triggered');
        }
      });
    },

    data: function () {
      return {
        brackets: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 2000, 3000],
        keys: ['area', 'continent', 'country'],
        results: [],
        isFixed: false,
        searched: false,
      };
    },

    methods: {
      shouldRenderBracket: function (i) {
        return this.filteredCities[i].length !== 0;
      },
    },

    mounted: function () {
      this.$refs.searchBox.$el.focus();
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
  $colors-background: #ffe17e #b66cf7 #00f18d #ff6fc5 #01af46 #b596ff #5ba300 #208fff #d9fc6b #ffa3c9 #75fbff #e05f3d #00adae #b9728b #95a872;

  .toolbar {
    padding: 0.5rem 0;
    margin: 0;
    height: 3.5rem;
    background: #FAFAFC;
    width: 100%;

    .searchbox {
      width: 100%;
      padding: 0.3rem 0.5rem;
      border: 0;
      border-bottom: 0.1rem solid;

      outline: none;
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
      font-size: 1.2rem;
      line-height: 1.5rem;
      background: #FAFAFC;
      color: #3c3c44;

      &::placeholder {
        color: #797C86;
      }

    }
  }

  .bracket-wrapper {
    margin-top: 2rem;

    .bracket-container {
      @each $current-color in $colors-background {
        $i: index($colors-background, $current-color);
        &.lvl-#{$i} {
          background: rgba(red($current-color), green($current-color), blue($current-color), 0.5);
          color: #424242;
          padding: 1.3rem 0 1.5rem 0;
        }
      }

      .bracket-price {
        text-align: center;
        margin: 0;
        padding: 0;
      }

      .city {
        @media (max-width: 576px) {
          text-align: center;
        }

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
  }
</style>
