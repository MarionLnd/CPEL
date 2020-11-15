<template>
    <div class="container">
        <h2 class="pt-3 pb-3">Inscription à la plateforme</h2>

        <div class="mt-3">
            <form class="text-left">
                <div class="form-group">
                    <label class="label-cpel" for="profileType">Pour quel profil:</label>
                    <select id="profileType" class="custom-select" v-model.lazy="formData.profileType" @change="changeNumPlaceholder">
                        <option value="student">Étudiant</option>
                        <option value="professor">Professeur</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <h5 class="section-title mb-3">Informations personnelles</h5>
                <div class="form-row">
                    <div class="col">
                        <input id="userFirstname" class="form-control" type="text" placeholder="Prénom" v-model.lazy="formData.firstname">
                    </div>
                    <div class="col">
                        <input id="userLastname" class="form-control" type="text" placeholder="Nom" v-model.lazy="formData.lastname">
                    </div>
                </div>

                <br>

                <h5 class="section-title mb-3">Informations d'identification</h5>
                <div class="form-row">
                    <div class="col">
                        <input id="email" class="form-control" type="email" placeholder="Email" v-model.lazy="formData.email" @change="addIdNumber">
                        <small v-if="formData.profileType === 'student'">
                            Entrez votre adresse <strong>étudiante</strong> de l'université
                        </small>
                        <small v-else-if="formData.profileType === 'professor'">
                            Entrez votre adresse <strong>professeur</strong> de l'université
                        </small>
                        <small v-else>
                            Entrez votre adresse <strong>étudiante</strong> ou <strong>professeur</strong> de l'université
                        </small>
                    </div>

                    <div class="col">
                        <input id="numAuth" class="form-control" type="text" :placeholder="placeholder" v-model.lazy="formData.idNumber">
                        <small v-if="formData.profileType === 'student'">
                            En tant qu'<strong>étudiant</strong>, saisissez votre numéro étudiant
                        </small>
                        <small v-else-if="formData.profileType === 'professor'">
                            En tant que <strong>professeur</strong>, entrez votre numéro d'identification
                        </small>
                        <small v-else>
                            Si vous êtes <strong>étudiant</strong>, saisissez votre numéro étudiant, si vous êtes <strong>professeur</strong>, entrez votre numéro d'identification
                        </small>
                    </div>
                </div>

                <br>

                <h5 class="section-title mb-3">Informations d'authentification</h5>
                <div class="form-group">
                    <label class="label-cpel" for="password">Mot de passe</label>
                    <input id="password" class="form-control" type="password" v-model.lazy="formData.password">
                </div>
                <div class="form-group">
                    <label class="label-cpel" for="confirmPassword">Confirmez votre mot de passe</label>
                    <input id="confirmPassword" class="form-control" type="password">
                </div>

                <input type="submit" class="btn btn-outline-success" value="S'inscrire" @submit.prevent="sendForm">
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                formData: {
                    lastname: "",
                    firstname: "",
                    email: "",
                    idNumber: "",
                    password: "",
                    profileType: ""
                },
                placeholder: "Numéro d'identification"
            }
        },
        methods: {
            changeNumPlaceholder() {
                console.log(this.formData)
                console.log(this.formData.profileType)
                switch (this.formData.profileType) {
                    case "student":
                        this.placeholder = "Numéro étudiant"
                        break;
                    case "professor":
                        this.placeholder = "Numéro professeur"
                        break;
                    default:
                        this.placeholder = "Numéro d'identification"
                }
            },
            addIdNumber() {
                if (this.formData.profileType === "student" || this.formData.profileType === "professor") {
                    this.formData.idNumber = this.formData.email;
                }
            },
            sendForm() {
                // rgve
            }
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
