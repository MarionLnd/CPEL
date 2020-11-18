<template>
    <div class="container">
        <h2>Exercice - {{ exercise.name }}</h2>
        <CodeRending :exercise="exercise" :contentStudent="rending.content" />
    </div>
</template>

<script>
import axios from "axios";
import CodeRending from "@/components/Professsors/DetailsPages/CodeRending";

export default {
    name: "StudentRending",
    components: {CodeRending},
    data() {
        return {
            idStudent: this.$route.params.idStudent,
            idExercise: this.$route.params.idExercise,
            idStudentRending: this.$route.query.idStudentRending,
            rending: {},
            exercise: {}
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/studentRendering/").then(response => {
            for (let stRending of response.data) {
                if (stRending._id === this.idStudentRending) {
                    this.rending = stRending
                }
            }

        })
        axios.get("https://cpel.herokuapp.com/api/studentRendering/" + this.idExercise + "/" + this.idStudent).then(response => {
            this.studentRending = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/exercise/" + this.idExercise).then(response => {
            this.exercise = response.data
        })
    }
}
</script>

<style scoped>

</style>
