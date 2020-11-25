<template>
    <div class="container">
        <h1 class="pt-3 pb-3">{{ mod.name }}</h1>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    Cours
                </h4>
                <button class="btn btn-outline-dark text-right mr-2">
                    <font-awesome-icon icon="file-pdf" />
                    Télecharger le cours
                </button>
                <button class="btn btn-outline-dark text-right ml-2">
                    <font-awesome-icon icon="file-download" />
                    Aperçu du cours
                </button>
            </div>
            <div class="card-body text-left">
                <div v-if="tds.length > 0">
                    <p>Il est composé des TD suivants :</p>
                    <ol v-for="(td, key) in tds" :key="key">
                        <li class="text-left">
                            <router-link :to="`/professeur/td/${td._id}`">{{ td.name }}</router-link>
                        </li>
                    </ol>
                </div>
                <div v-else>
                    <p>Il n'y a pas encore de TD dans ce module.</p>
                    <button class="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#collapseModules" aria-expanded="false" aria-controls="collapseModules">
                        Consulter les TD
                    </button>
                    <div class="collapse" id="collapseModules">
                        <div class="mt-3 p-4 border">
                            <form class="row">
                                <label for="modulesToSelect">Les modules existants :</label>
                                <select id="modulesToSelect" class="form-control" multiple="multiple" v-model="moduleTdsSelected">
                                    <option v-for="(td, key) in moduleTds" :key="key">
                                        {{ td.name }}
                                    </option>
                                </select>
                            </form>
                            <br>
                            <div>
                                <p class="badge badge-info m-2 mt-0" v-for="(td, key) in moduleTdsSelected" :key="key">
                                    {{ td }}
                                </p>
                            </div>

                            <!--<button class="btn btn-outline-success mt-3" type="submit" @submit.prevent="addModuleToGroup" v-if="modulesSelected.length <= 1">Lier le groupe à ce module</button>
                            <button class="btn btn-outline-success mt-3" type="submit" @submit.prevent="addModuleToGroup" v-else>Lier le groupe à ces modules</button>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Module",
    data() {
        return {
            id: this.$route.params.idModule,
            mod: {},
            moduleTds: [],
            moduleTdsSelected: [],
            tds: [],
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/modules/" + this.id).then(response => {
            this.mod = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/td/").then(response => {
            this.moduleTds = response.data
            for (let td of response.data) {
                if (td.idModule === this.id) {
                    this.tds.push(td)
                }
            }
        })
    }
}
</script>

<style scoped>

</style>
