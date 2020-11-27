<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Groupe {{ group.name }}</h1>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <h5 class="text-center clearfix">
                        {{ group.name }}
                        <span class="float-right">
                            <router-link :to="`/professeur/editer-groupe/${group._id}`">
                                <font-awesome-icon class="text-left" icon="edit" size="lg" style="color: #333333"/>
                            </router-link>
                        </span>
                    </h5>

                </div>
                <h6 class="card-subtitle text-muted text-center">Identifiant du groupe : {{ group.idGroup }}</h6>
            </div>
            <div class="card-body text-left">
                <p>Ce groupe est composé de {{ group.students.length }} étudiants : </p>
                <ul v-for="(stud, key) in group.students" :key="key">
                    <li>
                        <router-link :to="`/professeur/etudiant/${stud._id}?groupName=${group.name}`">
                            [{{ stud.studentNumber }}] - {{ stud.firstname }} {{ stud.lastname }}
                        </router-link>
                    </li>
                </ul>
                <p v-if="group.modules.length === 0">Pour le moment, ce groupe n'est lié à aucun module.</p>
                <div v-if="group.modules.length !== 0">
                    <p>Il est actuellement lié au(x) module(s) suivant(s) :</p>
                    <ul v-for="(mod, key) in group.modules" :key="key">
                        <li>
                            <router-link :to="`/professeur/module/${mod._id}`">{{ mod.name }}</router-link>
                        </li>
                    </ul>
                </div>
                <div id="group-modules-students">
                    <!-- Add new modules -->
                    <div>
                        <button
                            class="mr-3 btn btn-outline-info"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseModules"
                            aria-expanded="false"
                            aria-controls="collapseModules">
                            Consulter les modules
                        </button>
                        <div class="collapse mb-3" id="collapseModules">
                            <div class="mt-3 p-4 border">
                                <h6><u>Ajoutez des modules au groupe</u></h6>
                                <form class="form-inline">
                                    <label for="modulesToSelect">Les modules existants :</label>
                                    <select id="modulesToSelect" class="custom-select w-100" v-model="modulesSelected">
                                        <option v-for="(mod, key) in getModules" :key="key" :value="mod">
                                            {{ mod.name }}
                                        </option>
                                    </select>
                                </form>
                                <div class="mt-1">
                                    <p class="badge badge-info m-2 mt-0">
                                        {{ modulesSelected.name }}
                                    </p>
                                </div>
                                <button class="btn btn-outline-success mt-3" type="submit" @click.prevent="addModuleToGroup">Lier le groupe à ce module</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <!-- Add students -->
                        <button
                            class="mt-2 btn btn-outline-info"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseStudents"
                            aria-expanded="false"
                            aria-controls="collapseStudents">
                            Consulter les étudiants
                        </button>
                        <div class="collapse" id="collapseStudents">
                            <div class="mt-3 p-4 border">
                                <h6><u>Ajoutez de nouveaux étudiants au groupe</u></h6>
                                <form class="form-inline">
                                    <label for="studentToAdd">Les étudiants sans groupes :</label>
                                    <select id="studentToAdd" class="custom-select w-100" v-model="studentSelected">
                                        <option v-for="(student, key) in getStudents" :key="key" :value="student">
                                            {{ student.name }}
                                        </option>
                                    </select>
                                </form>
                                <br>
                                <div>
                                    <p class="badge badge-primary m-2 mt-0">
                                        {{ studentSelected.lastname }} {{ studentSelected.firstname }}
                                    </p>
                                </div>

                                <button class="btn btn-outline-success mt-3" type="submit" @submit.prevent="addStudentToGroup">Lier le groupe à ce module</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Group",
    data() {
        return {
            id: this.$route.params.idGroup,
            group: {},
            getModules: [],
            getStudents: [],
            modulesSelected: {},
            studentSelected: {},
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/groups/" + this.id).then(response => {
            this.group = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/modules/").then(response => {
            this.getModules = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/students/").then(response => {
            for(let student of response.data) {
                if (student._id === "") {
                    this.getStudents.push(student)
                }
            }
        })
    },
    methods: {
        addModuleToGroup() {
            axios.put("https://cpel.herokuapp.com/api/groups/" + this.id + "/modules/" + this.modulesSelected._id)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addStudentToGroup(){
            axios.put("https://cpel.herokuapp.com/api/groups/" + this.id + "/students/" + this.studentSelected._id)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>

</style>
