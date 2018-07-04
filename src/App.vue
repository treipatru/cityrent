<template>
  <div id="app">
    <Cities :citiesData="citiesData"/>
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
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #424242;
}
</style>
