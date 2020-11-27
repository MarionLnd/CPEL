<template>
  <div class="container">
    <Header />

    <LeftMenu />
    <p id="title">Profil</p>
    <div class="card mt-4">
      <div v-for="info in user" :key="info">
        <div class="card-header">
          <p class="card-title" id="subtitle">
            {{ info.lastName }} {{ info.firstName }}
          </p>
          <p class="card-subtitle text-muted">{{ info.type }}</p>
        </div>
        <div class="card-body text-left">
       
           <form>
                    <div class="form-group">
                        <label for="lastname">Nom:</label>
                        <input id="lastname" class="form-control" type="text" :placeholder="[[ info.lastName]]" disabled>
                    </div>

                    <div class="form-group">
                        <label for="firstname">Prénom:</label>
                        <input id="firstname" class="form-control" type="text" :placeholder="[[ info.firstName]]" disabled>
                    </div>
                     
                     <div class="form-group">
                        <label for="studentNumber">Numéro Etudiant:</label>
                        <input id="studentNumber" class="form-control" type="text" :placeholder="[[ info.studentNumber]]" disabled>
                    </div>

                     <div class="form-group">
                        <label for="group">Groupe:</label>
                        <input id="group" class="form-control" type="text" :placeholder="[[ info.group]]" disabled>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" class="form-control" type="text" :placeholder="[[ info.email]]" disabled>
                    </div>

                     <div class="form-group">
                        <label for="password">Mot de passe:</label>
                        <input id="password" class="form-control" type="password" >
                    </div>
                     
                      <div class="form-group">
                        
                        <button  class="form-control" type="password" @click="updatePassword(info.studentNumber)"> Modifier</button>
                    </div>

                </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-notifications/styles/material.css";
#title {
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
}
#subtitle {
  font-family: Georgia, serif;
  font-size: 19px;
  font-weight: bold;
}
.card {
    margin-left: 10%;
}
</style>
<script>
import axios from "axios";
import Header from "./Header";

import LeftMenu from "./LeftMenu";
export default {
  name: "Profile",
  components:  {
    Header,
  
    LeftMenu
   
  },
  data() {
    return {
      user: [],
    };
  },
  mounted() {
    console.log(this.$cookies.get("idStudent"));
    if (this.$cookies.get("type") === "student") {
      axios
        .get(
          "https://cpel.herokuapp.com/api/students/" +
            this.$cookies.get("idStudent")
        )
        .then((student) => {
         console.log(student)
          console.log("oups");
          axios
            .get("https://cpel.herokuapp.com/api/groups/" + student.data.idGroup)
            .then((group) => {
              this.user.push({
                lastName: student.data.lastname,
                firstName: student.data.firstname,
                studentNumber: student.data.studentNumber,
                email: student.data.email,
                username: this.$cookies.get("username"),
                group: group.data.name,
                type: "Etudiant",
              });
              console.log(this.user);
            });
        });
    } 
  },
  methods: {
    updatePassword(userID){
     
             axios
        .put(
          "https://cpel.herokuapp.com/api/user/"+userID,
          {
           
          
            content: document.getElementById("password").value,
           
          }
        )
        .then(function (response) {
          console.log(response);
         
        });
    }
  }
};
</script>

<style scoped>
</style>
