<template>
    <div>
        Exercice id de la part de l'étudiant id
    </div>
</template>

<script>
export default {
    name: "StudentRending",
    data() {
        return {
            idStudent: this.$route.params.idStudent,
            idExercise: this.$route.params.idExercise,
        }
    }
}
</script>

<style scoped>

</style>
