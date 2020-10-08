<template>
    <div>
        <h2>Création d'une correction</h2>

        <div class="container">
            <form>
                <div class="form-group">
                    <label class="text-left" for="exercise">Pour l'exercice:</label>
                    <select id="exercise" class="custom-select" v-model="formData.currentExercise">

                    </select>
                </div>

                <div class="form-group">
                    <label class="text-left" for="wording">Pour l'énoncé:</label>
                    <select id="wording" class="custom-select" v-model="formData.currentWording">
                        <option>Faire une boucle for</option>
                        <option>Faire une boucle do while</option>
                        <option>Faire une boucle while</option>
                    </select>
                </div>

                <div class="form-group">
                    <p>Énoncé : {{ this.formData.currentWording }}</p>
                    <label class="text-left" for="txt">Correction pour l'énoncé selectionné:</label>
                    <textarea id="txt" class="form-control" v-model.trim="formData.wording"></textarea>
                </div>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Ajouter la correction</button>
            </form>
        </div>
    </div>
</template>

<script>

    //import axios from 'axios'

    export default {
        name: "CreateCorrection",
        props: ['idExercice'],
        data() {
            return {
                currentExercise: {},
                formData: {
                    exercices: [],
                    wordings: [],
                    currentWording: "",
                    idCorrection: "",
                }
            }
        },
        mounted() {
            //axios.get()
        },
        methods: {
            sendForm() {

            },
            /*getExerciceById(idExercise) {
                axios.get("")
                    .then(exercise => {
                        this.currentExercise = exercise
                    })
            },
            getWordingsByExercice() {
                axios.get("")
                    .then(wordings => {
                        this.formData.wordings = wordings
                    })
            }*/
        }
    }
</script>

<style scoped>

</style>
