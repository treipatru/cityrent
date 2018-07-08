<template>
    <div
      v-bind:class="['col-12', 'grid']"
      id="cities-cont"
    >
      <div
        v-bind:class="getLvl(city.cost)"
        v-for="(city,el) in citiesData"
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
</template>

<script>
  export default {
    name: 'Cities',

    computed: {
    },

    data: function () {
      return {
        brackets: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 2000, 3000],
      };
    },

    methods: {
      getLvl: function (cost) {
        let vm = this;
        let lvl = null;

        for (let i in vm.brackets) {
          i = parseInt(i);
          if (vm.brackets[i + 1] && cost >= vm.brackets[i] && cost < vm.brackets[i + 1]) {
            lvl = i + 1;
          } else if (cost >= vm.brackets[i]) {
            lvl = i + 1;
          }
        }

        return ['city', 'col-4_xs-12_sm-6', ('lvl-' + lvl)];
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


<style lang="scss">
  $colors-background: #ffe17e #b66cf7 #00f18d #ff6fc5 #01af46 #b596ff #5ba300 #208fff #d9fc6b #ffa3c9 #75fbff #e05f3d #00adae #b9728b #95a872;

  #cities-cont {
    padding: 0;

    .city {
      @each $current-color in $colors-background {
        $i: index($colors-background, $current-color);
        &.lvl-#{$i} {
          background: rgba(red($current-color), green($current-color), blue($current-color), 0.5);
        }
      }
      padding: 1.3rem 1.5rem;
      color: #424242;

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
</style>
