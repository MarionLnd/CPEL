<template>
  <div class="container">
    <Header />
     <LeftMenu />
     <h1> Exercices </h1>
     <h3>A Rendre Avant {{  format_date(date) }}</h3>
    <div class="course" >
     
      <div v-for="item in exoData" :key="item">
       
        <div class="card">
          
         <p @click="setCookie(item.idexercise)" id="title">  {{ item.exercice }}    </p>
            <br />
         <p id="subtitle">{{ item.wording }} </p> 
        </div>
        </div>
    
    </div>
   
  </div>
</template>


<style scoped>
#first{
  margin-top: 50px;
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
h4{
  color: #2F7777;
}
h1 {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-left: 30%;
}
h3{
  margin-left: 30%;
}

.card {
  width: 400px;
  height: 300px;
  background-color: #84a9ac;
   margin-top: 50px;
 margin-left: 50%;
 
  
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
h4{
  color: black;
}
</style>
<script>
import axios from "axios";
import Header from "./Header";
//import LeftDashboard from "./LeftDashboard";
import LeftMenu from "./LeftMenu";
import moment from 'moment'

export default {
  name: "modules",
  components: {
    Header,
   LeftMenu
 
  },
  data() {
    return {
      exoData: [],
      date: Date
    };
  },
  mounted() {
       
     
    axios.get("https://cpel.herokuapp.com/api/exercises/"+this.$cookies.get("idTD")).then((response) => {
      response.data.forEach((exo) => {
       
        axios
          .get("https://cpel.herokuapp.com/api/tds/"+this.$cookies.get("idTD"))
          .then((td) => {
           // response.data.forEach((td) => {
   console.log(td)
           
   
                this.exoData.push({
                  td: td.data.name,
                  exercice: exo.name,
                  idexercise:exo._id,
                  wording:exo.wording,
                 
                });
                this.date= td.data.dateLimit
                console.log(this.date)
                console.log(this.exoData)
              
            });
          });
    // });
    });
      
    axios.get("https://cpel.herokuapp.com/api/exercises/").then((response) => {
      response.data.forEach((exo) => {
       
        axios
          .get("https://cpel.herokuapp.com/api/tds/"+this.$cookies.get("idTD"))
          .then((td) => {
            console.log(exo)
           // response.data.forEach((td) => {
             if(exo.idTD === this.$cookies.get("idTD")){
  
           
   
                this.exoData.push({
                  td: td.data.name,
                  exercice: exo.name,
                  idexercise:exo._id,
                  wording:exo.wording,
                 
                });
                this.date= td.data.dateLimit
                console.log(this.date)
                console.log(this.exoData)
            
             }
  
            });
          });
    // });
    });
 
  },
  methods : {
   
     setCookie(item){
         // it sets the cookie called `username`
       this.$cookies.set("idexercice",item);
       console.log(this.$cookies.get("idexercice"));
       this.$router.push("/exerciceContent/"+this.$cookies.get("idexercice"));
     },
     format_date(value){
         if (value) {
           return moment(String(value)).format('YYYY/MM/DD')
          }
      },
   
  }
   
};
</script>