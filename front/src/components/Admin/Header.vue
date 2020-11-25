<template>
    <nav class="navbar navbar-expand-md navbar-light bg-header fixed-top">
        <a class="navbar-brand text-white" href="#">CPEL</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link text-white" to="/admin/tableau-de-bord">Tableau de bord</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-white" to="/admin/profil">Profil</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Ajouter
                    </a>
                    <div class="dropdown-menu p-1" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item nav-link text-center" to="/admin/ajouter-professeur">Professeur</router-link>
                        <router-link class="dropdown-item nav-link text-center" to="/admin/ajouter-etudiant">Étudiant</router-link>
                        <router-link class="dropdown-item nav-link text-center" to="/admin/ajouter-groupe">Groupe</router-link>
                    </div>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-white" to="/admin/profil">Gérer</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled text-white" href="#">Déconnexion</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
.bg-header {
    background-color: #2a4f66;
}
</style>
