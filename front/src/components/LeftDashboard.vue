<template>
     <div class="card" id="menu">
      <h4><router-link class="nav-link" to="/course">Cours </router-link></h4>
      <br />
      <h4><router-link class="nav-link" to="/exercise"> Exrecices </router-link></h4>
      <br />
      <h4>Profil</h4>
      <h6 id="deconexion"><router-link class="nav-link" to="/login">Deconexion</router-link></h6>
    </div>
</template>
<style scoped>
#menu {
  width: 150px;
  height: 400px;
  background-color: #84a9ac;
  margin-top: 100px;
  padding-top: 20px;
  margin-left: 0px;
  border-radius: 0px;

}

#deconexion {
  position: absolute;
  bottom: 0px;
}
</style>
<script>
export default {
    name: "DashboardLeft",
  
    data(){
      return {

      }
    }
  }
</script>