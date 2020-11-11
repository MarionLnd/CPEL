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
                    <div class="col-6">
                        <label for="idModule">L'identifiant du module :</label>
                        <input type="text" id="idModule" class="form-control w-100" v-model.lazy="formData.idModule">
                    </div>
                    <div class="col-6">
                        <label for="name">L'intitulé du module :</label>
                        <input type="text" id="name" class="form-control w-100" v-model.lazy="formData.name">
                    </div>
                </div>

                <div class="form-group">
                    <label for="exampleFormControlFile1">Parcourir les fichiers</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1">
                    <label for="moduleContent">Contenu</label>
                    <input type="text" class="form-control" id="moduleContent" v-model.lazy="formData.content">
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
            formData: {
                idModule: '',
                name: '',
                content: '',
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

            let moduleCreated = {
                idmodule: this.getValidIdModule(this.formData.idModule),
                name: this.formData.name,
                content: this.formData.content
            }
            console.log(moduleCreated)
            // Ajouter le nouveau groupe a la base
            axios.post("https://cpel.herokuapp.com/api/module/", moduleCreated)
                .then(() => {
                    // redirect
                    this.$router.push(this.$route.query.redirect || '/')
                })
                .catch(error => {
                    console.log(error)
                    this.formData.error = true
                })
            this.formData.submitted = false
        },
        getValidIdModule(idModule) {
            axios.get("https://cpel.herokuapp.com/api/module/")
                .then(response => {
                    for (let mod of response.data) {
                        if (idModule === mod.idmodule) {
                            return "Existing id, retry"
                        }
                    }
                })
            return idModule
        }
    }
}
</script>

<style scoped>

</style>
