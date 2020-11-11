<template>
    <div class="container">
      <h1 class="pt-3 pb-3">Profil</h1>
        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">Frank Ledoux</h4>
                <p class="card-subtitle text-muted">Professeur</p>
            </div>
            <div class="card-body text-left">
                <form>
                    <div class="form-group">
                        <label for="lastname">Nom:</label>
                        <input id="lastname" class="form-control" type="text" placeholder="Ledoux" disabled>
                    </div>

                    <div class="form-group">
                        <label for="firstname">Prénom:</label>
                        <input id="firstname" class="form-control" type="text" placeholder="Frank" disabled>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" class="form-control" type="text" placeholder="frank.ledoux@univ-evry.fr" disabled>
                    </div>
                </form>
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
