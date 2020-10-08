<template>
    <div class="container">
        <h1>Groupe {{ id }}</h1>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ group.name }}</h5>
                <h6 class="card-subtitle text-muted">Identifiant du groupe : {{ group.idGroup }}</h6>
            </div>
            <div class="card-body">
                <p>Ce groupe est composé de {{ group.nbOfStudents }} étudiants</p>
                <p>Il est actuellement lié au(x) module(s) suivant(s) :</p>
                <ul v-for="(module, key) in group.modules" :key="key">
                    <li>{{ module }}</li>
                </ul>
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
        }
    },
    mounted() {
        axios.get("https://cpel.herokuapp.com/api/group/" + this.id).then(response => {
            this.group = response.data
        })
    }
}
</script>

<style scoped>

</style>
