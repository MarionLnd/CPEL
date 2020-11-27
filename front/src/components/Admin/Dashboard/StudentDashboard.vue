<template>
    <div class="container">
        <h3 class="text-left text-u">Gestion des étudiants</h3>
        <table class="table">
            <thead>
            <tr>
                <th>Numéro étudiant</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Mail étudiant</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(student, key) in students" :key="key">
                <td>{{ student.studentNumber }}</td>
                <td>{{ student.lastname }}</td>
                <td>{{ student.firstname }}</td>
                <td>{{ student.email }}</td>
                <td>
                    <router-link class="mr-2" :to="`/professeur/groupe/${student._id}`">
                        <font-awesome-icon icon="eye" size="lg" style="color: #2a4f66"/>
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
import axios from "axios";

export default {
    name: "StudentDashboard",
    data() {
      return {
          students: [],
          groupName: "",
      }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/student/").then(response => {
            this.students = response.data
        })
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
