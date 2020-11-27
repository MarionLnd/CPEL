<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Profil</h1>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div
                class="alert alert-dismissible"
                :class="{'alert-success': isSubmitted, 'alert-danger': hasError, 'alert-warning': hasWarning}">
                {{ alertMessage }}
            </div>
        </transition>

        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">Frank Ledoux</h4>
                <p class="card-subtitle text-muted">Professeur - Admin</p>
            </div>
            <div class="card-body text-left">
                <form>
                    <div class="form-group">
                        <label for="lastname">Nom:</label>
                        <input id="lastname" class="form-control" type="text" placeholder="Ledoux" disabled>
                    </div>

                    <div class="form-group">
                        <label for="firstname">Prénom:</label>
                        <input id="firstname" class="form-control" type="text" placeholder="Frank" disabled>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" class="form-control" type="text" placeholder="frank.ledoux@univ-evry.fr" disabled>
                    </div>

                    <div class="form-inline">
                        <label for="password" class="mr-4">Modifiez votre mot de passe:</label>
                        <input id="password" class="form-control mr-3" type="password" placeholder="Nouveau mot de passe" v-model="newPassword">
                        <button class="btn btn-outline-success" @click.prevent="changePassword">Modifier</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Profile",
        data() {
            return {
                user: {},
                newPassword: "",
                isSubmitted: false,
                hasError: false,
                hasWarning: false,
                alertMessage: "",
            }
        },
        methods: {
            changePassword() {
                if(this.validatePassword(this.newPassword)) {
                    axios.put("")
                        .then(() => {
                            this.hasError = false
                            this.alertMessage = "Votre mot de passe a été modifié avec succès !"
                            this.isSubmitted = true
                        })
                        .catch(error => {
                            console.log(error)
                            this.hasError = true
                            this.alertMessage = "Une erreur est survenue lors de la modification du mot de passe.. Réessayez !"
                        })
                }
            },
            validatePassword(password) {
                if (password.length <= 8) {
                    this.hasWarning = true
                    this.alertMessage = "Votre mot de passe doit comporter plus de 8 caractères."
                    return false
                } else {
                    this.hasWarning = false
                    return true
                }
            }
        },
        created() {
            axios.get("")
            .then(response => this.user = response.data)
            .catch(error => console.log(error))
        }
    }
</script>

<style scoped>

</style>
