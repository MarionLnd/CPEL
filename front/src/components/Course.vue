<template>
  <div class="container">
    <Header />
     
    <div class="course" >
       <LeftDashboard />
      <div v-for="item in moduleData" :key="item">
        <div class="card">
          
   <p @click="setCookie(item.idmodule)">      {{ item.module }} </p>
            <br />
         
          {{ item.professor }}
          
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
      moduleData: [],
      
    };
  },
  mounted() {
       
     
    axios.get("https://cpel.herokuapp.com/api/module/").then((response) => {
      response.data.forEach((mod) => {
        axios
          .get("https://cpel.herokuapp.com/api/professor/")
          .then((response) => {
            response.data.forEach((prof) => {
              if (mod.idmodule === prof.idModule) {
                this.moduleData.push({
                  module: mod.name,
                  professor: prof.lastname,
                  idmodule:mod.idmodule
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
       this.$cookies.set("idcours",item);
       console.log(this.$cookies.get("idcours"));
       this.$router.push("/courseContent/"+this.$cookies.get("id"));
     }
   
  }
   
};
</script>