<template>
  <div class="container">
    <Header />

    <LeftMenu />
   
   
    <!--div class="card">
         <h2 @click="setCookie()"> {{ message }} </h2>
    </div-->

		<!--a href="https://python.sdv.univ-paris-diderot.fr/cours-python.pdf" download="download">Download</a-->
    <!--pdf src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf" ></pdf-->

    <table class="table">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Notifications</th>
     
    </tr>
  </thead>
  <tbody v-for="item in message" :key="item">
    <tr>
      <th scope="row"> {{  item.date }}  </th>
      <td @click="setCookie(item.link)">{{ item.msg }}</td>
    
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
}
</style>
<script>
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import axios from "axios";
import moment from 'moment';
//import pdf from 'vue-pdf';

export default {
  name: "Notifications",
  components: {
    Header,

    LeftMenu,
   // pdf
  },
   //props: ['count'],
  data() {
      return{
  count: Number,
  
    message: [],
    link: String,
    sortKey: '',
    sortSettings: [
            { 'date': true },
          
          ],
        desc: true
      }
   
  },
  mounted() {
      this.count = 0;
    axios.get("https://cpel.herokuapp.com/api/modules/").then((response) => {
      response.data.forEach((mod) => {
           if (!this.message.includes(mod._id)) {
      
        
         this.message.push({
          msg:"Un nouveau Cours est disponible ",
          modid: mod._id,
          date: moment(mod.createdAt).format('YYYY/MM/DD'),
          link:"/courseContent"
        });
       //  this.message = "Un nouveau Cours est disponible ";
        //this.link = "/courseContent";
           }
       
      });
    });
      axios.get("https://cpel.herokuapp.com/api/tds/").then((response) => {
      response.data.forEach((td) => {
          if (!this.message.includes(td._id)) {
        this.newTD.push({
          tdId: td._id,
          tdName: td.name,
        });
        this.$cookies.set("idTD",td._id )
        this.count ++;
        this.message.push({
          msg:"Un nouveau TD est disponible ",
          tdId: td._id,
          date: moment(td.createdAt).format('YYYY/MM/DD'),
          link : "/exercise"
        });
       
      //  this.message = "Un nouveau TD est disponible "
       // this.link = "/exercise"

          }
      });
    });
     axios.get("https://cpel.herokuapp.com/api/exercises/").then((response) => {
      response.data.forEach((exo) => {
        console.log(exo.createdAt)
          if (!this.message.includes(exo._id)) {
        this.message.push({
          exerciseId: exo._id,
          msg:"Un nouveau Exercice est disponible ",
          exerciseName: exo.name,
          date: moment(String(exo.createdAt)).format('YYYY/MM/DD') ,
          link : "/exerciceContent/"+exo._id
        });
        console.log(this.message)
      //   this.message = "Un nouveau Exercice est disponible ";
       // this.link = "/exerciceContent/";
        this.count ++;
          }
     
     axios.get("https://cpel.herokuapp.com/api/corrections/").then((response) => {
      response.data.forEach((corr) => {
          if (exo._id === corr.idExercise) {
          if (!this.message.includes(corr._id)) {
       /* this.newCorrection.push({
          correctionId: corr._id,

          correctionCode: corr.correctionCode,
          exerciseName:exo.name,
                 
        });*/
        this.message.push({
          msg: "La Correction de l'exercise  '  "+ exo.name+"  'est disponible. Le Code de correction est : "+ corr.correctionCode,
          correctionId: corr._id,
          date: moment(corr.createdAt).format('YYYY/MM/DD'),
          link:"/exerciceContent/"+exo._id
        });
       // this.message = "La Correction de l'exercise  '  "+ exo.name+"  'est disponible. Le Code de correction est : "+ corr.correctionCode;
       // this.link = "/exerciceContent/"+exo._id;
        this.count ++;
         console.log(corr.createdAt.date())
          }
          }
      });
    });
     });
     this.message.sort((a, b) => new Date(a.date) - new Date(b.date));
     console.log(this.message)

    
    });
   
  },
  methods:{
       setCookie(link){
       
      
       console.log(link)
       this.$router.push(link);
     },
    
   
     format_date(value){
         if (value) {
           return moment(String(value)).format('YYYY/MM/DD')
          }
      },
      orderBy: function(sorKey) {
            this.sortKey = sorKey
            this.sortSettings[sorKey] = !this.sortSettings[sorKey]
            this.desc = this.sortSettings[sorKey]
            
        }
   
  
  }
};
</script>