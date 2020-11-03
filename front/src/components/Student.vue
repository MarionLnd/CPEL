<template>

  <div class="container">
     <Header />
    <div v-for="(mod, key) in moduleData" :key="key">
      <div class="card">
        <div class="container">
          <h1>{{ mod.name }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 400px;
  height: 100px;
  background-color: #84a9ac;
  margin-top: 100px;
}
.container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
<script>
import axios from "axios";
import Header from './Header';


export default {
  name: "modules",
  components:{
      Header
  },
  data() {
    return {
      moduleData: [],
    };
  },
  mounted() {
    axios.get("https://cpel.herokuapp.com/api/module/").then((response) => {
      console.log(response.data[0].name);

      this.moduleData = response.data;
      //this.data = response.data.data;
      console.log(this.moduleData);
    });
  },
};
</script>