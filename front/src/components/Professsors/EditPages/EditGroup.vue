<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Éditer un groupe</h1>
        <form class="text-left">
            <div class="form-group">
                <label>Nom du groupe:</label>
                <input class="form-control" :placeholder="group.name" disabled>
            </div>

            <div>
                <h5>Étudiants</h5>
                <p v-if="group.nbOfStudents !== 0">Ce groupe est composé de {{ group.nbOfStudents }} étudiants.</p>
                <p v-else>Ce groupe n'a aucun étudiants.</p>

                <div class="form-group">
                    <label for="studentsSelect" class="label-cpel">Ajouter d'autres étudiants :</label>
                    <select id="studentsSelect" class="custom-select" v-model="formData.students">
                        <option v-for="(student, key) in students" :key="key" :value="student">
                            {{ student.lastname }} {{ student.firstname }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <h5>Modules</h5>
                <label for="modulesSelect" class="label-cpel">Ajouter ce groupe à d'autres modules :</label>
                <select id="modulesSelect" class="custom-select" v-model="formData.modules">
                    <option v-for="(mod, key) in mods" :key="key" :value="mod">
                        {{ mod.name }}
                    </option>
                </select>
            </div>

            <input type="submit" class="btn btn-outline-success" value="Modifier le groupe" @submit.prevent="sendForm">
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "EditGroup",
    data() {
        return {
            id: this.$route.params.idGroup,
            group: {},
            mods: [],
            students: [],
            formData: {
                students: [],
                modules: []
            }
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/group/" + this.id).then(response => {
            this.group = response.data
        });
        axios.get("https://cpel.herokuapp.com/api/module/").then(response => {
            this.mods = response.data
        });
        axios.get("https://cpel.herokuapp.com/api/student/").then(response => {
            for(let student of response.data) {
                if (student.idGroup === "") {
                    this.students.push(student)
                }
            }
        });
    },
    methods: {
        sendForm() {
            axios.put("https://cpel.herokuapp.com/api/group/" + this.id)
            axios.put("https://cpel.herokuapp.com/api/group/" + this.id) // TODO demander a Marieme si c'est possible de prendre un tableau dans le body
            axios.put("https://cpel.herokuapp.com/api/module/" + this.id)
        },
    }
}
</script>

<style scoped>
.label-cpel {
    text-decoration: underline;
    color: #056676;
}
</style>
