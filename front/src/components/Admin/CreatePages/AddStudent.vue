<template>
    <div>
        <h1 class="pt-3 pb-3">Ajouter un étudiant</h1>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                L'enseignant(e) a été ajouté(e) avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.error" style="transition-delay: 1.5s">
                Une erreur est survenue lors de l'ajout de l'étudiant(e).. Réessayez !
            </div>
        </transition>

        <div class="container">
            <form class="text-left">

                <h5 class="section-title mb-3">Informations personnelles</h5>
                <div class="form-row">
                    <div class="form-group col">
                        <label class="label-cpel" for="lastname-prof">Nom de famille :</label>
                        <input type="text" id="lastname-prof" class="form-control w-100" v-model.lazy="formData.lastname" required>
                    </div>

                    <div class="form-group col">
                        <label class="label-cpel" for="firstname-prof">Prénom :</label>
                        <input type="text" id="firstname-prof" class="form-control w-100" v-model.lazy="formData.firstname" required>
                    </div>
                </div>

                <h5 class="section-title mb-3">Informations d'identification</h5>
                <div class="form-row">
                    <div class="form-group col">
                        <label class="label-cpel" for="idNum-prof">Numéro d'identification :</label>
                        <input type="text" id="idNum-prof" class="form-control w-100" v-model.lazy="formData.idNumber" required>
                    </div>

                    <div class="form-group col">
                        <label class="label-cpel" for="email-prof">Email :</label>
                        <input type="email" id="email-prof" class="form-control w-100" v-model.lazy="formData.email" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="label-cpel" for="module">Pour le groupe :</label>
                    <select id="module" class="custom-select" v-model="formData.groupSelected">
                        <option v-for="(group, key) of groups" :key="key" :value="group._id">{{ group.name }}</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-outline-success mt-3" @click.prevent="sendForm">Ajouter un(e) étudiant(e)</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AddStudent",
    data() {
        return {
            students: [],
            groups: [],
            formData: {
                lastname: "",
                firstname: "",
                idNumber: "",
                email: "",
                groupSelected: "",
                error: false,
                submitted: false
            },
            errorMessage: ""
        }
    },
    methods: {
        sendForm() {
            this.formData.submitted = true

            let studentCreated = {
                lastname: this.formData.lastname,
                firstname: this.formData.firstname,
                studentNumber: this.formData.idNumber,
                email: this.formData.email,
                password: "",
                idGroup: this.formData.groupSelected,
            }
            console.log(studentCreated)

            // Add student ot the base
            axios.post("https://cpel.herokuapp.com/api/student/", studentCreated)
                .then(() => this.$router.push("/admin/tableau-de-bord"))
                .catch(error => {
                    console.log(error)
                    this.formData.error = true
                })
            this.formData.submitted = false

        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/student/")
            .then(response => this.students = response.data)
            .catch(error => console.log(error))

        axios.get("https://cpel.herokuapp.com/api/group/")
            .then(response => this.groups = response.data)
            .catch(error => console.log(error))
    }
}
</script>

<style scoped>
.section-title {
    text-decoration: underline;
    color: #5eaaa8;
}
.label-cpel {
    text-decoration: underline;
    color: #056676;
}
</style>
