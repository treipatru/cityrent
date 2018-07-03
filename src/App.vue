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
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
