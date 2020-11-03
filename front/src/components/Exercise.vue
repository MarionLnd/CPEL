<template>
  <div class="container">
    <Header />
     
    <div class="course" >
       <LeftDashboard />
      <div v-for="item in exoData" :key="item">
       
        <div class="card">
          
         <p @click="setCookie(item.idexercise)">      {{ item.module }} </p>
            <br />
         
          {{ item.exercice }}
          
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

.course{
  display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
 
}
.container {
   
  margin-left: 0%;
}
#deconexion {
  position: absolute;
  bottom: 0px;
}
</style>
<script>
import axios from "axios";
import Header from "./Header";
import LeftDashboard from "./LeftDashboard";


export default {
  name: "modules",
  components: {
    Header,
 LeftDashboard
  },
  data() {
    return {
      exoData: [],
      
    };
  },
  mounted() {
       
     
    axios.get("https://cpel.herokuapp.com/api/exercise/").then((response) => {
      response.data.forEach((exo) => {
        console.log(exo);
        axios
          .get("https://cpel.herokuapp.com/api/module/")
          .then((response) => {
            response.data.forEach((mod) => {
              if (mod.idmodule === exo.idModule) {
                this.exoData.push({
                  module: mod.name,
                  exercice: exo.name,
                  idexercise:exo.idExercise
                });
              }
            });
          });
      });
    });
  },
  methods : {
   
     setCookie(item){
         // it sets the cookie called `username`
       this.$cookies.set("idexercice",item);
       console.log(this.$cookies.get("idexercice"));
       this.$router.push("/exerciceContent/"+this.$cookies.get("idexercice"));
     }
   
  }
   
};
</script>