<template>
    <div class="container">
        <h1 class="pt-3 pb-3">Profil Étudiant {{ id }}</h1>
    </div>
</template>

<script>
    export default {
        name: "Student",
        data() {
            return {
                id: this.$route.params.id,
            }
        },
    }
</script>

<style scoped>

</style>
