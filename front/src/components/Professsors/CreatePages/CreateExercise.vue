<template>
    <div>
        <h2>Créer un exercice</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                L'exercice a été crée avec succès !
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
                    <label for="name">L'intitulé de l'exercice:</label>
                    <input type="text" id="name" class="form-control" v-model="formData.name" required>
                </div>

                <div class="form-group">
                    <label for="txt">L'énoncé de l'exercice:</label>
                    <textarea id="txt" class="form-control" v-model.trim="formData.wording" required></textarea>
                </div>

                <label for="module">Pour le TD :</label>
                <select id="module" class="custom-select" v-model="formData.tdSelected">
                    <option v-for="(td) in getTDs" v-bind:key="td.idmodule" :value="td">
                        {{ td.name }}
                    </option>
                </select>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Ajouter l'exercice</button>
            </form>
        </div>
    </div>
</template>

<script>
//import Switches from 'vue-switches';
import axios from 'axios';

export default {
    name: "CreateExercice",
    components: {

    },
    data() {
        return {
            getTDs: [],
            formData: {
                name: "",
                tdSelected: {},
                wording: "",
                submitted: false,
                error: false,
                errorMessage: ""
            },
        }
    },
    methods: {
        sendForm() {
            if(this.formData.name === "" || this.formData.wording === "" || this.formData.moduleSelected === "") {
                this.formData.errorMessage = "Vous n'avez pas rempli tous les champs nécéssaires"
                this.formData.error = true
            } else {
                this.formData.submitted = true

                let exerciseCreated = {
                    name: this.formData.name,
                    idTD: this.formData.tdSelected._id,
                    wording: this.formData.wording,
                }

                // Ajouter le nouvel exercice a la base
                axios.post(`https://cpel.herokuapp.com/api/exercise/${exerciseCreated.idModule}`, exerciseCreated)
                    .then(() => {
                        // redirect (OK)
                        this.$router.push(this.$route.query.redirect || '/professeur')
                    })
                    .catch(error => {
                        console.log(error)
                        this.formData.error = true
                        this.formData.errorMessage = "Une erreur est survenue lors de la création de l'exercice.. Réessayez !"
                    })
                this.formData.submitted = false
            }
        }
    },
    created() {
        axios.get('https://cpel.herokuapp.com/api/td/')
            .then(response => {
                for(let td of response.data) {
                    this.getTDs.push(td)
                }
                // Sort exercises by their id modules
                this.getTDs.sort((a, b) => {
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
form {
    text-align: left;
}
</style>
