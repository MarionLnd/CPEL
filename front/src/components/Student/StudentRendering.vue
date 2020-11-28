<template>
  <div class="container">
    <Header />

    <LeftMenu />
  
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Date de Rendu</th>
      <th scope="col">Exercices</th>
     
    </tr>
  </thead>
  <tbody v-for="item in studentRendering" :key="item">
    <tr>
      <th scope="row"> {{  format_date(item.date) }}  </th>
      <td @click="setCookie(item.idExercise)">{{ item.exerciseName }}</td>
    
    </tr>
    
   
  </tbody>
</table>
  </div>
</template>
<style scoped>
.card {
 
  background-color: #84a9ac;
  margin-top: 50px;
  margin-left: 30%;
}
td{
  cursor: pointer;
}
table{
  margin-left: 10%;
  background-color: azure;
  margin-top: 20px;
}
</style>
<script>
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import axios from "axios";
import moment from 'moment'
export default {
  name: "Notifications",
  components: {
    Header,

    LeftMenu,
  },
   //props: ['count'],
  data() {
      return{
     studentRendering: []
      }
   
  },
  mounted() {
     
    axios.get("https://cpel.herokuapp.com/api/students/"+this.$cookies.get("idStudent")+"/studentRenderings").then((response) => {
      response.data.forEach((renderings) => {
           console.log(renderings)
         axios.get("https://cpel.herokuapp.com/api/exercises/").then((response) => {
      response.data.forEach((exo) => {
           if(renderings.idExercise === exo._id){
               this.studentRendering.push({
                  exerciseName: exo.name,
                  idExercise: exo._id,
                  date: renderings.createdAt

               });
           }
        });
    });
      });
    });
     
  },
  methods:{
       setCookie(idExo){
       
      
       
       this.$router.push("/exerciceContent/"+idExo);
     },
    
   
     format_date(value){
         if (value) {
           return moment(String(value)).format('YYYY/MM/DD')
          }
      },
   
  
  }
};
</script>