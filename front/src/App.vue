<template>
  <div id="app">
      <Header />
      <!--<HeaderAdmin />-->
      <router-view />
    </div>
  </template>

  <script>
  import Header from './components/Professsors/Header.vue'
  //import HeaderAdmin from './components/Admin/Header.vue'

  export default {
    name: 'App',
    components: {
        Header,
        //HeaderAdmin
    }
  }
  </script>

  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
