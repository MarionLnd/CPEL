<template>
    <div>
        <h1>Module {{ id }}</h1>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ mod.name }}yo</h5>
                <h6 class="card-subtitle text-muted">Identifiant du module : {{ id }}</h6>
            </div>
            <div class="card-body">
                <p>Ce module est intitulé {{ mod.name }}</p>
                <p>Il est composé des exercices suivants :</p>
                <ul v-for="(mod, key) in mod.modules" :key="key">
                    <li>{{ mod }}</li>
                </ul>
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
            id: this.$route.params.id,
            mod: {},
        }
    },
    mounted() {
        axios.get("https://cpel.herokuapp.com/api/modules/" + this.id).then(response => {
            console.log(response)
            this.mod = response.data
        })
    }
}
</script>

<style scoped>

</style>
