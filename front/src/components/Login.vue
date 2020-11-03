<template>
    <div class="container">
    
      <div class="card" style="float:left; margin-right: 10px" >

        <div class="container">
           <form >
               <label>ID</label>
               <input type="text" id="professor">
               <label>password</label>
               <input type="text">
               <button @click.stop.prevent="submit()"> Submit </button>
           </form>
        </div>
      </div>
      <div class="card" style="float:right;">
 
        <div class="container">
            <form>
               <label>ID</label>
               <input type="text" id="student">
               <label>password</label>
               <input type="text">
              <button @click.stop.prevent="submit()"> Submit </button>
           </form>
        </div>
      </div>
    </div>


   
</template>

<style  scoped>
  input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
   .card{
      width:500px;
      height:400px; 
      background-color:#84A9AC;
      margin-top: 100px;
     }
     button{
       width: 50%;
       padding: 12px 20px;
       margin: 8px 0;
       display: inline-block;
       border: 1px solid #ccc;
       border-radius: 4px;
       box-sizing: border-box;
       background-color:#84A9AC;
     }
</style>
<script>
import axios from "axios";

export default {
  name: "modules",
  data() {
    return {
      page: [],
    };
  },
  methods: {
   submit(){
 
    axios.get("https://cpel.herokuapp.com/api/student/").then((response) => {
      console.log("ok");
     response.data.forEach((value)=> {
        
        
          console.log(document.getElementById("student").value);
         if(value.idStudent === document.getElementById("student").value){
           console.log("ok");
          
              this.$router.push("/course");
         }
   });
    
    });
    }
  },
};
</script>
