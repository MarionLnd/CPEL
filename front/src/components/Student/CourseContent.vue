<template>
  <div class="container">
   <Header />
      
      <LeftMenu/>

    <div v-for="item in moduleData" :key="item">
     <h1>
        {{ item.module }}
     </h1>
      <div class="card">
        <a :href=   item.content  download>{{ item.module }}</a>
       
      </div>
    </div>
  </div>
</template>
   
  
<style scoped>
.card {

 margin-top: 5%;
  margin-left: 20%;
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
h1 {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-left: 30%;
}
</style>
<script>
import axios from "axios";
import Header from "./Header";
import LeftMenu from "./LeftMenu";

export default {
  name: "modules",
   components: {
    Header,
   LeftMenu
  },

  data() {
    return {
      moduleData: [],
    };
  },
  mounted() {
    axios.get("https://cpel.herokuapp.com/api/modules/").then((response) => {
      response.data.forEach((mod) => {
        if (mod._id === this.$route.params.id)
          this.moduleData.push({
            module: mod.name,

            content: mod.content,
          });
          console.log(mod.content)
      });
    });
  },
};
</script>