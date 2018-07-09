<template>
  <div
    id="app"
    sticky-container
  >
    <header
      v-bind:class="['grid-middle-noGutter']"
      id="header"
    >

      <div class="col-12 grid-middle-noGutter background-wrapper">
        <div
          v-bind:class="['col-6_sm-10', 'title']"
          data-push-left="off-3_sm-1"
        >
          <h1>cityrent</h1>
          <p class="tagline">Average monthly rent costs from 540 cities around the world.</p>
        </div>
      </div>
    </header>

    <div class="grid-noGutter">
      <div
         class="col-12"
      >
        <div v-bind:class="['search', 'grid']"
             v-sticky
             sticky-offset="0"
             sticky-side="top"
        >
          <div
            class="col-6_sm-8"
            data-push-left="off-3_sm-2"
          >
            <vue-fuse
              class="searchbox"
              ref="searchBox"
              :keys="keys"
              :list="citiesData"
              :threshold="0.2"
              :minMatchCharLength="3"
              :shouldSort="false"
              inputChangeEventName="updatedSearch"
              eventName="fuseResultsUpdated"
              placeholder="Search for places..."
            >
            </vue-fuse>
          </div>
        </div>
      </div>

      <Cities :citiesData="results"/>
    </div>
  </div>
</template>

<script>
  import * as popmotion from 'popmotion'
  import Cities from './components/Cities.vue';
  import json from './json/data';

  export default {
    name: 'app',

    components: {
      Cities,
    },

    created: function () {
      this.$on('fuseResultsUpdated', (results) => {
        this.results = results;
      });
      this.$on('updatedSearch', (str) => {
        if (str.length >= 0 && str.length < 2) {
          this.hasSearch = false;
        } else {
          this.hasSearch = true;
          this.headerVisible = false;
        }
      });
    },

    data: function () {
      return {
        citiesData: json.data,
        keys: ['area', 'continent', 'country', 'lvl'],
        results: [],
        hasSearch: false,
        headerVisible: true,
        imgs: [
          'anthony-delanoix-28851-unsplash.jpg',
          'jesus-in-taiwan-478578-unsplash.jpg',
          'jonathan-riley-118591-unsplash.jpg',
          'joseph-albanese-102983-unsplash.jpg',
          'libby-penner-511572-unsplash.jpg',
          'mink-mingle-185518-unsplash.jpg',
          'roman-kraft-128742-unsplash.jpg',
          'roman-kraft-27340-unsplash.jpg',
        ],
      };
    },

    methods: {
      animateHeader: function (str) {
        let styler = popmotion.styler(document.querySelector('#header'));
        const convertToVh = popmotion.transform.appendUnit("vh");
        let fr, to;

        if (str === 'close'){
          fr = convertToVh(70);
          to = 0;
        } else if (str === 'open') {
          fr = 0;
          to = convertToVh(70);
        }

        popmotion.tween({
          from: fr,
          to: to,
          duration: 450,
          ease: popmotion.easing.anticipate,
        }).start(styler.set('height'));
      },
    },

    mounted: function () {
      const h = document.getElementById('header');
      const img = this.imgs[Math.floor(Math.random() * this.imgs.length)];
      h.style.backgroundImage = 'url(\'img/' +  img + '\')';

      this.$refs.searchBox.$el.focus();
    },

    watch: {
      headerVisible: function (nVal, oVal) {
        let vm = this;

        if (nVal !== oVal) {
          if (!nVal) {
            vm.animateHeader('close');
          } else {

            vm.animateHeader('open');
          }
        }
      }
    },
  };
</script>

<style lang="scss">
  body, #app {
    background: #FAFAFC;
    margin: 0;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #424242;
  }

  header {
    background: no-repeat center center fixed;
    background-size: cover;
    color: #424242;
    height: 70vh;
    margin-bottom: 1rem;

    .background-wrapper {
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(250, 250, 252, 1));
    }
  }

  .search {
    padding: 0.5rem 0;
    margin: 0;
    height: 3.5rem;
    width: 100%;
    background: #FAFAFC;
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);

    .searchbox {
      width: 100%;
      padding: 0.3rem 0.5rem;
      border: 0;
      border-bottom: 0.1rem solid;

      outline: none;
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
      font-size: 1.2rem;
      line-height: 1.5rem;
      background: transparent;
      color: #777777;

      &::placeholder {
        color: #cbcbdb;
      }
    }
  }
</style>
