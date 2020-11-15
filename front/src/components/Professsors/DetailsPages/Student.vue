<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Profil - {{ student.firstname }} {{ student.lastname }}</h1>
        <div class="row">
            <div class="col-6">
                <h4>Informations personnelles</h4>
                <div class="card mt-4">
                    <div class="card-header">
                        <h4 class="card-title">{{ student.firstname }} {{ student.lastname }}</h4>
                        <p class="card-subtitle text-muted">Étudiant(e)</p>
                    </div>
                    <div class="card-body text-left">
                        <form>
                            <div class="form-group">
                                <label for="lastname">Nom:</label>
                                <input id="lastname" class="form-control" type="text" :placeholder="student.lastname" disabled>
                            </div>

                            <div class="form-group">
                                <label for="firstname">Prénom:</label>
                                <input id="firstname" class="form-control" type="text" :placeholder="student.firstname" disabled>
                            </div>

                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input id="email" class="form-control" type="email" :placeholder="student.email" disabled>
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
                <h4>Modules liés</h4>
                <div class="card mt-4">
                    <div class="card-body text-left">
                        <div v-for="(mod, key) in modules" :key="key">
                            Module 1
                            <ul>
                                <li>
                                    <router-link :to="`/professeur/etudiant/${idStudent}/rendu-exercice/${id}`">Exercice 1</router-link>
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
    import axios from "axios";

    export default {
        name: "Student",
        data() {
            return {
                id: this.$route.params.idStudent,
                student: {},
                modules: [],
                tds: [],
                exercises: [],
                studentRenderings: [],
            }
        },
        mounted() {
            axios.get("https://cpel.herokuapp.com/api/student/" + this.id).then(response => {
                this.student = response.data
            })
            axios.get("https://cpel.herokuapp.com/api/studentRendering/").then(response => {
                this.studentRenderings = response.data
            })
        }
    }
</script>

<style scoped>

</style>
