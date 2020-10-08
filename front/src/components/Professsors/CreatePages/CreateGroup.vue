<template>
    <div>
        <h2>Créer un groupe</h2>

        <div class="container">
            <form>
                <div class="form-group">
                    <label for="name">L'intitulé du groupe:</label>
                    <input type="text" id="name" class="form-control" v-model.lazy="formData.name">
                </div>

                <div class="form-group">
                    <label for="idGroup">L'identifiant du groupe:</label>
                    <input type="text" id="idGroup" class="form-control" v-model.lazy="formData.idGroup">
                </div>

                <label for="students">Ajouter les étudiants :</label>
                <select id="students" class="form-control" multiple="multiple" v-model="formData.studentsAdded">
                    <option v-for="(student, key) of formData.students" :key="key">{{student.idStudent}} : {{ student.firstname }} {{ student.lastname }}</option>
                </select>

                <label for="module">Pour le module :</label>
                <select id="module" class="custom-select" v-model="formData.modulesSelected">
                    <option v-for="(mod, key) of formData.modules" :key="key">{{ mod.idmodule }} : {{ mod.name }}</option>
                </select>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Créer le groupe</button>
            </form>
        </div>
    </div>
</template>

<script>
    //import Multiselect from "vue-multiselect"
    import axios from 'axios'

    console.log()

    export default {
        name: "CreateGroup",
        components: {
          //Multiselect
        },
        data() {
            return {
                formData: {
                    groupName: "",
                    idGroup: "",
                    studentsAdded: [],
                    students: [],
                    modules: [],
                    modulesSelected: []
                }
            }
        },
        mounted() {
            axios.get("https://cpel.herokuapp.com/api/student/").then(response => {
                console.log(response.data)
                this.formData.students = response.data
                //this.data = response.data.data;
            });
            axios.get("https://cpel.herokuapp.com/api/module/").then(response => {
                console.log(response.data)
                this.formData.modules = response.data
                //this.data = response.data.data;
            });
        },
        methods: {
            sendForm() {
                console.log("cliqué")
                console.log(this.formData.studentsAdded)

                let groupCreated = {
                    idGroup: this.getValidIdGroup(this.formData.idGroup),
                    name: this.formData.name,
                    nbOfStudents: this.formData.studentsAdded.length,
                    modules: this.formData.modulesSelected
                }
                console.log(groupCreated)
                // Ajouter le nouveau groupe a la base
                axios.post("https://cpel.herokuapp.com/api/group/", groupCreated)
                    .then()
                // Mettre a jour l'etudiant
                for (let student in this.studentsAdded) {
                    axios.put(`https://cpel.herokuapp.com/api/student/${student.id}`, this.idGroup)
                }

            },
            getValidIdGroup(idGroup) {
                axios.get("https://cpel.herokuapp.com/api/group/")
                    .then(response => {
                        for (let group of response.data) {
                            if (idGroup === group.idGroup) {
                                return "Existing id, retry"
                            }
                        }
                    })
                return idGroup
            }
        }
    }
</script>

<style src="../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
