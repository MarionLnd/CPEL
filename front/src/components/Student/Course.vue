<template>
  <div class="container">
   
  
    <Header />
  <LeftMenu />
     <h1>Modules</h1>
    <div class="course" >
     
      <div v-for="item in moduleData" :key="item">
        <div class="card">
    
   <p @click="setCookie(item.idmodule)" id="title"> {{ item.module }} </p>
            <br />
         
       <p id="subtitle">   {{ item.professor }}</p>
          
        </div>
      </div>
    </div>
   
  </div>
</template>


<style scoped>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-notifications/styles/material.css";

#first{
  margin-top: 50px;
}
.badge-block .e-badge.leftTop {
  transform: translateX(-150%);
}
h1{
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-left: 30%;
}
#title{
  font-family: Georgia, serif;
  font-size: 19px;
  font-weight: bold;
  cursor: pointer;
  
}
#subtitle{
  font-size: 19px;
  
}

.card {
  width: 400px;
  height: 100px;
  background-color: #84a9ac;
  margin-top: 50px;
 margin-left: 50%;
  
}

a{
  color: #4E4E4E;
}
a:focus{
  color: #2F7777 ;
}
.course{
  display: flex;
   flex-wrap: wrap;
  justify-content: space-around;
   
 
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
        console.log(mod)
        axios
          .get("https://cpel.herokuapp.com/api/professors/")
          .then((response) => {
           
            response.data.forEach((prof) => {
              console.log(mod._id +"     and    " +prof.idModule)
              if (mod._id === prof.idModule) {
               console.log("test")
                this.moduleData.push({
                  module: mod.name,
                  professor: prof.lastname,
                  idmodule:mod._id,
                });
                
                 console.log(this.moduleData)
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
       this.$router.push("/courseContent/"+this.$cookies.get("idcours"));
     }
   
  }
   
};
</script>