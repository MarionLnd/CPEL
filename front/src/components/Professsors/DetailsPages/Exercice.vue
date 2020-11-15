<template>
    <div class="container">
        <h1 class="pt-3 pb-3">{{ exercise.name }}</h1>
        <CodeRending :exercise="exo" :hasCorrection="hasCorrection" />
        <router-link :to="`/professeur/creer-correction/`">
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
    props: ["exo"],
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

    },
    mounted() {
        axios.get("https://cpel.herokuapp.com/api/exercise/" + this.idExercise).then(response => {
            this.exercise = response.data
        });
        /*axios.get("https://cpel.herokuapp.com/api/correction/").then(response => {
            for (let correction of response.data) {
                console.log(correction)
                if (correction.idExercise === this.idExercise) {
                    this.hasCorrection = true
                }
            }
        })*/
    },
}
</script>

<style scoped>

</style>
