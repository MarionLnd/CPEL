<template>
    <div class="text-left">
        <h2 class="text-center">Créer un TD</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                Le TD a été crée avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.error">
                {{ formData.errorMessage }}
            </div>
        </transition>

        <div class="container">
            <form>
                <div class="form-group">
                    <label for="name">L'intitulé du TD:</label>
                    <input type="text" id="name" class="form-control" v-model="formData.name" required>
                </div>

                <div class="form-group">
                    <label for="module">Pour le module :</label>
                    <select id="module" class="custom-select" v-model="formData.moduleSelected" required>
                        <option v-for="(mod) in getModules" v-bind:key="mod._id" :value="mod">
                            {{ mod.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="exercises">Ajouter les exercices :</label>
                    <select id="exercises" class="custom-select" v-model="formData.exercisesSelected" multiple required>
                        <option v-for="(exo) in getExercises" v-bind:key="exo._id" :value="exo">
                            {{ exo.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="limitDate">Date limite :</label>
                    <input type="date" id="limitDate" class="form-control" v-model="formData.limitDate" required>
                </div>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Ajouter le TD</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CreateTD",
        data() {
            return {
                name: "",
                getModules: [],
                getExercises: [],
                formData: {
                    name: "",
                    moduleSelected: {},
                    exercisesSelected: [],
                    limitDate: "",
                    errorMessage: "",
                    error: false,
                    submitted: false
                }
            }
        },
        methods: {
            sendForm() {
                this.formData.submitted = true

                let tdCreated = {
                    name: this.formData.name,
                    idModule: this.formData.moduleSelected,
                    Exercises: this.formData.exercisesSelected,
                    dateLimit: this.formData.limitDate
                }
                // Ajouter le nouveau TD a la base
                axios.post(`https://cpel.herokuapp.com/api/td`, tdCreated)
                    .then(() => {
                        // redirect
                        this.$router.push(this.$route.query.redirect || '/professeur')
                    })
                    .catch(error => {
                        console.log(error)
                        this.formData.error = true
                        this.formData.errorMessage = "Une erreur est survenue lors de la création du TD.. Réessayez !"
                    })
                this.formData.submitted = false
            }
        },
        created() {
            axios.get('https://cpel.herokuapp.com/api/module/')
                .then(response => {
                    for(let mod of response.data) {
                        this.getModules.push(mod)
                    }
                    // Sort exercises by their id modules
                    this.getModules.sort((a, b) => {
                        let ma = a.name.toLowerCase(),
                            mb = b.name.toLowerCase();

                        if (ma < mb) {
                            return -1;
                        }
                        if (ma > mb) {
                            return 1;
                        }
                        return 0;
                    })
                })
            axios.get('https://cpel.herokuapp.com/api/exercise/')
                .then(response => {
                    for(let exercise of response.data) {
                        this.getExercises.push(exercise)
                    }
                    // Sort exercises by their id modules
                    this.getExercises.sort((a, b) => {
                        let ma = a.name.toLowerCase(),
                            mb = b.name.toLowerCase();

                        if (ma < mb) {
                            return -1;
                        }
                        if (ma > mb) {
                            return 1;
                        }
                        return 0;
                    })
                })
        }
    }
</script>

<style scoped>

</style>
