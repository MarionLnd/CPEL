<template>
  <div class="container">
    <Header />

    <LeftMenu />
    <div class="card">
         <h2 @click="setCookie()"> {{ message }} </h2>
    </div>
  </div>
</template>
<style scoped>
.card {
 
  background-color: #84a9ac;
  margin-top: 50px;
  margin-left: 30%;
}
</style>
<script>
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import axios from "axios";

export default {
  name: "notifs",
  components: {
    Header,

    LeftMenu,
  },
  data() {
      return{
 count: Number,
    newModule: [],
    newTD: [],
    newExercise: [],
    newCorrection: [],
    message: String,
    link: String
      }
   
  },
  mounted() {
      this.count = 0;
    axios.get("https://cpel.herokuapp.com/api/module/").then((response) => {
      response.data.forEach((mod) => {
           if (!this.newModule.includes(mod._id)) {
        this.newModule.push({
          modid: mod._id,
          moduleName: mod.name,
        });
         this.count ++;
         this.message = "Un nouveau Cours est disponible ";
        this.link = "/courseContent";
           }
       
      });
    });
      axios.get("https://cpel.herokuapp.com/api/td/").then((response) => {
      response.data.forEach((td) => {
          if (!this.newModule.includes(td._id)) {
        this.newTD.push({
          tdId: td._id,
          tdName: td.name,
        });
        this.count ++;
        this.message = "Un nouveau TD est disponible "
        this.link = "/exercise"

          }
      });
    });
     axios.get("https://cpel.herokuapp.com/api/exercise/").then((response) => {
      response.data.forEach((exo) => {
          if (!this.newExercise.includes(exo._id)) {
        this.newExercise.push({
          exerciseId: exo._id,
          exerciseName: exo.name,
        });
         this.message = "Un nouveau Exercice est disponible ";
        this.link = "/exerciceContent/";
        this.count ++;
          }
     
     axios.get("https://cpel.herokuapp.com/api/correction/").then((response) => {
      response.data.forEach((corr) => {
          if (exo._id === corr.idExercise) {
          if (!this.newCorrection.includes(corr._id)) {
        this.newCorrection.push({
          correctionId: corr._id,

          correctionCode: corr.correctionCode,
          exerciseName:exo.name
                            
        });
        this.message = "La Correction de l'exercise  '  "+ exo.name+"  'est disponible. Le Code de correction est : "+ corr.correctionCode;
        this.link = "/exerciceContent/"+exo._id;
        this.count ++;
          }
          }
      });
    });
     });
    });
  },
  methods:{
       setCookie(){
       
   
       
       this.$router.push(this.link);
     }
  }
};
</script>