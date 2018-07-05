<template>
  <div
    id="app"
    class="grid"
  >
    <header
      v-bind:class="['col-12', 'grid-middle-noGutter', { 'small' : searched}]"
    >

      <transition name="fade">
        <div
          class="title col-6_sm-10"
          data-push-left="off-3_sm-1"
          v-if="!searched"
        >
          <h1>cityrent</h1>
          <p class="tagline">Average monthly rent costs from 540 cities around the world.</p>
        </div>
      </transition>
    </header>

    <Cities
      :citiesData="citiesData"
      v-on:hasSearchStr="hasSearchStr"
    />
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
    data: function () {
      return {
        citiesData: json.data,
        searched: false,
      };
    },
    methods: {
      hasSearchStr: function (val) {
        this.searched = val;
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity 200ms;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  header {
    min-height: 50vh;
    transition: min-height 350ms ease-out;

    &.small {
      min-height: 0;
    }

    .title {
      h1 {
        margin: 0;
        padding: 0;
      }
      .name {
        font-size: 2rem;
      }
      .tagline {
        font-size: 1rem;
      }
    }
  }
</style>
