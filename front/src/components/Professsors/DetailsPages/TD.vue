<template>
    <div class="container">
        <h2 class="pt-2">TD - {{ td.name }}</h2>
        <div>
            <h5 class="text-left text-danger">Date limite de rendu : {{ td.dateLimit | moment("DD/MM/YYYY") }}</h5>
            <div class="card">
                <div v-for="(exo, key) in td.Exercises" :key="key">
                    <h5 class="text-left pl-3 pt-3">Exercice {{ key + 1 }}: {{ exo.name }}</h5>
                    <Exercice :exo="exo" />
                </div>
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
                td: {},
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/td/" + this.id).then(response => {
                this.td = response.data
            })
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
