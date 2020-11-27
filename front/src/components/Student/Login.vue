<template>
  <div class="container">
    <div class="card" style="float: left; margin-right: 10px">
      <div class="container">
        <form>
          <label>Numéro Professeur</label>
          <input type="text" id="professor" />
          <label>password</label>
          <input type="password" />
          <button @click.stop.prevent="submit()">Submit</button>
        </form>
        <h1> {{ msg }}</h1>
      </div>
    </div>
    <div class="card" style="float: right">
      <div class="container">
        <form>
          <label>Numéro Etudiant</label>
          <input type="text" id="student" />
          <label>password</label>
          <input type="password" id="studentPassword" />
          <button @click.stop.prevent="submit()">Submit</button>
        </form>
        <h1> {{ msg }}</h1>
      </div>
    </div>
  </div>
</template>

<style  scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.card {
  width: 500px;
  height: 400px;
  background-color: #84a9ac;
  margin-top: 100px;
}
button {
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #84a9ac;
}
form{
  margin-top: 30px;
}
h1{
  color: #8B0000;
}
</style>
<script>
import axios from "axios";

export default {
  name: "modules",
  data() {
    return {
      page: [],
      username:String,
      password: String,
      msg: String
    };
  },
  mounted (){
this.msg= ""
  },
  methods: {
    submit() {
    
  this.username=  document.getElementById("student").value;
  this.password= document.getElementById("studentPassword").value;
      axios.get("https://cpel.herokuapp.com/api/login/"+this.username+"/"+this.password).then((user) => {
       
        
        //response.data.forEach((user) => {
          console.log(user);
        
        /*  if (
            user.username === document.getElementById("student").value &&
            user.password === document.getElementById("studentPassword").value
          ) {*/
           
            if (user.data.userLogin.type === "student") {
              axios
                .get("https://cpel.herokuapp.com/api/students/")
                .then((response) => {
                   
                  console.log(response)
                  response.data.forEach((student) => {
                    this.$router.push("/course");
                    console.log("yes");
                    if (student.studentNumber === user.data.userLogin.username) {
                      this.$cookies.set("idStudent", student._id);
                      this.$cookies.set("username", user.data.userLogin.username);
                      this.$cookies.set("type", user.data.userLogin.type);
                      console.log(this.$cookies.get("type"));
                      console.log(this.$cookies.get("idStudent"));
                    }
                  });
                });
            } else {
              axios
                .get("https://cpel.herokuapp.com/api/professors/")
                .then((response) => {
                  response.data.forEach((prof) => {
                    this.$router.push("/course");
                    if (response._id === user.data.userLogin.username) {
                      this.$cookies.set("idProfessor", prof._id);
                      console.log(this.$cookies.get("idProfessor"));
                    }
                  });
                });
            }
         // }
       // });
      }).catch(error => {
      console.log("wesh")
       console.log(error.response)
       this.msg= error.response.data.error
      });

    },
  },
};
</script>
