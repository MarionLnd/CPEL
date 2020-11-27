<template>
    <div class="container">
        <h2 class="pt-3 pb-3">TD - {{ td.name }}</h2>
        <div class="text-left">
            <h5 class="text-danger">Date limite de rendu : {{ td.dateLimit | moment("DD/MM/YYYY") }}</h5>
            <div v-if="td.exercises.length !== 0">
                <div v-for="(exo, key) in td.exercises" :key="key" class="card mb-2 pb-2">
                    <h5 class="pl-3 pt-3"><u>Exercice {{ key + 1 }}: {{ exo.name }}</u></h5>
                    <Exercice :exo="exo" />
                </div>
            </div>
            <div v-else>
                <p><u>Ce TD n'a pas encore d'exercices.</u></p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Exercice from "@/components/Professsors/DetailsPages/Exercice";

    export default {
        name: "TD",
        components: {
            Exercice
        },
        data() {
            return {
                id: this.$route.params.idTD,
                td: {}
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/tds/" + this.id).then(response => {
                this.td = response.data
            })
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
