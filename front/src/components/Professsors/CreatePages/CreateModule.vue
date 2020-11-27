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

                <!-- For PDF File
                <div class="form-group">
                    <label for="file">Parcourir les fichiers</label>
                    <input type="file" accept="application/pdf" class="form-control-file" id="file" ref="file" v-on:change="handleFileUpload">
                </div>-->

                <div class="form-group">
                    <label for="course">Contenu du cours</label>
                    <input type="text" class="form-control" id="course" v-model="formData.content">
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

            let formData2 = new FormData()
            formData2.append('file', this.formData.file)

            let moduleCreated = {
                name: this.formData.name,
                content: this.content,
                groups: [this.formData.groupSelected._id],
                idProfessor: "5fac3b2293c9159d939dd32e",
                tds: []
            }
            console.log(moduleCreated)
            console.log(this.$refs.file)
            // Ajouter le nouveau module a la base
            axios.post("https://cpel.herokuapp.com/api/module/", moduleCreated)
                .then(() => {
                console.log("good")
                    // redirect
                    this.$router.push(this.$route.query.redirect || '/professeur')
                })
                .catch(error => {
                    console.log(error)
                    this.formData.error = true
                })
            this.formData.submitted = false
        },
        /*handleFileUpload() {
            this.formData.file = this.$refs.file.files[0].name
        }*/
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/groups/").then(response => {
            this.getGroups = response.data;
        })
    }
}
</script>

<style scoped>

</style>
