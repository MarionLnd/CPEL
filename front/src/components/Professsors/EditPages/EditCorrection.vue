<template>
    <div>
        <h1>Éditer une correction d'exercice</h1>

        <form>
            <div class="form-group">
                <label for="firstname">Énoncé de l'exercice:</label>
                <input id="firstname" class="form-control" type="text" :placeholder="student.firstname" disabled>
            </div>

            <div>
                <textarea v-model="correction.content">

                </textarea>
            </div>

        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "EditCorrection",
        data() {
            return {
                idCorrection: this.$route.query.idCorrection,
                correction: {},
                exercise: {}
            }
        },
        created() {
            axios.get("https://cpel.herokuapp.com/api/exercises/" + this.idExercise).then(response => {
                this.exercise = response.data
            });
            axios.get("https://cpel.herokuapp.com/api/corrections/" + this.idCorrection).then(response => {
                this.correction = response.data
            })
        }
    }
</script>

<style scoped>

</style>
