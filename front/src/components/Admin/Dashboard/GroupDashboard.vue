<template>
    <div class="container">
        <h3 class="text-left text-u">Gestion des étudiants</h3>
        <table class="table">
            <thead>
            <tr>
                <th>Nom</th>
                <th>Nombre d'étudiants</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(group, key) in groups" :key="key">
                <td>{{ group.name }}</td>
                <td>{{ group.students.length }}</td>
                <td>
                    <router-link class="mr-2" :to="`/professeur/groupe/${student._id}`">
                        <font-awesome-icon icon="eye" size="lg" style="color: #2a4f66" />
                    </router-link>
                    -
                    <router-link class="ml-2" :to="`/professeur/editer-groupe/${student._id}`">
                        <font-awesome-icon icon="edit" size="lg" style="color: #2a4f66"/>
                    </router-link>
                    -
                    <font-awesome-icon icon="user-minus" size="lg" class="ml-2" style="color: #2a4f66"/>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "GroupDashboard"
    }
</script>

<style scoped>

</style>
