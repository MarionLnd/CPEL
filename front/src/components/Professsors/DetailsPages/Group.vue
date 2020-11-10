<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Groupe {{ group.name }}</h1>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <h5 class="text-center clearfix">
                        {{ group.name }}
                        <span class="float-right">
                            <router-link :to="`/editer-groupe/${group._id}`">
                                <font-awesome-icon class="text-left" icon="edit" size="lg" style="color: #333333"/>
                            </router-link>
                        </span>
                    </h5>

                </div>
                <h6 class="card-subtitle text-muted text-center">Identifiant du groupe : {{ group.idGroup }}</h6>
            </div>
            <div class="card-body text-left">
                <p>Ce groupe est composé de {{ group.nbOfStudents }} étudiants : </p>
                <ul v-for="(stud, key) in groupStudents" :key="key">
                    <li>
                        <router-link :to="`/student/${stud.idStudent}`">{{ stud.firstname }} (numéro étudiant: {{ stud.idStudent }})</router-link>
                    </li>
                </ul>
                <div id="group-modules">
                    <div v-if="group.modules.length === 0">
                        <p>Pour le moment, ce groupe n'est lié à aucun module.</p>
                        <button class="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#collapseModules" aria-expanded="false" aria-controls="collapseModules">
                            Consulter les modules
                        </button>
                        <div class="collapse" id="collapseModules">
                            <div class="mt-3 p-4 border">
                                <form class="row">
                                    <label for="modulesToSelect">Les modules existants :</label>
                                    <select id="modulesToSelect" class="form-control" multiple="multiple" v-model="modulesSelected">
                                        <option v-for="(mod, key) in getModules" :key="key">
                                            [{{ mod.idmodule }}] {{ mod.name }}
                                        </option>
                                    </select>
                                </form>
                                <br>
                                <div>
                                    <p class="badge badge-info m-2 mt-0" v-for="(mod, key) in modulesSelected" :key="key">
                                        {{ mod }}
                                    </p>
                                </div>

                                <button class="btn btn-outline-success mt-3" type="submit" @submit.prevent="addModuleToGroup" v-if="modulesSelected.length <= 1">Lier le groupe à ce module</button>
                                <button class="btn btn-outline-success mt-3" type="submit" @submit.prevent="addModuleToGroup" v-else>Lier le groupe à ces modules</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Il est actuellement lié au(x) module(s) suivant(s) :</p>
                        <ul v-for="(mod, key) in group.modules" :key="key">
                            <li>{{ mod }}</li>
                        </ul>
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
            id: this.$route.params.id,
            group: {},
            groupStudents: [],
            getModules: [],
            modulesSelected: [],
        }
    },
    mounted() {
        axios.get("https://cpel.herokuapp.com/api/group/" + this.id).then(response => {
            this.group = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/student/").then(response => {
            for(let student of response.data) {
                console.log(student)
                if (student.idGroup === this.id) {
                    console.log(student)
                    this.groupStudents.push(student)
                }
            }
        })
        axios.get("https://cpel.herokuapp.com/api/module/").then(response => {
            for (let mod of response.data) {
                this.getModules.push(mod)
            }
        })
    },
    methods: {
        addModuleToGroup() {
            console.log(this.modulesSelected)
        }
    }
}
</script>

<style scoped>

</style>
