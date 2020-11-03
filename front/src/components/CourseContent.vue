<template>
  <div class="container">
    <Header />

    <div v-for="item in moduleData" :key="item">
      <div class="card">
        {{ item.module }}
      </div>
      <div class="content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>


<style scoped>
.card {
  width: 60%;
  height: 50px;
  background-color: #84a9ac;
  margin-left: 50%;
}
.content{
  margin-top: 5%;
  text-align: center;
}
.container {
  margin-left: 0px;
}
#deconexion {
  position: absolute;
  bottom: 0px;
}
</style>
<script>
import axios from "axios";
//import Header from "./Header";
//import LeftDashboard from "./LeftDashboard";
export default {
  name: "modules",

  data() {
    return {
      moduleData: [],
    };
  },
  mounted() {
    axios.get("https://cpel.herokuapp.com/api/module/").then((response) => {
      response.data.forEach((mod) => {
        if (mod.idmodule === this.$route.params.id)
          this.moduleData.push({
            module: mod.name,

            content: mod.content,
          });
      });
    });
  },
};
</script>