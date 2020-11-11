<template>
    <div class="container">
        <h1 class="pt-3 pb-3">{{ exercise.name }}</h1>
        <CodeRending :exercise="exercise" />
        <router-link :to="/creer-correction/">
             <button class="btn btn-outline-info">Ajouter une correction</button>
         </router-link>
    </div>
</template>

<script>
import axios from "axios";
import CodeRending from "./CodeRending";

export default {
    name: "Exercice",
    components: {
        CodeRending
    },
    data: function () {
        return {
            idModule: this.$route.params.idModule,
            idExercise: this.$route.params.idExercise,
            exercise: {},
            active: Boolean,
            hasCorrection: false
        };
    },
    methods: {
        checkIfHasCorrection() {
            console.log(this.exercise)
        }
    },
    mounted() {
        axios.get("https://cpel.herokuapp.com/api/exercise/").then(response => {
            for (let exercise of response.data) {
                if (exercise.idExercise === this.idExercise && exercise.idModule === this.idModule) {
                    this.exercise = exercise
                }
            }
        });
    },
}
</script>

<style scoped>

</style>
