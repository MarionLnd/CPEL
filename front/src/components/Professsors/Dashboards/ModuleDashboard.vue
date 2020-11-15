<template>
  <div>
    <h3 class="text-left">Les modules</h3>

      <table class="table">
          <thead>
          <tr>
              <th>Nom du module</th>
              <th>Nombre d'exercices</th>
              <th>Groupes concernés</th>
              <th>Action</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(mod, key) in data" :key="key">
              <td>{{ mod.name }}</td>
              <td>{{ mod.nbExercises }}</td>
              <td v-if="mod.groups.length === 0">
                  Aucun groupe
              </td>
              <td v-else>
                  {{ getNameGroupById(mod.groups) }}
              </td>
              <td>
                  <router-link class="mr-2" :to="`/professeur/module/${mod._id}`">
                      <font-awesome-icon icon="eye" size="lg"/>
                  </router-link>
              </td>
          </tr>
          </tbody>

      </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';

  export default {
    name: "ModuleDashboard",
    components: {
      //Vuetable
    },
    data(){
      return {
          data: [],
          paginate: ["modules"],
          fields: [
              {name: 'name', title: 'Nom', sortField: 'name'},
              {name: 'groups', title: 'Groupes concernés', sortField: 'groups'}
          ],
          perPage: 5,
          exercises: [],
          groups: []
      }
    },
    mounted() {
      axios.get("https://cpel.herokuapp.com/api/module/").then(response => {
          this.data = response.data;
      });
        axios.get("https://cpel.herokuapp.com/api/group/").then(response => {
            this.groups = response.data;
        })
    },
    methods: {
        getNameGroupById(groups) {
            let groupsName = "";

            console.log(this.groups.find(group => group._id === ""))

            if (groups.length === 1) {
                groupsName = this.groups.find(group => group._id === groups[0]).name;
            } else {
                groupsName+= this.groups.find(group => group._id === groups[0]).name + ", ";
            }


            return groupsName
        },
        dataManager(sortOrder, pagination) {
        if (this.data.length < 1) return;

        console.log(this.data)

        let local = this.data;
        console.log(local)

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
