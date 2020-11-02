<template>
    <div class="container">
        <h1>Groupe {{ id }}</h1>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ group.name }}</h5>
                <h6 class="card-subtitle text-muted">Identifiant du groupe : {{ group.idGroup }}</h6>
            </div>
            <div class="card-body text-left">
                <p>Ce groupe est composé de {{ group.nbOfStudents }} étudiants : </p>
                <ul v-for="(stud, key) in groupStudents" :key="key">
                    <li>
                        <router-link :to="`/student/${stud.idStudent}`">{{ stud.firstname }} (numéro étudiant: {{ stud.idStudent }})</router-link>
                    </li>
                </ul>
                <p>Il est actuellement lié au(x) module(s) suivant(s) :</p>
                <ul v-for="(mod, key) in group.modules" :key="key">
                    <li>{{ mod }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Group",
    data() {
        return {
            id: this.$route.params.id,
            group: {},
            groupStudents: []
        }
    },
    mounted() {
        axios.get("https://cpel.herokuapp.com/api/group/" + this.id).then(response => {
            this.group = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/student/").then(response => {
            for(let student of response.data) {
                if (student.idGroup === this.id) {
                    this.groupStudents.push(student)
                }
            }
        })
    }
}
</script>

<style scoped>

</style>
