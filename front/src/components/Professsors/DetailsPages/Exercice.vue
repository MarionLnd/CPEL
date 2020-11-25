<template>
    <div class="container">
        <CodeRending :exercise="exo" :hasCorrection="hasCorrection" :contentCorrection="correctionContent" />
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
    props: ["exo", "contentCorrection"],
    data: function () {
        return {
            idTD: this.$route.params.idTD,
            idExercise: this.exo._id,
            exercise: {},
            active: Boolean,
            hasCorrection: false,
            correctionContent: ""
        };
    },
    methods: {

    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/exercise/" + this.idExercise).then(response => {
            this.exercise = response.data
        });
        axios.get("https://cpel.herokuapp.com/api/correction/").then(response => {
            for (let correction of response.data) {
                if (correction.idExercise === this.idExercise) {
                    this.hasCorrection = true
                    this.correctionContent = correction
                }
            }
        })
    },
}
</script>

<style scoped>

</style>
