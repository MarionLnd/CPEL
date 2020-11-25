<template>
    <div>
        <h1 class="pt-3 pb-3">Ajouter un groupe</h1>

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
            <form class="text-left">
                <div class="form-group">
                    <label for="idGroup">Le nom du groupe :</label>
                    <input type="text" id="idGroup" class="form-control w-100" v-model.lazy="formData.groupName" required>
                </div>

                <div class="form-group">
                    <label for="students">Ajouter les étudiants :</label>
                    <select id="students" class="form-control" multiple="multiple" v-model="formData.studentsAdded" required>
                        <option v-for="(student, key) of formData.students" :key="key">{{student.idStudent}} : {{ student.firstname }} {{ student.lastname }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="module">Pour le module :</label>
                    <select id="module" class="custom-select" v-model="formData.modulesSelected" required>
                        <option v-for="(mod, key) of formData.modules" :key="key" :value="mod">{{ mod.name }}</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary mt-3" @click.prevent="sendForm">Créer le groupe</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AddGroup",
    data() {
        return {
            formData: {
                groupName: "",
                studentsAdded: [],
                students: [],
                modules: [],
                modulesSelected: [],
                submitted: false,
                error: false
            }
        }
    },
    created() {
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
                name: this.formData.groupName,
                nbOfStudents: this.formData.studentsAdded.length,
                modules: this.formData.modulesSelected,
                students: this.formData.studentsAdded
            }
            console.log(groupCreated)
            // Ajouter le nouveau groupe a la base
            axios.post("https://cpel.herokuapp.com/api/group/", groupCreated)
                .then(() => {
                    // Mettre a jour l'etudiant
                    for (let student in this.studentsAdded) {
                        axios.put(`https://cpel.herokuapp.com/api/student/${student._id}`, this.idGroup)
                            .then()
                            .catch(error => console.log(error))
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

<style scoped>

</style>
