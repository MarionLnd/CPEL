<template>
    <div>
        <h3 class="text-left text-u">Les groupes d'élèves</h3>
        <table class="table">
            <thead>
            <tr>
                <th>Nom du groupe</th>
                <th>Nombre d'étudiants</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(group, key) in data" :key="key">
                <td>{{ group.name }}</td>
                <td>{{ group.nbOfStudents }}</td>
                <td>
                    <router-link class="mr-2" :to="`/professeur/groupe/${group._id}`">
                        <font-awesome-icon icon="eye" size="lg"/>
                    </router-link>
                    -
                    <router-link class="ml-2" :to="`/professeur/editer-groupe/${group._id}`">
                        <font-awesome-icon icon="edit" size="lg"/>
                    </router-link>
                </td>
            </tr>
            </tbody>
            <tfoot>

            </tfoot>
        </table>
    </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

export default {
    name: "GroupDashboard",
    components: {},
    data() {
        return {
            data: [],
            fields: [
                {name: 'idGroup', title: 'Identifiant du groupe'},
                {name: 'name', title: 'Nom', sortField: 'name'},
                {name: 'nbOfStudents', title: "Nombre d'étudiants", sortField: 'modules'}
            ],
            perPage: 5
        }
    },
    created() {
        axios.get("https://cpel.herokuapp.com/api/group/").then(response => {
            this.data = response.data
        })
    },
    methods: {
        dataManager(sortOrder, pagination) {
            if (this.data.length < 1) return;

            let local = this.data;

            // sortOrder can be empty, so we have to check for that as well
            if (sortOrder.length > 0) {
                console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
                local = _.orderBy(
                    local,
                    sortOrder[0].sortField,
                    sortOrder[0].direction
                );
            }

            pagination = this.$refs.vuetable.makePagination(
                local.length,
                this.perPage
            );
            console.log('pagination:', pagination)
            let from = pagination.from - 1;
            let to = from + this.perPage;

            return {
                pagination: pagination,
                data: _.slice(local, from, to)
            };
        },
    }
}
</script>

<style scoped>

</style>
