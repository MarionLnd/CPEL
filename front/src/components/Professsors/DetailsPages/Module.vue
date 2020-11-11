<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Module {{ mod.name }}</h1>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ mod.name }}yo</h5>
                <h6 class="card-subtitle text-muted">Identifiant du module : {{ id }}</h6>
            </div>
            <div class="card-body">
                <p>Ce module est intitulé {{ mod.name }}</p>
                <p>Il est composé des exercices suivants :</p>
                <ol v-for="(exercise, key) in exercises" :key="key">
                    <li class="text-left">
                        <router-link :to="`/${id}/exercice/${exercise.idExercise}`">{{ exercise.name }}</router-link>
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
            id: this.$route.params.id,
            mod: {},
            exercises: []
        }
    },
    mounted() {
        axios.get("https://cpel.herokuapp.com/api/modules/" + this.id).then(response => {
            console.log(response)
            this.mod = response.data
        })
        axios.get("https://cpel.herokuapp.com/api/exercise/").then(response => {
            console.log(response)
            for(let exercise of response.data) {
                if (exercise.idModule === this.id) {
                    this.exercises.push(exercise)
                }
            }
        })
    }
}
</script>

<style scoped>

</style>
