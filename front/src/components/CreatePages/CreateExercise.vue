<template>
    <div>
        <h2>Créer un exercice</h2>

        <div class="container">
            <form>
                <div class="form-group">
                    <label for="name">L'intitulé de l'exercice:</label>
                    <input type="text" id="name" class="form-control" v-model.lazy="formData.name">
                </div>

                <div class="form-group">
                    <label for="txt">L'énoncé de l'exercice:</label>
                    <textarea id="txt" class="form-control" v-model.trim="formData.wording"></textarea>
                </div>

                <label for="module">Pour le module :</label>
                <select id="module" class="custom-select" v-model="formData.moduleSelected">
                    <!--<option v-for="(pays, key) in formData.countryList" v-bind:key="key">{{ pays }}</option> -->
                    <option>Module de programmation Python</option>
                    <option>Module de base pour Python</option>
                    <option>Module de Python avancée</option>
                    <option>Module d'initiation au C</option>
                </select>

                <div class="form-check text-left p-0">
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
                </div>
                <h4>Correction de l'exercice</h4>
                <CreateCorrection/>

                <button type="submit" class="btn btn-primary mt-2" @click.prevent="sendForm">Ajouter l'exercice</button>
            </form>
        </div>
    </div>
</template>

<script>
import CreateCorrection from "@/components/CreatePages/CreateCorrection";
import Switches from 'vue-switches';

export default {
    name: "CreateExercice",
    components: {
        CreateCorrection,
        Switches
    },
    data() {
        return {
            formData: {
                idExercice: String,
                name: String,
                moduleSelected: String,
                wording: String,
                enableSyntaxCriteria: false,
                enableLogicCriteria: false,
            }
        }
    },
    methods: {
        findModuleByName() {

        }
    }
}
</script>

<style scoped>
form, h4 {
    text-align: left;
}
</style>
