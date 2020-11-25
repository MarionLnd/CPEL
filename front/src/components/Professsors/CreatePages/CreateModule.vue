<template>
    <div>
        <h2>Créer un module</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                Le module a été crée avec succès !
            </div>
        </transition>

        <transition name="slide-fade">
            <div class="alert alert-danger alert-dismissible" v-if="formData.submitted && formData.error">
                Une erreur est survenue lors de la création du module.. Réessayez !
            </div>
        </transition>

        <div class="container">
            <form class="text-left">
                <div class="form-inline form-group">
                    <label for="name">L'intitulé du module :</label>
                    <input type="text" id="name" class="form-control w-100" v-model.lazy="formData.name">
                </div>

                <div class="form-group">
                    <!--<label for="exampleFormControlFile1">Parcourir les fichiers</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1">-->
                    <label for="moduleContent">Contenu</label>
                    <input type="text" class="form-control" id="moduleContent" v-model.lazy="formData.content">
                </div>

                <div class="form-group">
                    <label for="module">Lier un groupe à ce module:</label>
                    <select id="module" class="custom-select" v-model="formData.groupSelected">
                        <option v-for="(group) in getGroups" v-bind:key="group._id" :value="group">
                            {{ group.name }}
                        </option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Ajouter le module</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "CreateModule",
    data() {
        return {
            getGroups: [],
            formData: {
                idModule: '',
                name: '',
                content: '',
                groupSelected: {},
                submitted: false,
                error: false
            }
        }
    },
    methods: {
        sendForm() {
            this.formData.submitted = true
            console.log("submit")
            console.log(this.formData.submitted)
            console.log(this.formData.groupSelected)

            let moduleCreated = {
                name: this.formData.name,
                content: this.formData.content,
                groups: [this.formData.groupSelected._id],
                idProfessor: "5fac3b2293c9159d939dd32e",
                nbExercises: 0
            }
            console.log(moduleCreated)
            // Ajouter le nouveau module a la base
            axios.post("https://cpel.herokuapp.com/api/module/", moduleCreated)
                .then(() => {
                    // redirect
                    //this.$router.push(this.$route.query.redirect || '/professeur')
                })
                .catch(error => {
                    console.log(error)
                    this.formData.error = true
                })
            this.formData.submitted = false
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/group/").then(response => {
            this.getGroups = response.data;
        })
    }
}
</script>

<style scoped>

</style>
