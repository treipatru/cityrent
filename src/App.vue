<template>
  <div
    id="app"
    sticky-container
  >
    <header
      v-bind:class="['grid-middle-noGutter']"
      id="header"
    >

      <div
        v-bind:class="['col-6_sm-10', 'title']"
        data-push-left="off-3_sm-1"
      >
        <h1>cityrent</h1>
        <p class="tagline">Average monthly rent costs from 540 cities around the world.</p>
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
            class="col-6"
            data-push-left="off-3_sm-1"
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

      <Cities
        :citiesData="results"
        v-on:hasSearchStr="hasSearchStr"
      />
    </div>
  </div>
</template>

<script>
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
        if (str.length >= 0 && str.length < 3) {
          this.$emit('hasSearchStr', false);
        } else {
          this.$emit('hasSearchStr', true);
        }
      });
    },

    data: function () {
      return {
        citiesData: json.data,
        keys: ['area', 'continent', 'country', 'lvl'],
        results: [],
        searched: false,
        headerClosed: false,
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
      hasSearchStr: function (val) {
        this.searched = val;
        if (val) { this.headerClosed = true}
      }
    },

    mounted: function () {
      const h = document.getElementById('header');
      const img = this.imgs[Math.floor(Math.random() * this.imgs.length)];
      h.style.backgroundImage = 'url(\'img/' +  img + '\')';

      this.$refs.searchBox.$el.focus();
    }
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
    height: 70vh;
  }

  .search {
    padding: 0.5rem 0;
    margin: 0;
    height: 3.5rem;
    width: 100%;
    background: #FAFAFC;

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
      color: #3c3c44;

      &::placeholder {
        color: #797C86;
      }
    }
  }
</style>
