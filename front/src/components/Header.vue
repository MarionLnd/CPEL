<template>
  <nav class="navbar navbar-expand-md navbar-light bg-header fixed-top">
    <a class="navbar-brand" href="#">CPEL</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/tableau-de-bord">Tableau de bord<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profil">Profil</router-link>
        </li>
        <li class="nav-item dropdown">
          <router-link class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Créer
          </router-link>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Modules</a>
            <a class="dropdown-item" href="#">Groupes</a>
          </div>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Déconnexion</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HelloWorld',
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
  /*.main-header {
    width: 100%;
  }*/
</style>
