<template>
  <div>
    <h3 class="text-left">Les modules</h3>

      <table class="table">
          <thead>
          <tr>
              <th>Nom du module</th>
              <th>Nombre de TDs</th>
              <th>Groupes concernés</th>
              <th>Action</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(mod, key) in data" :key="key">
              <td>{{ mod.name }}</td>
              <td v-if="getTDsByModules(mod._id) === 0">
                  Aucun TD
              </td>
              <td v-else>{{ getTDsByModules(mod._id) }}</td>
              <td v-if="mod.groups.length === 0 || mod.groups[0] === null">
                  Aucun groupe
              </td>
              <td v-else>
                  {{ mod.groups.length }} groupe(s)
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
          tds: [],
          paginate: ["modules"],
          fields: [
              {name: 'name', title: 'Nom', sortField: 'name'},
              {name: 'groups', title: 'Groupes concernés', sortField: 'groups'}
          ],
          perPage: 5,
          groups: []
      }
    },
    created() {
      axios.get("https://cpel.herokuapp.com/api/modules/").then(response => {
          console.log(response.data)
          this.data = response.data;
      });
      axios.get("https://cpel.herokuapp.com/api/groups/").then(response => {
          this.groups = response.data;
      })
        axios.get("https://cpel.herokuapp.com/api/tds/")
            .then(response => this.tds = response.data)
            .catch(error => console.log(error))
    },
    methods: {
        getTDsByModules(moduleId) {
          let count = 0;
          for (let td of this.tds) {
              if (td.idModule === moduleId) {
                  count++
              }
          }
          return count
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
