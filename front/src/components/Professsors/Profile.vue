<template>
    <div class="container">
      <h1>Profil</h1>
        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">Frank Ledoux</h4>
                <p class="card-subtitle text-muted">Professeur</p>
            </div>
            <div class="card-body text-left">
                <p>Email: </p>
                <p>Modules liés: </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profil",
        data() {
            return {
                professor: {}
            }
        }
    }
</script>

<style scoped>

</style>
