<template>
    <div class="container">
        <h2 class="pt-3 pb-3">Inscription à la plateforme</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted && !formData.error">
                Votre inscription a été prise en compte avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.error">
                {{ errorMessage }}
            </div>
        </transition>

        <div class="mt-3">
            <form class="text-left" @submit.prevent="sendForm">
                <div class="form-group">
                    <label class="label-cpel" for="profileType">Pour quel profil:</label>
                    <select id="profileType" class="custom-select" v-model.lazy="formData.profileType">
                        <option value="student">Étudiant</option>
                        <option value="professor">Professeur</option>
                    </select>
                </div>

                <h5 class="section-title mb-3">Informations d'identification</h5>
                    <div class="form-group">
                        <input id="numAuth" class="form-control" type="text" placeholder="Numéro d'identification" v-model.lazy="formData.idNumber" required>
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
                <div class="form-row">
                    <div class="col form-group">
                        <label class="label-cpel" for="password">Mot de passe</label>
                        <input id="password" class="form-control" type="password" v-model.lazy="formData.password" required>
                    </div>
                    <div class="col form-group">
                        <label class="label-cpel" for="confirmPassword">Confirmez votre mot de passe</label>
                        <input id="confirmPassword" class="form-control" type="password" v-model.lazy="formData.confirmPassword" required>
                    </div>
                </div>

                <input type="submit" class="btn btn-outline-success" value="S'inscrire">
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Register",
        data() {
            return {
                formData: {
                    idNumber: "",
                    password: "",
                    confirmPassword: "",
                    profileType: "",
                    error: false,
                    submitted: false,
                },
                errorMessage: ""
            }
        },
        methods: {
            sendForm() {
                this.formData.submitted = true;

                let userRegistered = {
                    username: this.formData.idNumber,
                    password: this.formData.password,
                    type: this.formData.profileType
                }

                if (this.formData.password !== this.formData.confirmPassword) {
                    this.formData.error = true
                    this.errorMessage = "Les mots de passe saisis sont différents, assurez vous de mettre le même mot de passe dans les deux champs."
                } else {
                   axios.post("https://cpel.herokuapp.com/api/user/", userRegistered).then(
                        response => {
                            this.formData.error = false
                            console.log(response)
                            //this.$router.push(this.$route.query.redirect || '/professeur/')
                        }
                   ).catch(error => {
                       console.log(error)
                       this.formData.error = true
                       this.formData.submitted = false
                       switch(error.response.status) {
                           case 400:
                               this.errorMessage = "Une erreur est survenue lors de votre inscription.. Réessayez !"
                               break;
                           case 410:
                               this.errorMessage = "Votre numéro d'identification professeur n'existe pas dans notre base."
                               break;
                           case 411:
                               this.errorMessage = "Votre numéro étudiant n'existe pas dans notre base."
                               break;
                           default:
                               this.errorMessage = "Une erreur est survenue lors de votre inscription.. Réessayez !"
                               break;
                       }
                   })
                }

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
