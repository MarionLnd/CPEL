<template>

  <div id="app">
   
    <router-view />
  </div>
</template>

<script>
//import Header from './components/Login';

export default {
  name: 'App',
  components: {
   // Header
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
  background-color: #C2DBDB;
  min-height: 100%;
 
  
}
body,html{
background-color: #C2DBDB;
min-height: 100%;
}
</style>
