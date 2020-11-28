<template>
  <div>
    <ClosePoint></ClosePoint>

    <Sidebar>
      <h4><router-link class="nav-link" to="/course">Cours </router-link></h4>
      <br />
      <h4>
        <router-link class="nav-link" to="/td"> TDs </router-link>
      </h4>
      <br />
       <h4>
        <router-link class="nav-link" to="/rendering"
          >Exercices Rendu
        </router-link>
      </h4>
    
    
  
    </Sidebar>
  </div>
</template>
<style scoped>
a {
  color: #4e4e4e;
}
a:focus {
  color: #2f7777;
}

.nav-link {
  position: relative;
  display: inline-block;
  margin: 10px 13px 10px 10px;
}
.badge-block .e-badge.leftTop {
  transform: translateX(-150%);
}
</style>
<script>
import ClosePoint from "./ClosePoint";
import Sidebar from "./SideBarMenu";
import axios from "axios";
export default {
  name: "leftBar",
  components: {
    ClosePoint,
    Sidebar,
   
  },
 
  data() {
    return {
     // count: Number,
      newSolution: [],
    };
  },
  mounted() {
    axios.get("https://cpel.herokuapp.com/api/exercises/").then((response) => {
      response.data.forEach((exr) => {
        axios
          .get("https://cpel.herokuapp.com/api/corrections/")
          .then((response) => {
            response.data.forEach((corr) => {
             // this.count = 0;

              if (exr._id === corr.idExercise) {
                if (!this.newSolution.includes(corr.correctionCode)) {
                  this.newSolution.push({
                    newSol: corr.correctionCode,
                    solexercise: corr.idExercise,
                  });
             //     this.count++;
                }
              }
            });
          });
      });
    });
  },
};
</script>