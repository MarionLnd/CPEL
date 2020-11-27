<template>
    <div class="container">
        <h2 class="pt-3 pb-3">Exercice - {{ exercise.name }}</h2>
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
            exercise: {},
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/studentRenderings/" + this.idStudentRending).then(response => {
            this.rending = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/exercises/" + this.idExercise).then(response => {
            this.exercise = response.data
        })
    }
}
</script>

<style scoped>

</style>
