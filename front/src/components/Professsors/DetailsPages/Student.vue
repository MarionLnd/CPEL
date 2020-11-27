<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Profil - {{ student.firstname }} {{ student.lastname }}</h1>
        <div class="row">
            <div class="col-6">
                <h3>Informations personnelles</h3>
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
                                <input id="groupName" class="form-control" type="text" :placeholder="groupName" disabled>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div class="col-6">
                <h3>Exercices effectués</h3>
                <div class="card mt-4">
                    <div class="card-body text-center" v-if="studentRenderings.length === 0">
                        <p>{{ student.firstname }} n'a pas encore rendu d'exercices.</p>
                    </div>
                    <div class="card-body text-left" v-else>
                        <div v-for="(rendering, key) in studentRenderings" :key="key">
                            <ul>
                                <li>
                                    <router-link
                                        :to="`/professeur/etudiant/${id}/rendu-exercice/${rendering.idExercise}?idStudentRending=${rendering._id}`"
                                    >
                                        {{ getInfosExercise(rendering.idExercise) }}
                                    </router-link>
                                </li>
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
                groupName: this.$route.query.groupName,
                currentExercise: {},
                student: {},
                modules: [],
                tds: [],
                exercises: [],
                studentRenderings: [],
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/students/" + this.id).then(response => {
                this.student = response.data
            })
            axios.get("https://cpel.herokuapp.com/api/exercises/").then(response => {
                this.exercises = response.data
            })
            axios.get("https://cpel.herokuapp.com/api/studentRenderings/").then(response => {
                for (let stdRender of response.data) {
                    if (stdRender.idStudent === this.id) {
                        this.studentRenderings.push(stdRender)
                    }
                }
            })
        },
        methods: {
            getInfosExercise(idExercice) {
                for (let exo of this.exercises) {
                    if (exo._id === idExercice) {
                        return exo.name
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
