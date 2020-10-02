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
                <multiselect
                    id="students"
                    v-model="formData.studentsAdded"
                    :options="formData.students"
                    :multiple="true">
                </multiselect>

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

    export default {
        name: "CreateGroup",
        components: {
          Multiselect
        },
        data() {
            return {
                formData: {
                    name: "",
                    studentsAdded: "",
                    students: [
                        "LastnameStudent1 FirstnameStudent1",
                        "LastnameStudent2 FirstnameStudent2",
                        "LastnameStudent3 FirstnameStudent3",
                        "LastnameStudent4 FirstnameStudent4",
                        "LastnameStudent5 FirstnameStudent5",
                        "LastnameStudent6 FirstnameStudent6",
                    ],
                    modules: [],
                    moduleSelected: ""
                }
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
