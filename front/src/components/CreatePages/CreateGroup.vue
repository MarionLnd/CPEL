<template>
    <div>
        <h2>Créer un groupe</h2>

        <div class="container">
            <form>
                <div class="form-group">
                    <label for="name">L'intitulé du groupe:</label>
                    <input type="text" id="name" class="form-control" v-model.lazy="formData.name">
                </div>

                <label for="students">Pour le module :</label>
                <select id="students" class="form-control" multiple="multiple" v-model="formData.studentsAdded">
                    <option v-for="(student, key) of formData.students" :key="key">{{ student.firstname }} {{ student.lastname }}</option>
                </select>

                <label for="module">Pour le module :</label>
                <select id="module" class="custom-select" v-model="formData.moduleSelected">
                    <!--<option v-for="(pays, key) in formData.countryList" v-bind:key="key">{{ pays }}</option> -->
                    <option>Module de programmation Python</option>
                    <option>Module de base pour Python</option>
                    <option>Module de Python avancée</option>
                    <option>Module d'initiation au C</option>
                </select>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Créer le groupe</button>
            </form>
        </div>
    </div>
</template>

<script>
    import Multiselect from "vue-multiselect"
    import axios from 'axios'

    export default {
        name: "CreateGroup",
        components: {
          Multiselect
        },
        data() {
            return {
                formData: {
                    groupName: "",
                    studentsAdded: [],
                    students: [],
                    modules: [],
                    moduleSelected: ""
                }
            }
        },
        mounted() {
            axios.get("http://localhost:3000/api/student/").then(response => {
                console.log(response.data)
                for (let stud of response.data) {
                    console.log(stud)
                }
                this.formData.students = response.data
                //this.data = response.data.data;
            });
        },
        methods: {
            createGroup() {
                let groupCreated = {
                    idGroup: this.getValidIdGroup(),
                    name: this.name,
                    nbOfStudents: this.studentsAdded.length
                }
                // Ajouter le nouveau groupe a la base
                axios.post("http://localhost:3000/api/group/addGroup", groupCreated)
                    .then()
                // Mettre a jour l'etudiant
                axios.put("http://localhost:3000/api/student/")
                    .then()
            },
            getValidIdGroup() {
                let validId = 0
                axios.get("http://localhost:3000/api/group/")
                    .then(response => {
                        for (let group of response.data) {
                            if (validId === group.idGroup) {
                                validId++
                            }
                        }
                    })
                return validId
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
