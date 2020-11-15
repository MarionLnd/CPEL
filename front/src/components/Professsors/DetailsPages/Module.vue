<template>
    <div class="container">
        <h1 class="pt-3 pb-3">{{ mod.name }}</h1>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ mod.name }}</h5>
            </div>
            <div class="card-body">
                <p>Ce module est intitulé "{{ mod.name }}"</p>
                <p>Il est composé des TD suivants :</p>
                <ol v-for="(td, key) in tds" :key="key">
                    <li class="text-left">
                        <router-link :to="`/professeur/td/${td._id}`">{{ td.name }}</router-link>
                    </li>
                </ol>
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
            tds: []
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/modules/" + this.id).then(response => {
            this.mod = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/td/").then(response => {
            this.tds = response.data
        })
    }
}
</script>

<style scoped>

</style>
