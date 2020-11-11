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
                    <select id="exercise" class="custom-select" v-model="formData.selectedExercise">
                        <option
                            v-for="exercise in formData.exercises"
                            :key="exercise.idExercise"
                            :value="exercise">
                            [{{ exercise.idModule }}] - Exercice : {{ exercise.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <p>
                        <strong>Énoncé :</strong> <br>
                        {{ this.formData.selectedExercise.wording }}
                    </p>
                    <label class="" for="txt">Correction pour l'énoncé selectionné :</label>
                    <textarea id="txt" class="form-control" v-model.trim="formData.wording"></textarea>
                </div>

                <div class="form-group">
                    <label for="correctionCode">Code de correction :</label>
                    <input id="correctionCode" type="text" class="form-control w-25" v-model="formData.correctionCode">
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
                formData: {
                    exercises: [],
                    selectedExercise: {},
                    content: "",
                    correctionCode: "",
                    submitted: false,
                    error: false
                }
            }
        },
        mounted() {
            axios.get("https://cpel.herokuapp.com/api/exercise")
            .then(response => {
                this.formData.exercises = response.data
                // Sort exercises by their id modules
                this.formData.exercises.sort((a, b) => {
                    let ma = a.idModule.toLowerCase(),
                        mb = b.idModule.toLowerCase();

                    if (ma < mb) {
                        return -1;
                    }
                    if (ma > mb) {
                        return 1;
                    }
                    return 0;
                })
            })
        },
        methods: {
            sendForm() {
                this.formData.submitted = true

                let correctionCreated = {
                    idExercise: this.formData.selectedExercise._id,
                    content: this.formData.content,
                    correctionCode: this.formData.correctionCode
                }
                console.log(correctionCreated)
                // Ajouter la nouvelle correction a la base
               /* axios.post("https://cpel.herokuapp.com/api/correction/", correctionCreated)
                    .then(() => {
                        // redirect
                        //this.$router.push(this.$route.query.redirect || '/')
                    })
                    .catch(error => {
                        console.log(error)
                        this.formData.error = true
                    })*/
                this.formData.submitted = false
            },
        }
    }
</script>

<style scoped>

</style>
