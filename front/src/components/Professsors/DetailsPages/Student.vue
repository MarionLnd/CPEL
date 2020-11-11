<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Profil Étudiant {{ id }}</h1>
        <div class="row">
            <div class="col-6">
                <h4>Informations personnelles</h4>
                <div class="card mt-4">
                    <div class="card-header">
                        <h4 class="card-title">Alicia Keys</h4>
                        <p class="card-subtitle text-muted">Étudiant(e)</p>
                    </div>
                    <div class="card-body text-left">
                        <form>
                            <div class="form-group">
                                <label for="lastname">Nom:</label>
                                <input id="lastname" class="form-control" type="text" placeholder="Keys" disabled>
                            </div>

                            <div class="form-group">
                                <label for="firstname">Prénom:</label>
                                <input id="firstname" class="form-control" type="text" placeholder="Alicia" disabled>
                            </div>

                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input id="email" class="form-control" type="email" placeholder="alicia.keys@etud.univ-evry.fr" disabled>
                            </div>

                            <div class="form-group">
                                <label for="studentNumber">Numéro étudiant:</label>
                                <input id="studentNumber" class="form-control" type="text" placeholder="20192031" disabled>
                            </div>

                            <div class="form-group">
                                <label for="groupName">Groupe:</label>
                                <input id="groupName" class="form-control" type="text" placeholder="M2MIAA" disabled>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div class="col-6">
                <h4>Exercices effectués</h4>
                <div class="card mt-4">
                    <div class="card-body text-left">
                        <div>
                            Module 1
                            <ul>
                                <li>
                                    <router-link :to="`/etudiant/${id}/rendu-exercice/${id}`">Exercice 1</router-link>
                                </li>
                                <li>Exercice 2</li>
                            </ul>
                        </div>
                        <div>
                            Module 1
                            <ul>
                                <li>Exercice 1</li>
                                <li>Exercice 2</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        name: "Student",
        data() {
            return {
                id: this.$route.params.idStudent,
            }
        },
    }
</script>

<style scoped>

</style>
