<template>
  <nav class="navbar navbar-expand-md navbar-light bg-header fixed-top">
    <a class="navbar-brand" href="#">CPEL</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/professeur/tableau-de-bord">Tableau de bord<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/professeur/profil">Profil</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Créer
          </a>
          <div class="dropdown-menu p-1" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item nav-link text-center" to="/professeur/creer-module">Module</router-link>
              <router-link class="dropdown-item nav-link text-center" to="/professeur/creer-exercice">Exercice</router-link>
              <router-link class="dropdown-item nav-link text-center" to="/professeur/creer-td">TD</router-link>
              <router-link class="dropdown-item nav-link text-center" to="/professeur/creer-groupe">Groupe</router-link>
              <router-link class="dropdown-item nav-link text-center" to="/professeur/creer-correction">Correction</router-link>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Déconnexion</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-header {
    background-color: #84A9AC;
  }
  .router-link-active {
    color: black;
  }
  /*.main-header {
    width: 100%;
  }*/
</style>
