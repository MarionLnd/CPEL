<template>
    <div>
        <h2>Créer un exercice</h2>

        <!-- ALERTS -->
        <transition name="slide-fade">
            <div class="alert alert-success" v-if="formData.submitted">
                L'exercice a été crée avec succès !
            </div>
        </transition>

        <transition>
            <div class="alert alert-danger alert-dismissible" v-if="formData.submitted && formData.error">
                Une erreur est survenue lors de la création de l'exercice.. Réessayez !
            </div>
        </transition>

        <div class="container">
            <form>
                <div class="form-group">
                    <label for="name">L'intitulé de l'exercice:</label>
                    <input type="text" id="name" class="form-control" v-model="formData.name">
                </div>

                <div class="form-group">
                    <label for="txt">L'énoncé de l'exercice:</label>
                    <textarea id="txt" class="form-control" v-model.trim="formData.wording"></textarea>
                </div>

                <label for="module">Pour le module :</label>
                <select id="module" class="custom-select" v-model="formData.moduleSelected">
                    <option v-for="(mod, key) in getModules" v-bind:key="key">{{ mod.name }}</option>
                </select>

                <!--<div class="form-check text-left p-0">
                    <div class="form-check p-0">
                        <label class="m-0" for="logicCriteria">Activer le critère de logique : </label>
                        <br>
                        <switches
                            id="logicCriteria"
                            class=""
                            theme="bootstrap"
                            color="primary"
                            text-enabled="Le critère de logique est activé pour cet exercice"
                            text-disabled="Le critère de logique est désactivé pour cet exercice"
                            v-model="formData.enableLogicCriteria"></switches>
                    </div>

                    <div class="form-check p-0">
                        <label class="m-0" for="syntaxCriteria">Activer le critère de syntaxe : </label>
                        <br>
                        <switches
                            id="syntaxCriteria"
                            class=""
                            theme="bootstrap"
                            color="primary"
                            text-enabled="Le critère de syntaxe est activé pour cet exercice"
                            text-disabled="Le critère de syntaxe est désactivé pour cet exercice"
                            v-model="formData.enableSyntaxCriteria"></switches>
                    </div>
                </div>-->

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Ajouter l'exercice</button>
            </form>
        </div>
    </div>
</template>

<script>
//import Switches from 'vue-switches';
import axios from 'axios';

export default {
    name: "CreateExercice",
    components: {

    },
    data() {
        return {
            getModules: [],
            formData: {
                idExercice: String,
                name: "",
                moduleSelected: String,
                wording: "",
                enableSyntaxCriteria: false,
                enableLogicCriteria: false,
                submitted: false,
                error: false
            },
            idModule: ""
        }
    },
    methods: {
        findModuleByName(moduleName) {
            axios.get("https://cpel.herokuapp.com/api/module")
            .then(response => {
                for(let mod of response.data) {
                    if (mod.name === moduleName) {
                        return mod.idmodule
                    }
                }
            })
        },
        sendForm() {
            this.formData.submitted = true

            let exerciseCreated = {
                idExercise: Math.random(),
                name: this.formData.name,
                idModule: this.findModuleByName(this.formData.moduleSelected),
                wording: this.formData.wording,
                syntaxCriteria: true,
                logicCriteria: true,
            }

            console.log(exerciseCreated.idModule)

            // Ajouter le nouveau groupe a la base
            axios.post(`https://cpel.herokuapp.com/api/exercise/`, exerciseCreated)
                .then(() => {
                    // redirect (OK)
                    //this.$router.push(this.$route.query.redirect || '/')
                    console.log(exerciseCreated)
                })
                .catch(error => {
                    console.log(error)
                    this.formData.error = true
                })
            this.formData.submitted = false
        }
    },
    mounted() {
        axios.get('https://cpel.herokuapp.com/api/module/')
            .then(response => {
                for(let mod of response.data) {
                    this.getModules.push(mod)
                }
            })
    }
}
</script>

<style scoped>
form, h4 {
    text-align: left;
}
</style>
