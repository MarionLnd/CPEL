<template>
    <div>
        <h2>Créer un groupe</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                Le groupe a été crée avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.error" style="transition-delay: 1.5s">
                Une erreur est survenue lors de la création du groupe.. Réessayez !
            </div>
        </transition>

        <div class="container">
            <form>
                <div class="form-inline form-group">
                    <div class="col-6">
                        <label for="name">L'intitulé du groupe :</label>
                        <input type="text" id="name" class="form-control w-100" v-model.lazy="formData.name">
                    </div>
                    <div class="col-6">
                        <label for="idGroup">L'identifiant du groupe :</label>
                        <input type="text" id="idGroup" class="form-control w-100" v-model.lazy="formData.idGroup">
                    </div>
                </div>

                <label for="students">Ajouter les étudiants :</label>
                <select id="students" class="form-control" multiple="multiple" v-model="formData.studentsAdded">
                    <option v-for="(student, key) of formData.students" :key="key">{{student.idStudent}} : {{ student.firstname }} {{ student.lastname }}</option>
                </select>

                <label for="module">Pour le module :</label>
                <select id="module" class="custom-select" v-model="formData.modulesSelected">
                    <option v-for="(mod, key) of formData.modules" :key="key">{{ mod.idmodule }} : {{ mod.name }}</option>
                </select>

                <button type="submit" class="btn btn-primary mt-3" @click.prevent="sendForm">Créer le groupe</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "CreateGroup",
        components: {
        },
        data() {
            return {
                formData: {
                    groupName: "",
                    idGroup: "",
                    studentsAdded: [],
                    students: [],
                    modules: [],
                    modulesSelected: [],
                    submitted: false,
                    error: false
                }
            }
        },
        mounted() {
            axios.get("https://cpel.herokuapp.com/api/student/").then(response => {
                for(let student of response.data) {
                    if (student.idGroup === "") {
                        this.formData.students.push(student)
                    }
                }
            });
            axios.get("https://cpel.herokuapp.com/api/module/").then(response => {
                this.formData.modules = response.data
            });
        },
        methods: {
            sendForm() {
                this.formData.submitted = true

                let groupCreated = {
                    name: this.formData.name,
                    nbOfStudents: this.formData.studentsAdded.length,
                    modules: this.formData.modulesSelected
                }
                console.log(groupCreated)
                // Ajouter le nouveau groupe a la base
                axios.post("https://cpel.herokuapp.com/api/group/", groupCreated)
                    .then(() => {
                        // Mettre a jour l'etudiant
                        for (let student in this.studentsAdded) {
                            axios.put(`https://cpel.herokuapp.com/api/student/${student.id}`, this.idGroup)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.formData.error = true
                    })
                // Mettre a jour l'etudiant
                /*for (let student in this.studentsAdded) {
                    axios.put(`https://cpel.herokuapp.com/api/student/${student.id}`, this.idGroup)
                }*/
                this.formData.submitted = false

            },
        }
    }
</script>

<style src="../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
