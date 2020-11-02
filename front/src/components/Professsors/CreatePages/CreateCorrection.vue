<template>
    <div>
        <h2 class="mt-5">Création d'une correction</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                La correction a été créée avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.submitted && formData.error">
                Une erreur est survenue lors de la création de la correction.. Réessayez !
            </div>
        </transition>

        <div class="container">
            <form class="text-left">
                <div class="form-group">
                    <label class="text-left" for="exercise">Pour l'exercice :</label>
                    <select id="exercise" class="custom-select" v-model="currentExercise">
                        <option v-for="exercise in formData.exercises" :key="exercise.idExercise">Module {{ exercise.idModule }}, exercice : {{ exercise.name }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <p>
                        <strong>Énoncé :</strong> <br>
                        {{ this.currentExercise.wording }} Parcourez le tableau et selectionnez le 2e element du tableau
                    </p>
                    <label class="" for="txt">Correction pour l'énoncé selectionné :</label>
                    <textarea id="txt" class="form-control" v-model.trim="formData.wording"></textarea>
                </div>

                <div class="form-group">
                    <label for="correctionCode">Code de correction :</label>
                    <input id="correctionCode" type="text" class="form-control w-25">
                </div>

                <button type="submit" class="btn btn-primary mt-2 text-center" @click.prevent="sendForm">Ajouter la correction</button>
            </form>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        name: "CreateCorrection",
        props: ['idExercice'],
        data() {
            return {
                currentExercise: {},
                formData: {
                    exercises: [],
                    wordings: [],
                    currentWording: "",
                    idCorrection: "",
                    submitted: false,
                    error: false
                }
            }
        },
        mounted() {
            axios.get("https://cpel.herokuapp.com/api/exercise/`")
            .then(response => {
                console.log(response.data)
                this.formData.exercises = response.data
            })
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
